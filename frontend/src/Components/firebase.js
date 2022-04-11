import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBk1tu-kLdNZuyiHS8ahrvBXTQm2-ndOpc",
  authDomain: "ggnchill-image.firebaseapp.com",
  projectId: "ggnchill-image",
  storageBucket: "ggnchill-image.appspot.com",
  messagingSenderId: "1091734867232",
  appId: "1:1091734867232:web:08f71c9453a5effc5c9b45",
  measurementId: "G-W96S2H6HRZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);