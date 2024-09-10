import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contract.css';

function Contract_req() {
  const [contracts, setContracts] = useState([]);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    // Fetch JWT from localStorage
    const token = localStorage.getItem('accessToken');

    // Set up Axios instance with the Authorization header
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT in Authorization header
      },
    });

    // Fetch contract details from the API
    const fetchContractAndBuyerDetails = async () => {
      try {
        // Fetch contract from farmer profile
        const contractResponse = await axiosInstance.get('https://farmlink-ewxs.onrender.com/farmer/profile/contract/');
        const contractData = contractResponse.data;
        setContracts(contractData); // Set the contract data

        // Fetch buyer details for each contract using buyer IDs
        const buyerPromises = contractData.map(async (contract) => {
          const buyerResponse = await axiosInstance.get(`https://farmlink-ewxs.onrender.com/buyer/profile/${contract.buyer}`);
          return buyerResponse.data;
        });

        const buyersData = await Promise.all(buyerPromises);
        setBuyers(buyersData); // Set buyer details
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContractAndBuyerDetails();
  }, []);

  // Handler to remove a contract when declined
  const handleDecline = (contractId) => {
    // Remove the declined contract from the list
    setContracts((prevContracts) => prevContracts.filter(contract => contract.id !== contractId));
  };

  // Handler for accepting a contract
  const handleAccept = async (contractId) => {
    try {
      // Fetch JWT from localStorage
      const token = localStorage.getItem('accessToken');

      // Make the API call to confirm the farmer's contract
      console.log(contractId)
      const response = await axios.get(`http://localhost:5000/confirm_farmer/${contractId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove the accepted contract from the list
        setContracts((prevContracts) => prevContracts.filter(contract => contract.id !== contractId));
      } else {
        console.error('Error confirming contract:', response.data);
      }
    } catch (error) {
      console.error('Error confirming contract:', error);
    }
  };

  if (contracts.length === 0 || buyers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '10%' }}>
      <div className="container profile-page">
        <div className="row">
          {contracts.map((contract, index) => {
            const buyerInfo = buyers[index][0]; // Buyer personal details
            const buyerCompany = buyers[index][1]; // Buyer company details

            return (
              <div className="col-xl-6 col-lg-7 col-md-12" key={contract.id}>
                <div className="card1 profile-header">
                  <div className="body1">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12 py-3">
                        <div className="profile-image float-md-right">
                          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8 col-12">
                        <h4 className="m-t-0 m-b-0">
                          <strong>{buyerInfo.name}</strong>
                        </h4>
                        <span className="job_post">{buyerCompany.company_name}</span>
                        <p>{buyerCompany.company_address}, {buyerCompany.company_zipcode}</p>
                        <p>Email: {buyerInfo.email}</p>
                        <p>Phone: {buyerInfo.phone_no}</p>
                        <div className="d-flex gap-3">
                          <button 
                            className="btn btn-success btn-round"
                            onClick={() => handleAccept(contract.id)} // Call the accept handler
                          >
                            Accept
                          </button>
                          <button 
                            className="btn btn-danger btn-round btn-simple"
                            onClick={() => handleDecline(contract.id)} // Call the decline handler
                          >
                            Decline
                          </button>
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

export default Contract_req;
