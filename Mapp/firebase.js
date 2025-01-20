import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCk_r8WIpCqy_WMwASu7HB19hRNJi9pXYg",
    authDomain: "psychic-rush-413921.firebaseapp.com",
    projectId: "psychic-rush-413921",
    storageBucket: "psychic-rush-413921.appspot.com",
    messagingSenderId: "881426490576",
    appId: "1:881426490576:web:42a7804e3e956144b32ad5",
    measurementId: "G-S0ZFMCYYSR"
  };
const app = initializeApp(firebaseConfig);

// Initialisez Firebase Auth avec AsyncStorage pour la persistance
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export { auth };