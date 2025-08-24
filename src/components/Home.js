import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/firebaseSearch';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../App.css'; // Added import for App.css

const Home = () => {
  const [products, setProducts] = useState([]);
  const { translations } = useLanguage();
  const { currentUser, auth } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div>
      {currentUser && (
        <div>
          <p>Welcome, {currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/admin"><button>Admin Panel</button></Link>
        </div>
      )}
      <h2>{translations.welcome}</h2>
      <div>
        <h3>Products</h3>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name} - ${product.price}</p>
            {product.quantityInStock > 0 ? (
              <p>{product.quantityInStock} in stock</p>
            ) : (
              <p>Out of Stock</p>
            )}
            <Link to={`/order/${product.id}`}>
              <button disabled={product.quantityInStock === 0}>
                Order
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div>{translations.categories}</div>
      <div>{translations.cartIcon}</div>
    </div>
  );
};

export default Home;