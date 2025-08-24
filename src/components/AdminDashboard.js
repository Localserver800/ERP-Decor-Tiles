import React from 'react';
import AdminPanel from './AdminPanel';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Management Panel</h1>
      <div className="admin-grid">
        <div className="admin-card">
          <h3>Product Management</h3>
          <p>Add, edit, or remove products from your catalog</p>
        </div>
        <div className="admin-card">
          <h3>Order Management</h3>
          <p>View and process customer orders</p>
        </div>
        <div className="admin-card">
          <h3>Inventory Management</h3>
          <p>Track and update product inventory levels</p>
        </div>
        <div className="admin-card">
          <h3>User Management</h3>
          <p>Manage customer accounts and admin access</p>
        </div>
        <div className="admin-card">
          <h3>Analytics & Reports</h3>
          <p>View sales data and business insights</p>
        </div>
        <div className="admin-card">
          <h3>Content Management</h3>
          <p>Update website content and promotions</p>
        </div>
      </div>
      <AdminPanel />
    </div>
  );
};

export default AdminDashboard;