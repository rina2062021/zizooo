import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

// جلب بيانات متجر مفرد
export const fetchVendorById = async (id) => {
  const docRef = doc(db, 'vendors', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  else return null;
};

// جلب جميع المتاجر
export const fetchAllVendors = async () => {
  const colRef = collection(db, 'vendors');
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// lib/firebaseHelpers.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; // تأكد من المسار

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};
