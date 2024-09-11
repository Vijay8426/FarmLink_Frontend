import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contract.css';

function Contract_res() {
  const [contracts, setContracts] = useState([]);
  const [farmerProfiles, setFarmerProfiles] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    // Fetch contracts
    const fetchContracts = async () => {
      try {
        const contractResponse = await axios.get(
          'https://farmlink-ewxs.onrender.com/buyer/buyer/contract/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setContracts(contractResponse.data);

        // Fetch farmer profiles
        contractResponse.data.forEach(async (contract) => {
          const farmerResponse = await axios.get(
            `https://farmlink-ewxs.onrender.com/farmer/profile/${contract.farmer}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setFarmerProfiles((prev) => ({
            ...prev,
            [contract.farmer]: farmerResponse.data,
          }));
        });
      } catch (error) {
        console.error('Error fetching contracts or farmer profiles:', error);
      }
    };

    fetchContracts();
  }, []);

  // Function to handle the "Make Payment" button click
  const handlePayment = async (contractId) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        `https://farmlink-ewxs.onrender.com/payment/buyer/${contractId}/`,
        {}, // You can pass any payment-related data here if needed
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Assuming the API response contains a payment URL
      const paymentUrl = response.data.url;

      // Redirect to the payment URL
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle the error, show an error message to the user
    }
  };

  return (
    <div>
      <div style={{ paddingTop: '10%' }}>
        <div className="container mt-5 d-flex justify-content-center">
          {contracts.map((contract) => {
            const farmerProfile = farmerProfiles[contract.farmer];
            return (
              <div key={contract.id} className="container profile-page">
                <div className="row">
                  <div className="col-xl-6 col-lg-7 col-md-12">
                    <div className="card1 profile-header">
                      <div className="body1">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-12 py-3">
                            <div className="profile-image float-md-right">
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8 col-12">
                            {farmerProfile && (
                              <>
                                {/* Farmer Personal Info */}
                                <h4 className="m-t-0 m-b-0">
                                  <strong>{farmerProfile[0].name}</strong>
                                </h4>
                                <span className="job_post">{farmerProfile[0].email}</span>
                                <p>Phone: {farmerProfile[0].phone_no}</p>

                                {/* Farm Details */}
                                <p>
                                  Farm Name: <strong>{farmerProfile[1].farm_name}</strong>
                                </p>
                                <p>
                                  Location: {farmerProfile[1].farm_location}
                                </p>
                                <p>Farm Size: {farmerProfile[1].farm_size} acres</p>

                                <p className="text-success">{contract.status}</p>
                                <div className="d-flex pb-4">
                                  <button
                                    className="btn btn-primary btn-round btn-simple"
                                    onClick={() => handlePayment(contract.id)}
                                  >
                                    Make Payment
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Contract_res;
