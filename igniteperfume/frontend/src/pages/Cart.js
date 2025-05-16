import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import './Cart.css'; // We'll create this CSS file

const Cart = ({ user, logout }) => {
  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <Navbar user={user} logout={logout} />
      
      {/* Hero Section */}
      <div className="cart-hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Your Shopping Cart</h1>
          <p className="hero-subtitle animate-fade-in">Review your selected fragrances</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {cart.length === 0 ? (
          <div className="empty-cart text-center animate-fade-in">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p className="text-muted">Discover our fragrances and add some to your cart</p>
            <button className="btn btn-primary mt-3">Browse Perfumes</button>
          </div>
        ) : (
          <div className="cart-container animate-slide-up">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="item-image">
                    <img 
                      src={`http://localhost:5000/uploads/${item.image}`} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100?text=Perfume';
                      }}
                    />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="text-muted">{item.description || 'Luxury fragrance'}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="qty-btn" 
                      onClick={() => decreaseQty(item._id)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item._id)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="continue-btn">Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;