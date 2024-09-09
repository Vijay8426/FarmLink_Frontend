import React, { useState, useEffect, useRef } from 'react';
import Image1 from "../../images/hp-banner-mobile.0b0478c0.webp";
import Video from "../../media/hp-banner-video.mp4";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Semiconductor from '../components/Home components/Semiconductor';
import System from '../components/Home components/System';
import Technological from '../components/Home components/Technological';



function Home() {
  const [semi, setsemi] = useState(true);
  const [system, setsystem] = useState(false);
  const [technology, settechnology] = useState(false);
  const semiac = useRef(null);
  const sysac = useRef(null);
  const techac = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const getsemi = () => {
    setsemi(true);
    setsystem(false);
    settechnology(false);
    semiac.current.classList.add('active');
    sysac.current.classList.remove('active');
    techac.current.classList.remove('active');
  };

  const getsys = () => {
    setsemi(false);
    setsystem(true);
    settechnology(false);
    semiac.current.classList.remove('active');
    sysac.current.classList.add('active');
    techac.current.classList.remove('active');
  };

  const gettech = () => {
    setsemi(false);
    setsystem(false);
    settechnology(true);
    semiac.current.classList.remove('active');
    sysac.current.classList.remove('active');
    techac.current.classList.add('active');
  };
  


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
        <section className="page_servicesSection__0UHoG"  data-aos="fade-right" id="services-section">
          <div className="container">
          <h2 data-aos="fade-up" data-aos-delay="100">Our services</h2>
            <div className="page_tabHeader__7v13_ row">
              <div className="col-xl-6 col-lg-7 col-md-12">
                <div className="nav nav-pills nav-fill" role="tablist">
                  <div className="nav-item">
                    <Link
                      role="tab"
                      data-rr-ui-event-key="scs"
                      id="servicesTab-tab-scs"
                      aria-controls="servicesTab-tabpane-scs"
                      aria-selected="true"
                      className="nav-link active"
                      tabIndex="0"
                      ref={semiac}
                      onClick={getsemi}
                    >
                      Semiconductor services
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      role="tab"
                      data-rr-ui-event-key="sls"
                      id="servicesTab-tab-sls"
                      aria-controls="servicesTab-tabpane-sls"
                      aria-selected="false"
                      tabIndex="-1"
                      className="nav-link"
                      onClick={getsys}
                      ref={sysac}
                    >
                      System solutions
                    </Link>
                  </div>
                  <div className="nav-item">
                    <Link
                      role="tab"
                      data-rr-ui-event-key="sgs"
                      id="servicesTab-tab-sgs"
                      aria-controls="servicesTab-tabpane-sgs"
                      aria-selected="false"
                      tabIndex="-1"
                      className="nav-link"
                      onClick={gettech}
                      ref={techac}
                    >
                      Technology services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-content">
              {semi && <Semiconductor />}
              {system && <System />}
              {technology && <Technological />}
            </div>
          </div>
        </section>




      </main>
    </div>
  );
}

export default Home;
