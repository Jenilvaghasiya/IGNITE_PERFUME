import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomizePerfume.css'; // We'll create this CSS file

const CustomizePerfume = ({ user, logout }) => {
  const [form, setForm] = useState({
    baseNote: 'Vanilla',
    middleNote: 'Rose',
    topNote: 'Citrus',
    bottleSize: '30ml',
    customName: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post("http://localhost:5000/api/perfume/custom", form);
      setMessage({ text: "Custom perfume created successfully!", type: 'success' });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setForm({ ...form, customName: '' });
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to create custom perfume. Please try again.", type: 'danger' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation for note selection
  const handleNoteChange = (type, value) => {
    setForm({ ...form, [type]: value });
    // Add visual feedback
    const selectElement = document.getElementById(`${type}-select`);
    if (selectElement) {
      selectElement.classList.add('note-changed');
      setTimeout(() => selectElement.classList.remove('note-changed'), 500);
    }
  };

  return (
    <div className="customize-perfume-page">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
            }}></div>
          ))}
        </div>
      )}

      <Navbar user={user} logout={logout} />

      {/* Animated Hero Section */}
      <div className="customize-hero bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3 animate-float">Create Your Signature Scent</h1>
          <p className="lead animate-fade-in">Craft a perfume as unique as you are</p>
          <div className="perfume-bottle-animation mt-4">
            <div className="bottle"></div>
            <div className="liquid"></div>
          </div>
        </div>
      </div>

      {/* Main Content with Animation */}
      <div className="container my-5 animate-slide-up">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Status Message with Animation */}
            {message.text && (
              <div className={`alert alert-${message.type} alert-dismissible fade show animate-pop`} role="alert">
                {message.text}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage({ text: '', type: '' })}
                  aria-label="Close"
                ></button>
              </div>
            )}

            {/* Perfume Creation Card with Hover Effect */}
            <div className="card shadow-sm border-0 hover-scale">
              <div className="card-header bg-white border-bottom-0 pt-4">
                <h2 className="h4 text-center mb-0">Perfume Customization</h2>
              </div>
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                  {/* Base Note with Animation */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Base Note (Lasts longest)</label>
                    <select 
                      id="baseNote-select"
                      className="form-select form-select-lg"
                      value={form.baseNote}
                      onChange={e => handleNoteChange('baseNote', e.target.value)}
                    >
                      <option value="Vanilla">Vanilla - Warm, sweet, comforting</option>
                      <option value="Musk">Musk - Animalic, sensual, powdery</option>
                      <option value="Sandalwood">Sandalwood - Woody, creamy, balsamic</option>
                      <option value="Amber">Amber - Resinous, warm, honey-like</option>
                    </select>
                    <div className="note-preview mt-2">
                      <div 
                        className="preview-bar base-note" 
                        style={{ 
                          width: '100%',
                          backgroundColor: getNoteColor(form.baseNote)
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Middle Note with Animation */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Middle Note (Heart of the fragrance)</label>
                    <select 
                      id="middleNote-select"
                      className="form-select form-select-lg"
                      value={form.middleNote}
                      onChange={e => handleNoteChange('middleNote', e.target.value)}
                    >
                      <option value="Rose">Rose - Floral, romantic, classic</option>
                      <option value="Jasmine">Jasmine - Intense, sweet, exotic</option>
                      <option value="Lavender">Lavender - Herbal, fresh, calming</option>
                      <option value="Lily">Lily - Elegant, watery, green</option>
                    </select>
                    <div className="note-preview mt-2">
                      <div 
                        className="preview-bar middle-note" 
                        style={{ 
                          width: '100%',
                          backgroundColor: getNoteColor(form.middleNote)
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Top Note with Animation */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Top Note (First impression)</label>
                    <select 
                      id="topNote-select"
                      className="form-select form-select-lg"
                      value={form.topNote}
                      onChange={e => handleNoteChange('topNote', e.target.value)}
                    >
                      <option value="Citrus">Citrus - Fresh, zesty, energizing</option>
                      <option value="Bergamot">Bergamot - Bright, fruity, slightly floral</option>
                      <option value="Mint">Mint - Cool, refreshing, herbal</option>
                      <option value="Green Apple">Green Apple - Crisp, juicy, slightly tart</option>
                    </select>
                    <div className="note-preview mt-2">
                      <div 
                        className="preview-bar top-note" 
                        style={{ 
                          width: '100%',
                          backgroundColor: getNoteColor(form.topNote)
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Bottle Size with Animation */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">Bottle Size</label>
                    <div className="d-flex gap-3 size-selector">
                      {['30ml', '50ml', '100ml'].map(size => (
                        <div 
                          key={size} 
                          className={`form-check size-option ${form.bottleSize === size ? 'active' : ''}`}
                          onClick={() => {
                            setForm({ ...form, bottleSize: size });
                            // Add pulse animation
                            const element = document.querySelector(`.size-option.size-${size}`);
                            if (element) {
                              element.classList.add('pulse');
                              setTimeout(() => element.classList.remove('pulse'), 500);
                            }
                          }}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            id={`size-${size}`}
                            checked={form.bottleSize === size}
                            onChange={() => {}}
                          />
                          <label className="form-check-label" htmlFor={`size-${size}`}>
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Name with Floating Label Animation */}
                  <div className="mb-5 form-floating">
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      id="customName"
                      placeholder=" "
                      value={form.customName}
                      onChange={e => setForm({ ...form, customName: e.target.value })}
                    />
                    <label htmlFor="customName">Name Your Creation (Optional)</label>
                    <div className="form-text">Give your custom perfume a special name</div>
                  </div>

                  {/* Animated Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 py-3 submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">✨</span>
                        <span className="btn-text">Create My Custom Perfume</span>
                        <span className="btn-icon">✨</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Fragrance Notes Info with Animation */}
            <div className="mt-4 text-center">
              <button 
                className="btn btn-link text-decoration-none info-toggle" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#notesInfo"
              >
                <span className="me-2">ⓘ</span> About Fragrance Notes
              </button>
              <div className="collapse mt-2" id="notesInfo">
                <div className="card card-body bg-light animate-expand">
                  <h5 className="h6">Understanding Perfume Notes</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center mb-2">
                      <div className="note-bullet top-note me-2"></div>
                      <strong>Top Notes:</strong> Your first impression, lasting 15-120 minutes
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <div className="note-bullet middle-note me-2"></div>
                      <strong>Middle Notes:</strong> The heart of the fragrance, lasting 3-5 hours
                    </li>
                    <li className="d-flex align-items-center">
                      <div className="note-bullet base-note me-2"></div>
                      <strong>Base Notes:</strong> The lasting impression, remaining 5-10 hours
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color based on note
const getNoteColor = (note) => {
  const colors = {
    'Vanilla': '#F3E5AB',
    'Musk': '#C9A88E',
    'Sandalwood': '#C2B280',
    'Amber': '#FFBF00',
    'Rose': '#FFC0CB',
    'Jasmine': '#F8DE7E',
    'Lavender': '#E6E6FA',
    'Lily': '#F5F5DC',
    'Citrus': '#F3FF4A',
    'Bergamot': '#B3D57D',
    'Mint': '#98FF98',
    'Green Apple': '#8DB600'
  };
  return colors[note] || '#CCCCCC';
};

export default CustomizePerfume;