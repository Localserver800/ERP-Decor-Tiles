import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './Order.css';

const Order = () => {
  const { itemId } = useParams(); // Assuming route like /order/:itemId
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch item details from Firestore
  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, 'products', itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem(docSnap.data());
      } else {
        setError('Item not found');
      }
    };
    fetchItem();
  }, [itemId]);

  // Handle order submission
  const handleOrder = async (e) => {
    e.preventDefault();
    if (!item || quantity > item.quantityInStock) {
      setError('Insufficient stock or item not available');
      return;
    }

    // Update inventory in Firestore
    const itemRef = doc(db, 'products', itemId);
    await updateDoc(itemRef, { quantityInStock: item.quantityInStock - quantity });

    // Simulate payment initiation (replace with actual API call)
    alert('Order successful!');
    navigate('/'); // Redirect to home after success
  };

  if (error) return <div>{error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="order-container">
      <h2>Order {item.name}</h2>
      <form onSubmit={handleOrder}>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={item.quantityInStock}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(Math.max(1, e.target.value), item.quantityInStock))}
          />
        </div>
        <div className="form-group">
          <label>Delivery Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address..."
          />
        </div>
        <button type="submit">Initiate Payment</button>
      </form>
      <div>Available Stock: {item.quantityInStock}</div>
    </div>
  );
};

export default Order;