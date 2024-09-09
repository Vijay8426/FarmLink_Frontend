import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Contractform.css';

function Contractform() {
  const { farmer_id, tender_id, buyer_id } = useParams(); // Extract parameters from the URL
  const [formData, setFormData] = useState({
    contract_value: 0,
    start_date: '',
    end_date: '',
    description: '',
    contractFile: null,
  });

  // Handler for form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for file upload
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
    console.log(formData)
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    const timestamp = new Date().toISOString(); // Get the current timestamp

    // Create form data for submission
    const contractData = new FormData();
    contractData.append('contract_value', formData.contract_value);
    contractData.append('start_date', formData.start_date);
    contractData.append('end_date', formData.end_date);
    contractData.append('description', formData.description);
    contractData.append('timestamp', timestamp); // Automatically generated
    contractData.append('farmer_id', farmer_id);
    contractData.append('tender_id', tender_id);
    contractData.append('buyer_id', buyer_id);
    contractData.append('status', 'Active'); // Default to Active
    contractData.append('payment_status', 'Pending'); // Default to Pending
    if (formData.file) {
      contractData.append('contractFile', formData.file); // Append file if selected
    }

    // Submit form data to the API
    axios
      .post('https://farmlinkbc.onrender.com/submit_contract', contractData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Contract submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting contract:', error);
      });
  };

  return (
    <div style={{ padding: '7%' }} className="IssueTender">
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>Sign Contract</h3>
            <div className="card">
              <h5 className="text-center mb-4">Powering world-class companies</h5>
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Contract value<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="number"
                      id="contract_value"
                      name="contract_value"
                      placeholder=""
                      value={formData.contract_value}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Start Date and Time<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="date"
                      id="start_date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      End Date and Time<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="date"
                      id="end_date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <h6>Description<span className="text-danger"> *</span></h6>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center pb-5 form-group mt-3">
                  <label
                    htmlFor="dropzone-file"
                    className="d-flex flex-column align-items-center justify-content-center w-100 h-64 border border-secondary border-dashed rounded bg-light hover:bg-secondary hover:text-white cursor-pointer"
                  >
                    <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-6">
                      <svg
                        className="w-2 h-2 mb-5 text-secondary"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-center text-secondary">
                        <span className="font-weight-bold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-center text-muted">file: docs, txt, pdf</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      name="contractFile"
                      className="d-none"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <div className="row justify-content-center">
                  <div className="form-group">
                    <button type="submit" className="btn btn-success w-100">
                      Issue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contractform;
