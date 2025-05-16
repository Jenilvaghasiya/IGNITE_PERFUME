import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import './AddPerfume.css'; // We'll create this CSS file

const AddPerfume = ({ user, logout }) => {
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    image: null,
    previewImage: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        previewImage: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("image", form.image);

    try {
      const res = await axios.post("http://localhost:5000/api/perfume/add", data);
      setMessage({ 
        text: "Perfume added successfully!", 
        type: 'success' 
      });
      // Reset form on success
      setForm({ 
        name: '', 
        description: '', 
        price: '', 
        image: null,
        previewImage: null 
      });
    } catch (err) {
      console.error(err);
      setMessage({ 
        text: "Failed to add perfume. Please try again.", 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <div className="add-perfume-page">
      <Navbar user={user} logout={logout} />
      
      {/* Hero Section */}
      <div className="form-hero">
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">Create New Perfume</h1>
          <p className="hero-subtitle animate-fade-in">Add your unique fragrance to our collection</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="form-container animate-slide-up">
        <div className="perfume-form-card">
          {/* Status Message */}
          {message.text && (
            <div className={`form-message ${message.type} animate-pop`}>
              {message.type === 'success' ? (
                <><span className="icon">✓</span> {message.text}</>
              ) : (
                <><span className="icon">✕</span> {message.text}</>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Image Preview */}
            <div className="image-upload-container">
              {form.previewImage ? (
                <div className="image-preview">
                  <img 
                    src={form.previewImage} 
                    alt="Preview" 
                    className="preview-image animate-fade-in"
                  />
                  <button 
                    type="button" 
                    className="change-image-btn"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div 
                  className="upload-placeholder"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <span className="upload-icon">+</span>
                  <p>Click to upload perfume image</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required
              />
            </div>

            {/* Form Fields */}
            <div className="form-group">
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <label htmlFor="name" className={form.name ? 'filled' : ''}>
                Perfume Name
              </label>
              <div className="underline"></div>
            </div>

            <div className="form-group">
              <textarea
                id="description"
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              ></textarea>
              <label htmlFor="description" className={form.description ? 'filled' : ''}>
                Description
              </label>
              <div className="underline"></div>
            </div>

            <div className="form-group">
              <input
                type="number"
                id="price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
              <label htmlFor="price" className={form.price ? 'filled' : ''}>
                Price ($)
              </label>
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
                  Adding...
                </>
              ) : (
                'Add Perfume'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPerfume;