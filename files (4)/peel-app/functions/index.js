import { onSchedule } from 'firebase-functions/v2/scheduler'
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { getMessaging } from 'firebase-admin/messaging'

initializeApp()
const db = getFirestore()

// Helper function to calculate next notification time for a peel
function calculateNextNotification(peel) {
  const now = new Date()
  const [startH, startM] = peel.startTime.split(':').map(Number)
  const [endH, endM] = peel.endTime.split(':').map(Number)
  
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const startMinutes = startH * 60 + startM
  const endMinutes = endH * 60 + endM
  
  // Check if today is an active day
  const dayOfWeek = now.getDay()
  if (!peel.activeDays.includes(dayOfWeek)) {
    // Find next active day
    return null // Simplified - would need to calculate next active day
  }
  
  // If before window, schedule for start of window
  if (currentMinutes < startMinutes) {
    const next = new Date(now)
    next.setHours(startH, startM, 0, 0)
    return next
  }
  
  // If after window, schedule for tomorrow's start
  if (currentMinutes >= endMinutes) {
    return null // Will be picked up tomorrow
  }
  
  // Within window - calculate next interval
  const minutesSinceStart = currentMinutes - startMinutes
  const minutesUntilNext = peel.intervalMinutes - (minutesSinceStart % peel.intervalMinutes)
  
  const next = new Date(now.getTime() + minutesUntilNext * 60000)
  
  // Make sure it's before end time
  const nextMinutes = next.getHours() * 60 + next.getMinutes()
  if (nextMinutes > endMinutes) {
    return null // Past end time
  }
  
  return next
}

// Triggered when a peel is created
export const onPeelCreated = onDocumentCreated(
  'users/{userId}/peels/{peelId}',
  async (event) => {
    const peel = event.data.data()
    const peelRef = event.data.ref
    
    // Calculate and set next notification time
    const nextTime = calculateNextNotification(peel)
    
    if (nextTime) {
      await peelRef.update({
        nextScheduledNotification: nextTime
      })
    }
    
    console.log(`Peel created: ${peelRef.id}, next notification: ${nextTime}`)
  }
)

// Triggered when a peel is updated
export const onPeelUpdated = onDocumentUpdated(
  'users/{userId}/peels/{peelId}',
  async (event) => {
    const peel = event.data.after.data()
    const peelRef = event.data.after.ref
    
    // Recalculate next notification time
    const nextTime = calculateNextNotification(peel)
    
    if (nextTime) {
      await peelRef.update({
        nextScheduledNotification: nextTime
      })
    }
    
    console.log(`Peel updated: ${peelRef.id}, next notification: ${nextTime}`)
  }
)

// Scheduled function that runs every 5 minutes to send due notifications
export const sendDueNotifications = onSchedule('every 5 minutes', async (event) => {
  const now = new Date()
  
  console.log(`Running scheduled check at ${now.toISOString()}`)
  
  // Query all users
  const usersSnapshot = await db.collection('users').get()
  
  for (const userDoc of usersSnapshot.docs) {
    const userId = userDoc.id
    const userData = userDoc.data()
    const fcmToken = userData.fcmToken
    
    if (!fcmToken) {
      console.log(`User ${userId} has no FCM token, skipping`)
      continue
    }
    
    // Get all active peels for this user
    const peelsSnapshot = await db
      .collection('users')
      .doc(userId)
      .collection('peels')
      .where('isActive', '==', true)
      .get()
    
    for (const peelDoc of peelsSnapshot.docs) {
      const peel = peelDoc.data()
      const peelRef = peelDoc.ref
      
      // Check if notification is due
      const nextNotification = peel.nextScheduledNotification?.toDate()
      
      if (nextNotification && nextNotification <= now) {
        // Send notification
        try {
          await getMessaging().send({
            token: fcmToken,
            notification: {
              title: peel.title,
              body: peel.notes || 'Time for your peel!',
            },
            data: {
              peelId: peelDoc.id,
              type: 'peel-reminder'
            },
            webpush: {
              fcmOptions: {
                link: 'https://your-app-url.com'
              }
            }
          })
          
          console.log(`Sent notification for peel: ${peelDoc.id}`)
          
          // Update peel with last sent time and calculate next
          const nextTime = calculateNextNotification(peel)
          
          await peelRef.update({
            lastNotificationSent: FieldValue.serverTimestamp(),
            notificationsSentToday: FieldValue.increment(1),
            nextScheduledNotification: nextTime
          })
          
        } catch (error) {
          console.error(`Error sending notification for peel ${peelDoc.id}:`, error)
        }
      }
    }
  }
  
  console.log('Scheduled check complete')
})
