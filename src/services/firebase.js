import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDreODl3Q8NOcREi94N4ML8-tD639vlmag",
  authDomain: "technovista-fe650.firebaseapp.com",
  projectId: "technovista-fe650",
  storageBucket: "technovista-fe650.firebasestorage.app",
  messagingSenderId: "220151927116",
  appId: "1:220151927116:web:0b03e7309550589d92ffe9",
  measurementId: "G-NQ9NXX0PTB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const FEST_DOC_PATH = ['fest', 'config'];

/**
 * Saves fest configuration to Firestore in the cloud.
 * This ensures any edit instantly reflects on all devices worldwide.
 */
export async function saveFestConfigToCloud(payload) {
  try {
    const festDocRef = doc(db, FEST_DOC_PATH[0], FEST_DOC_PATH[1]);
    await setDoc(festDocRef, {
      ...payload,
      lastUpdated: new Date().toISOString(),
    }, { merge: true });
    return { success: true };
  } catch (err) {
    console.error('Error saving fest config to Firestore:', err);
    return { success: false, error: err };
  }
}

/**
 * Subscribes to real-time updates from Firestore.
 * Callback triggers instantly on any phone, laptop, or browser when data changes in the cloud.
 */
export function subscribeFestConfig(onDataReceived, onError) {
  try {
    const festDocRef = doc(db, FEST_DOC_PATH[0], FEST_DOC_PATH[1]);
    const unsubscribe = onSnapshot(
      festDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onDataReceived(snapshot.data());
        } else {
          // Document doesn't exist yet in the database
          if (onError) onError('NOT_FOUND');
        }
      },
      (error) => {
        console.warn('Firestore subscription warning (using local fallback):', error);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Firestore initialization warning (using local fallback):', err);
    if (onError) onError(err);
    return () => {};
  }
}

