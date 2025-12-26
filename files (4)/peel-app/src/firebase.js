import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh59cnwBNm6JNMsMpfB7LdOV1vqiSkiKg",
  authDomain: "peel-reminder.firebaseapp.com",
  projectId: "peel-reminder",
  storageBucket: "peel-reminder.firebasestorage.app",
  messagingSenderId: "488997538612",
  appId: "1:488997538612:web:b2ff1c21bd9dbca00c3361"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
export const db = getFirestore(app)
export const auth = getAuth(app)

// Initialize messaging (for push notifications)
let messaging = null
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    messaging = getMessaging(app)
  } catch (error) {
    console.log('Messaging not supported:', error)
  }
}

export { messaging }

// Request notification permission and get FCM token
export async function requestNotificationPermission() {
  if (!messaging) {
    console.log('Messaging not available')
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    
    if (permission === 'granted') {
      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: 'BAxV94bhK88xEcAU4FK5An2Lr6vRHme5CW-w0i9MQSYbzEdRSEcQaezha94AUDWV8R3qi7yNankLi2m7bMINGBo'
      })
      
      console.log('FCM Token:', token)
      return token
    } else {
      console.log('Notification permission denied')
      return null
    }
  } catch (error) {
    console.error('Error getting notification permission:', error)
    return null
  }
}

// Listen for foreground messages
export function onMessageListener() {
  if (!messaging) return Promise.reject('Messaging not available')
  
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received:', payload)
      resolve(payload)
    })
  })
}
