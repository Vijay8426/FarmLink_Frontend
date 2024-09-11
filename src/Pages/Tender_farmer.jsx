import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tender_farmer() {
  const [tenders, setTenders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64File, setBase64File] = useState('');

  // Fetch JWT token from localStorage
  const accessToken = localStorage.getItem('accessToken');

  // Fetch tender data on component mount
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get('https://farmlink-ewxs.onrender.com/tender/tenders', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach JWT token in Authorization header
          },
        });
        setTenders(response.data);
      } catch (error) {
        console.error('Error fetching tender data', error);
      }
    };
    fetchTenders();
  }, [accessToken]);

  // Convert file to Base64
  const convertFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setBase64File(reader.result);
    };
    reader.onerror = (error) => {
      console.error('Error converting file to Base64', error);
    };
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    convertFileToBase64(file);
  };

  // Handle Enroll (file upload + second API call with application/json)
  const handleEnroll = async (tenderId) => {
    if (!selectedFile || !base64File) {
      alert('Please select a file before enrolling.');
      return;
    }

    const data = {
      tenderId,
      file: base64File, // Send file as Base64 encoded
      fileName: selectedFile.name,
      fileType: selectedFile.type,
    };

    try {
      const response = await axios.post(`https://farmlink-ewxs.onrender.com/draft/drafts/${tenderId}/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach JWT token in Authorization header
          'Content-Type': 'application/json', // Use application/json content type
        },
      });
      console.log('File uploaded successfully', response.data);
      alert('Enrolled successfully');
    } catch (error) {
      console.error('Error uploading file', error);
      alert('Error during enrollment');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '7%' }}>
      {tenders.map((tender) => (
        <div key={tender.id} className="card mt-5 border-5 pt-2 active pb-0 px-3">
          <div className="card-body">
            <div className="row d-flex flex-col gap-4">
              <div className="col-12">
                <h4 className="card-title"><b>{tender.title}</b></h4>
              </div>
              <div className="row d-flex align-items-center gap-4">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <p className="card-text text-muted h6">
                      <img src="https://img.icons8.com/color/26/000000/christmas-star.png" alt="Star" width="19" height="19" />
                      <i className="fa fa-users text-muted"></i> Public
                      Updated by <span className="font-weight-bold">Company Name</span> on {new Date(tender.open_time).toLocaleDateString()}
                    </p>
                  </h6>
                </div>
                <div>
                  <h5>Tender Description</h5>
                  <p>{tender.description || 'No description available.'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-white px-0">
            <div className="row">
              <div className="col-md-auto d-flex gap-4 align-items-center">
                <div className="col">
                  <h6 className="card-subtitle mb-2 text-muted">
                    <div className="card-text text-muted small d-flex align-items-center gap-2">
                      <img src="https://img.icons8.com/metro/26/000000/star.png" alt="Star" width="19" height="19" />
                      Closing time: {new Date(tender.close_time).toLocaleString()}
                    </div>
                  </h6>
                </div>

                <a href={tender.notice_file} className="btn-outlined btn-black text-muted d-flex gap-2">
                  <img src="https://img.icons8.com/metro/26/000000/link.png" alt="Link" width="17" height="17" />
                  <small>TENDER ATTACHMENTS</small>
                </a>

                <label htmlFor={`formFile_${tender.id}`} className="form-label">Upload Draft</label>
                <input id={`formFile_${tender.id}`} type="file" onChange={handleFileChange} required />

                <button onClick={() => handleEnroll(tender.id)} className="btn btn-success">Enroll</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tender_farmer;
