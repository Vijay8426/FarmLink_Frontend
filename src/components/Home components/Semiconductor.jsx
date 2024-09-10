import React from 'react'
import { Link } from 'react-router-dom';

function Semiconductor() {
  return (
    <div>
                          <div
                    role="tabpanel"
                    id="servicesTab-tabpane-scs"
                    aria-labelledby="servicesTab-tab-scs"
                    className="fade page_serviceTabPane__SvNni tab-pane active show"
                  >
                    <div className="row">
                      <div className="col-md-6 order-lg-1">
                        <img
                          alt="Semiconductor services"
                          data-aos="fade-left"
                          loading="lazy"
                          width="600"
                          height="500"
                          decoding="async"
                          data-nimg="1"
                          className="page_serviceImage__97B3_ undefined "
                          style={{ color: 'transparent' }}
                          src='./images/Smart-contracts-01.png'                         
                      />
                      </div>
                      <div className="col-lg-6">
                        <p>
                        Secure contracts are digital agreements that are legally binding and protected against tampering. They detail all terms, including quantity, quality, delivery schedules, and prices. By using encryption and blockchain technology, these contracts ensure transparency and trust between farmers and buyers. This prevents fraud and ensures that both parties adhere to the agreed terms.



                        </p>
                        <div className="buttonContainer">
                          <Link role="button" tabIndex="0" to='/semiconductor' className="button btn btn-primary">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
    </div>
  )
}

export default Semiconductor