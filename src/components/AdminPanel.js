import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './AdminPanel.css';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (editingId) {
      const productRef = doc(db, 'products', editingId);
      await updateDoc(productRef, { name, quantity });
      setProducts(products.map(p => p.id === editingId ? { ...p, name, quantity } : p));
      setEditingId(null);
    } else {
      const docRef = await addDoc(collection(db, 'products'), { name, quantity });
      setProducts([...products, { id: docRef.id, name, quantity }]);
    }
    setName('');
    setQuantity(0);
  };

  const handleEdit = (product) => {
    setName(product.name);
    setQuantity(product.quantity);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Product Management</h2>
      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.quantity}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;