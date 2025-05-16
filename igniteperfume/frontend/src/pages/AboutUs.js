import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AboutUs.css'; // Add custom styles here
import Navbar from "../components/Navbar";


const AboutUs = () => {
  return (
    <>
    <Navbar />
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">About IgnitePerfume</h1>
          <p className="lead animate__animated animate__fadeInUp">Crafting personalized scents for every soul</p>
        </div>
      </div>

      {/* About Content */}
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-md-6 animate__animated animate__fadeInLeft">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Perfume bottles"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-md-6 animate__animated animate__fadeInRight">
            <h2 className="mb-3">Who We Are</h2>
            <p className="fs-5">
              IgnitePerfume is your gateway to premium, personalized fragrance experiences.
              From floral to spicy, we help you blend a scent that resonates with your soul—
              and name it too! Choose your bottle, size, and essence with full control.
            </p>
            <p className="fs-5">
              Our mission is to deliver not just perfumes, but emotions in a bottle—crafted with care and creativity.
            </p>
          </div>
        </div>

        {/* Features Section - Responsive */}
<div className="mt-5">
  {/* Carousel for Mobile */}
  <div className="d-md-none">
    <div id="featureCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {[
          { icon: 'bi-magic', title: 'Custom Scents', desc: 'Blend your own signature fragrance.' },
          { icon: 'bi-droplet-half', title: 'Natural Oils', desc: 'Crafted using premium natural extracts.' },
          { icon: 'bi-gift', title: 'Perfect Gifts', desc: 'Ideal for celebrations, anniversaries & more.' },
        ].map((item, idx) => (
          <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
            <div className="card mx-3 p-4 text-center">
              <i className={`bi ${item.icon} display-4 mb-3 text-pink`}></i>
              <h5 className="fw-bold">{item.title}</h5>
              <p className="text-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#featureCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>

  {/* Grid for Desktop */}
  <div className="row text-center d-none d-md-flex">
    {[
      { icon: 'bi-magic', title: 'Custom Scents', desc: 'Blend your own signature fragrance.' },
      { icon: 'bi-droplet-half', title: 'Natural Oils', desc: 'Crafted using premium natural extracts.' },
      { icon: 'bi-gift', title: 'Perfect Gifts', desc: 'Ideal for celebrations, anniversaries & more.' },
    ].map((item, idx) => (
      <div className="col-md-4" key={idx}>
        <div className="card shadow-sm p-4 h-100 animate__animated animate__fadeInUp" style={{ animationDelay: `${idx * 0.2}s` }}>
          <i className={`bi ${item.icon} display-4 mb-3 text-pink`}></i>
          <h5 className="fw-bold">{item.title}</h5>
          <p className="text-muted">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
    </>
  );
};

export default AboutUs;
