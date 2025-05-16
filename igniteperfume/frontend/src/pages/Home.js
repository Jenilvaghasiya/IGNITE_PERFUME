import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Home.css'; // Create this CSS file for custom animations
import Navbar from "../components/Navbar";


const Home = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    'linear-gradient(135deg, rgba(255,105,180,0.7), rgba(138,43,226,0.7)), url("https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    'linear-gradient(135deg, rgba(100,149,237,0.7), rgba(0,255,127,0.7)), url("https://images.unsplash.com/photo-1595425964079-6b40b2160a44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    'linear-gradient(135deg, rgba(255,215,0,0.7), rgba(255,69,0,0.7)), url("https://images.unsplash.com/photo-1615634262417-98a9a83c9c61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Navbar />
    <div className="home-page">
      {/* Animated Hero Section with Sliding Background */}
      <div 
        className="hero-section" 
        style={{
          backgroundImage: backgrounds[currentBg],
          transition: 'background-image 1.5s ease-in-out'
        }}
      >
        <div className="container text-center animate__animated animate__fadeIn">
          <h1 className="display-3 fw-bold mb-4 text-white text-shadow">Ignite Your Senses</h1>
          <p className="lead fs-3 mb-5 text-white text-shadow">Where every scent tells a colorful story</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-lg btn-pink px-4 py-2 animate__animated animate__pulse animate__infinite">
              <i className="bi bi-flower1 me-2"></i>Explore Scents
            </button>
            <button className="btn btn-lg btn-purple px-4 py-2 animate__animated animate__pulse animate__infinite animate__delay-1s">
              <i className="bi bi-magic me-2"></i>Create Magic
            </button>
          </div>
        </div>
      </div>

      {/* Colorful Features with Animation */}
      <div className="container py-5">
        <h2 className="text-center mb-5 rainbow-text">Our Colorful Collection</h2>
        <div className="row g-4">
          {[
            { icon: 'bi-flower1', title: 'Floral', color: 'pink' },
            { icon: 'bi-tree', title: 'Woody', color: 'brown' },
            { icon: 'bi-droplet', title: 'Fresh', color: 'blue' },
            { icon: 'bi-fire', title: 'Spicy', color: 'orange' }
          ].map((item, index) => (
            <div key={index} className="col-md-3">
              <div className={`feature-card bg-${item.color} animate__animated animate__fadeInUp`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="icon-wrapper">
                  <i className={`bi ${item.icon} display-4`}></i>
                </div>
                <h3>{item.title}</h3>
                <p>Discover our vibrant {item.title.toLowerCase()} collection</p>
                <div className="sparkles">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="sparkle" style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Testimonials Carousel */}
      <div className="bg-gradient py-5" style={{ background: 'linear-gradient(45deg, #ff9a9e, #fad0c4)' }}>
        <div className="container">
          <h2 className="text-center mb-5 text-white">Fragrant Reviews</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[
                { text: "The floral scents are absolutely mesmerizing!", author: "Emma" },
                { text: "Best woody fragrances I've ever experienced", author: "James" },
                { text: "The freshness lasts all day long", author: "Sophia" }
              ].map((testimonial, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <div className="testimonial-card p-4 text-center">
                    <i className="bi bi-quote display-4 text-white opacity-25"></i>
                    <p className="fs-4 text-white">{testimonial.text}</p>
                    <p className="text-white fw-bold">— {testimonial.author}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Colorful Newsletter */}
      <div className="container py-5">
        <div className="newsletter-box p-5 rounded-4" style={{ background: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)' }}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="rainbow-text">Join Our Fragrant Journey</h2>
              <p className="fs-5">Get exclusive offers and scent tips!</p>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input type="email" className="form-control form-control-lg" placeholder="Your Email" />
                <button className="btn btn-lg btn-pink" type="button">
                  Subscribe <i className="bi bi-send-fill ms-2"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="floating-icons">
            <i className="bi bi-flower1 floating-icon" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></i>
            <i className="bi bi-droplet floating-icon" style={{ top: '70%', left: '15%', animationDelay: '0.5s' }}></i>
            <i className="bi bi-stars floating-icon" style={{ top: '30%', right: '10%', animationDelay: '1s' }}></i>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;