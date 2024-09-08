import React, { useState } from 'react';
import axios from 'axios';
import './tender.css';

function IssueTender() {
  const [formData, setFormData] = useState({
    title: '',
    open_time: '',
    close_time: '',
    status: '',
    minimum_bid: '',
    maximum_bid: '',
    description: '',
    notice_file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const response = await axios.post('https://farmlink-ewxs.onrender.com/tender/tenders/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', response);
    } catch (err) {
      console.error('Error posting tender data:', err);
    }
  };

  return (
    <div style={{ padding: '7%' }} className="IssueTender">
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>Issue Tender</h3>
            <div className="card">
              <h5 className="text-center mb-4">Powering world-class companies</h5>
              <form className="form-card" onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Tender Title<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="text"
                      name="title"
                      placeholder=""
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Opening date and time<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="datetime-local"
                      name="open_time"
                      placeholder="Enter opening date and time"
                      value={formData.open_time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Closing date and time<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="datetime-local"
                      name="close_time"
                      placeholder="Enter closing date and time"
                      value={formData.close_time}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Minimum Bid<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="number"
                      name="minimum_bid"
                      placeholder="Enter minimum bid"
                      value={formData.minimum_bid}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <h6 className="form-control-label px-3">
                      Maximum Bid<span className="text-danger"> *</span>
                    </h6>
                    <input
                      type="number"
                      name="maximum_bid"
                      placeholder="Enter maximum bid"
                      value={formData.maximum_bid}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <h6>Description <span className="text-danger"> *</span></h6>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-center pb-5 form-group mt-3">
                  <label
                    htmlFor="notice_file"
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
                      id="notice_file"
                      type="file"
                      name="notice_file"
                      className="d-none"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="row justify-content-center">
                  <div className="form-group">
                    <button type="submit" className="btn btn-success w-100">Issue</button>
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

export default IssueTender;
