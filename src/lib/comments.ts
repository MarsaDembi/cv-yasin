// src/lib/comments.ts
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function writeComment(comment: {
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
}) {
  const docRef = await addDoc(collection(db, 'comments'), comment);
  return docRef.id;
}

export async function readComments() {
  const snapshot = await getDocs(collection(db, 'comments'));
  const comments = snapshot.docs.map(doc => doc.data()) as {
    name: string;
    email: string;
    message: string;
    rating: number;
    createdAt: string;
  }[];
  return comments;
}
