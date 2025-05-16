import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Import CartContext
import Navbar from '../components/Navbar';
import './ShowProduct.css';

const ShowProduct = ({ user, logout }) => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();  // Access the addToCart function from the CartContext

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/perfume/list');
        setPerfumes(res.data);
      } catch (err) {
        console.error('Failed to fetch perfumes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerfumes();
  }, []);

  const handleAddToCart = (perfume) => {
    addToCart({
      id: perfume._id,
      name: perfume.name,
      price: perfume.price,
      image: perfume.image,
    });
  };

  return (
    <div className="product-page">
      <Navbar user={user} logout={logout} />

      {/* Hero Section */}
      <div className="product-hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Our Fragrance Collection</h1>
          <p className="hero-subtitle animate-fade-in">Discover scents that tell your story</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading fragrances...</p>
          </div>
        ) : perfumes.length > 0 ? (
          <div className="row">
            {perfumes.map((p, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4 animate-card"
                key={p._id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-card h-100">
                  <div className="product-image-container">
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      className="product-image"
                      alt={p.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300?text=Perfume+Image';
                      }}
                    />
                    <div className="product-badge">New</div>
                  </div>
                  <div className="product-body">
                    <h3 className="product-title">{p.name}</h3>
                    <p className="product-description">{p.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="product-price">${p.price}</span>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(p)}
                      >
                        <span className="cart-icon">🛒</span> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="empty-state-icon">💔</div>
            <h3 className="mt-3">No perfumes available</h3>
            <p className="text-muted">Check back later for our latest fragrances</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
