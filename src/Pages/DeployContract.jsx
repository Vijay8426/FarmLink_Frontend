import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';

const DeployContract = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  
  // Extract the id from URL parameters
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const deployContract = async () => {
      try {
        // Fetch the access token from local storage
        const accessToken = localStorage.getItem('accessToken');
        console.log('Access Token:', accessToken);

        // Set up headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        console.log('ID:', id); // For debugging

        // Append the id to the API endpoint URL
        const response = await axios.get(`http://localhost:5000/paymentsuccess/${id}`, config);

        // Check the response or any specific condition for success
        if (response.status === 200) {
          setModalSuccess(true);
          // Redirect to homepage after showing the success modal
          setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
        } else {
          setModalSuccess(false);
        }
      } catch (error) {
        console.error('Error deploying contract:', error);
        setModalSuccess(false);
      } finally {
        setShowModal(true);
      }
    };

    deployContract();
  }, [id, navigate]); // Dependency array includes id and navigate

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalSuccess ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalSuccess ? 'Contract deployed successfully!' : 'Failed to deploy contract. Please try again.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeployContract;
