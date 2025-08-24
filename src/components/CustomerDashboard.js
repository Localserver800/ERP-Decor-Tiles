import React from 'react';
import '../App.css'; // Assuming you want to use styles from App.css
const CustomerDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Your Customer Dashboard</h1> 
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div className="dashboard-card" style={{ border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Your Orders</h3>
          <p>View your order history and track current orders</p> 
        </div>
        <div className="dashboard-card">
          <h3>Wishlist</h3>
          <p>Save your favorite tiles for later</p>
        </div>
        <div className="dashboard-card">
          <h3>Account Settings</h3>
          <p>Update your profile and preferences</p>
        </div> 
        <div className="dashboard-card">
          <h3>Browse Products</h3>
          <p>Continue shopping our collection</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;