import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  where,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

// Get user's peels
export async function getUserPeels(userId) {
  try {
    const peelsRef = collection(db, 'users', userId, 'peels')
    const snapshot = await getDocs(peelsRef)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting peels:', error)
    return []
  }
}

// Add a new peel
export async function addPeel(userId, peelData) {
  try {
    const peelsRef = collection(db, 'users', userId, 'peels')
    const docRef = await addDoc(peelsRef, {
      ...peelData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
      nextScheduledNotification: null,
      lastNotificationSent: null,
      notificationsSentToday: 0
    })
    
    return docRef.id
  } catch (error) {
    console.error('Error adding peel:', error)
    throw error
  }
}

// Update a peel
export async function updatePeel(userId, peelId, updates) {
  try {
    const peelRef = doc(db, 'users', userId, 'peels', peelId)
    await updateDoc(peelRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating peel:', error)
    throw error
  }
}

// Delete a peel
export async function deletePeel(userId, peelId) {
  try {
    const peelRef = doc(db, 'users', userId, 'peels', peelId)
    await deleteDoc(peelRef)
  } catch (error) {
    console.error('Error deleting peel:', error)
    throw error
  }
}

// Save FCM token for user
export async function saveFCMToken(userId, token) {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      fcmToken: token,
      lastTokenUpdate: serverTimestamp()
    })
  } catch (error) {
    console.error('Error saving FCM token:', error)
    throw error
  }
}
