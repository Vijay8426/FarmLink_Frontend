import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Contracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        // Retrieve the access token from local storage
        const token = localStorage.getItem('accessToken');

        // Fetch contracts data
        const contractsResponse = await axios.get('https://farmlinkbc.onrender.com/contracts_data', {
          headers: {
            'Authorization': `Bearer ${token}` // Set the Authorization header with the token
          }
        });


        // Extract contracts data
        const contractsData = contractsResponse.data;

 

        // Function to fetch the title for a specific tender_id
        const fetchTenderTitle = async (tender_id) => {
          try {
            const tenderResponse = await axios.get(`https://farmlink-ewxs.onrender.com/tender/tenders/${tender_id}/`, {
              headers: {
                'Authorization': `Bearer ${token}` // Use the same token for this request if needed
              }
            });
            return tenderResponse.data.title; // Assuming the response contains a `title` field
          } catch (error) {
            console.error(`Error fetching title for tender ${tender_id}:`, error);
            return 'Unknown Title'; // Fallback title if there is an error
          }
        };

        // Function to fetch the name for a specific buyer_id
        const fetchBuyerName = async (buyer_id) => {
          try {
            const buyerResponse = await axios.get(`https://farmlink-ewxs.onrender.com/buyer/profile/${buyer_id}/`, {
              headers: {
                'Authorization': `Bearer ${token}` // Use the same token for this request if needed
              }
            });
            return buyerResponse.data[0].name; // Assuming the response contains a `name` field
          } catch (error) {
            console.error(`Error fetching name for buyer ${buyer_id}:`, error);
            return 'Unknown Buyer'; // Fallback name if there is an error
          }
        };

        // Function to fetch the name for a specific farmer_id
        const fetchFarmerName = async (farmer_id) => {
          try {
            const farmerResponse = await axios.get(`https://farmlink-ewxs.onrender.com/farmer/profile/${farmer_id}/`, {
              headers: {
                'Authorization': `Bearer ${token}` // Use the same token for this request if needed
              }
            });
            return farmerResponse.data[0].name; // Assuming the response contains a `name` field
          } catch (error) {
            console.error(`Error fetching name for farmer ${farmer_id}:`, error);
            return 'Unknown Farmer'; // Fallback name if there is an error
          }
        };

        // Fetch titles, buyer names, and farmer names for all contracts
        const contractsWithDetails = await Promise.all(
          contractsData.map(async (contract) => {
            const title = await fetchTenderTitle(contract.tender_id);
            const buyerName = await fetchBuyerName(contract.buyer_id);
            const farmerName = await fetchFarmerName(contract.farmer_id);
         
            return { ...contract, title, buyerName, farmerName };
          })
        );

        setContracts(contractsWithDetails); // Set the data with titles and names to state
      } catch (error) {
        console.error('Error fetching contracts data:', error);
      }
    };

    fetchContracts();
  }, []);

  return (
    <div style={{ padding: '7%' }} className='d-flex flex-column'>
      {contracts.length > 0 ? (
        contracts.map(contract => (
          <div key={contract.id} className="card mb-3">
            <Link to={`/contract/7`} className="card-header h5">{contract.title}</Link>
            <div className="card-body">
              <div className='d-flex px-5 py-3' style={{ gap: '50%' }}>
                <span className="card-title h5">Opening: {new Date(contract.start_date).toLocaleDateString()}</span>
                <span className="card-title h5">Closing: {new Date(contract.end_date).toLocaleDateString()}</span>
              </div>
              <div className='d-flex px-5 py-3' style={{ gap: '50%' }}>
                <span className="card-title h5">Farmer: {contract.farmerName}</span>
                <span className="card-title h5">Buyer: {contract.buyerName}</span>
              </div>
              <div className='d-flex px-5 py-3' style={{ gap: '50%' }}>
                <span className="card-title h5">Tender Id: {contract.tender_id}</span>
              </div>
              <p className="card-text px-5 py-3">Contract Value: ₹{contract.contract_value}</p>
              <p className="card-text px-5 py-3">Status: {contract.status.replace(/"/g, '')}</p>
              <div className="px-5">
                <a href={`https://ipfs.io/ipfs/${contract.contractfileipfs}`} className="btn btn-success px-5 py-2" target="_blank" rel="noopener noreferrer">View Contract</a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No contracts found.</p>
      )}
    </div>
  );
}

export default Contracts;
