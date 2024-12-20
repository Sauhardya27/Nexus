import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "nexus-fdb22.firebaseapp.com",
	projectId: "nexus-fdb22",
	storageBucket: "nexus-fdb22.firebasestorage.app",
	messagingSenderId: "647246800632",
	appId: "1:647246800632:web:a73ff560979538be27fd0d"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();