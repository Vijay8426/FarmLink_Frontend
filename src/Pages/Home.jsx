import React, { useState, useEffect, useRef } from 'react';
import Image1 from "../../images/hp-banner-mobile.0b0478c0.webp";
import Video from "../../media/hp-banner-video.mp4";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';



function Home() {
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div>
      <main>
        <section className="banner bannerWithContent page_homeBanner___C8lq" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="vstack">
                  <h1><span>Let’s Cultivate the Future of </span> Agriculture Together</h1>
                  <p>
                  Grow the Future of Farming with Us.
Seamless Connections Through Digital Contracts.
Fostering Innovation and Trust in Agriculture.
                  </p>
                  <div className="buttonContainer">
                    <a role="button" tabIndex="0" className="button btn btn-primary"  href="#services-section">
                      Learn more <span className="d-none">Semiconductor Services</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            alt="SenaniTech banner"
            fetchPriority="high"
            width="415"
            height="604"
            decoding="async"
            data-nimg="1"
            className="page_bannerImage__MeuLX"
            style={{ color: 'transparent' }}
            src={Image1}
          />
          <video
            className="page_bannerVideo__Q_vff"
            playsInline
            autoPlay
            muted
            loop
          >
            <source src={Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>




      </main>
    </div>
  );
}

export default Home;
