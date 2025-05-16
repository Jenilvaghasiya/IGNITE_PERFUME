import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import './ContactUs.css';

const ContactUs = ({ user, logout }) => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', form);
      setSubmitStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className="contact-page">
      {/* Use your existing Navbar component */}
      <Navbar user={user} logout={logout} />

      {/* Animated Background */}
      <div className="contact-hero">
        <div className="bubbles">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bubble" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
            }}></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-container">
        <div className="contact-card animate-slide-up">
          <div className="contact-header">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you!</p>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div className={`status-message ${submitStatus} animate-pop`}>
              {submitStatus === 'success' ? (
                <><span className="icon">✓</span> Message sent successfully!</>
              ) : (
                <><span className="icon">✕</span> Failed to send message. Please try again.</>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <label htmlFor="name" className={form.name ? 'filled' : ''}>Your Name</label>
              <div className="underline"></div>
            </div>

            <div className="form-group">
              <input 
                type="email" 
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <label htmlFor="email" className={form.email ? 'filled' : ''}>Your Email</label>
              <div className="underline"></div>
            </div>

            <div className="form-group">
              <textarea 
                id="message"
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              ></textarea>
              <label htmlFor="message" className={form.message ? 'filled' : ''}>Your Message</label>
              <div className="underline"></div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

        <div className="contact-info animate-fade-in">
          <div className="info-card">
            <h3>Contact Information</h3>
            <div className="info-item">
              <span className="icon">📍</span>
              <p>123 Perfume Street, Aroma City</p>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <span className="icon">✉️</span>
              <p>info@perfumehub.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;