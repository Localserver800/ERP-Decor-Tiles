import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const searchDocuments = async (searchTerm) => {
  const q = query(collection(db, 'products'), where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProducts = async () => {
  const q = query(collection(db, 'products'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (id, product) => {
  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, product);
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};