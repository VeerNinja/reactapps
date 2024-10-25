import React from 'react';
import homeImage from './../../assets/img/hero-img.png'; 

const HeroSection = () => {
  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 order-lg-last hero-img" data-aos="zoom-out" data-aos-delay="100">
            <img  src={homeImage}  className="img-fluid animated" alt="" />
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center text-center text-md-start" data-aos="fade-in">
            <h2>Website landing page </h2>
            <p>We are a team of talented designers making websites with Bootstrap</p>
            <div className="d-flex mt-4 justify-content-center justify-content-md-start">
              {/* <a href="#" className="download-btn"><i className="bi bi-google-play"></i> <span>Google Play</span></a>
              <a href="#" className="download-btn"><i className="bi bi-apple"></i> <span>App Store</span></a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
