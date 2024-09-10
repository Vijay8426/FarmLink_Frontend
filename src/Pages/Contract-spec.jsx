import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Contract.css';
import Avatar from 'react-avatar'; // Import Avatar from react-avatar

function ContractSpec() {
  const { id } = useParams(); // Extracting id from URL params
  const [contractDetails, setContractDetails] = useState(null); // State to store contract details
  const [buyerDetails, setBuyerDetails] = useState(null); // State to store buyer details
  const [farmerDetails, setFarmerDetails] = useState(null); // State to store farmer details

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage

        // Fetch contract details
        const contractResponse = await axios.get(`http://localhost:5000/contract_data/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the token in the Authorization header
          },
        });
        const contractData = contractResponse.data.contractDetails;
        setContractDetails(contractData); // Set contract details in state

        // Fetch buyer details using buyer_id from contractData
        const buyerResponse = await axios.get(`https://farmlink-ewxs.onrender.com/buyer/profile/${contractData.buyer_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the token in the Authorization header
          },
        });
        setBuyerDetails(buyerResponse.data); // Set buyer details in state

        // Fetch farmer details using farmer_id from contractData
        const farmerResponse = await axios.get(`https://farmlink-ewxs.onrender.com/farmer/profile/${contractData.farmer_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Pass the token in the Authorization header
          },
        });
        setFarmerDetails(farmerResponse.data); // Set farmer details in state

      } catch (error) {
        console.error('Error fetching contract, buyer, or farmer details:', error);
      }
    };

    fetchContractDetails();
  }, [id]);

  // Show a loading message until all details are fetched
  if (!contractDetails || !buyerDetails || !farmerDetails) {
    return <div>Loading...</div>;
  }

  const buyerInfo = buyerDetails[0];
  const buyerCompany = buyerDetails[1];
  const farmerInfo = farmerDetails[0];
  const farmerFarm = farmerDetails[1];

  return (
    <div>
      <section className="section about-section gray-bg" id="about" style={{ paddingTop: '9%' }}>
        <div className="container">
          {/* Contract Details */}
          <div className="row align-items-center flex-row-reverse">
            <div className="container px-5">
              <div className="about-text go-to">
                <h3 className="dark-color">Contract ID: {contractDetails.contract_id}</h3>
                <h6 className="theme-color lead">Contract Details</h6>
                <p>
                  Contract Value: <mark>{contractDetails.contract_value}</mark><br/>
                  Status: <mark>{contractDetails.status}</mark><br/>
                  Start Date: <mark>{new Date(contractDetails.start_date).toLocaleDateString()}</mark><br/>
                  End Date: <mark>{new Date(contractDetails.end_date).toLocaleDateString()}</mark><br/>
                  Payment Status: <mark>{contractDetails.payment_status}</mark><br/>
                  Contract Address: <mark>{contractDetails.blockchainaddress}</mark><br/>
                  Attachment: 
                  <a href={`https://ipfs.io/ipfs/${contractDetails.contractfileipfs}`} className="btn-outlined btn-black text-muted d-flex gap-2 p-0 m-0">
                    <img src="https://img.icons8.com/metro/26/000000/link.png" width="17" height="17" id="plus" alt="Attachment"/>
                    <small>File.pdf</small>
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Buyer and Farmer Profile Details */}
          <div className="container profile-page">
            <div className="row">
              {/* Farmer Profile */}
              <div className="col-xl-6 col-lg-7 col-md-12">
                <div className="card1 profile-header">
                  <div className="body1">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="profile-image float-md-right">
                          <Avatar name={farmerInfo.name} size="100" round={true}  /> {/* Replace with Avatar */}
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8 col-12">
                        <h4 className="m-t-0 m-b-0"><strong>Farmer {farmerInfo.name}</strong></h4>
                        <p>Email: {farmerInfo.email}</p>
                        <p>Phone: {farmerInfo.phone_no}</p>
                        <h6 className="theme-color lead">Farm Details</h6>
                        <p>Farm Name: {farmerFarm.farm_name}</p>
                        <p>Farm Location: {farmerFarm.farm_location}</p>
                        <p>Farm Size: {farmerFarm.farm_size} acres</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer Profile */}
              <div className="col-xl-6 col-lg-7 col-md-12">
                <div className="card1 profile-header">
                  <div className="body1">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-12">
                        <div className="profile-image float-md-right">
                          <Avatar name={buyerInfo.name} size="100" round={true} /> {/* Replace with Avatar */}
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8 col-12">
                        <h4 className="m-t-0 m-b-0"><strong>Buyer {buyerInfo.name}</strong></h4>
                        <p>Email: {buyerInfo.email}</p>
                        <p>Phone: {buyerInfo.phone_no}</p>
                        <h6 className="theme-color lead">Company Details</h6>
                        <p>Company Name: {buyerCompany.company_name}</p>
                        <p>Address: {buyerCompany.company_address}</p>
                        <p>GST No: {buyerCompany.gst_no}</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContractSpec;
