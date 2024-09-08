import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewTender() {
  const [tenders, setTenders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          setError('No token found in localStorage');
          return;
        }

        console.log('Fetching tender data...');

        const response = await axios.get('https://farmlink-ewxs.onrender.com/tender/tender/buyer/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response:', response);
        console.log(response.data)
        // Access the data array from response.data
        setTenders(response.data || []); // Ensure tenders is an array
      } catch (err) {
        console.error('Error fetching tender data:', err);
        setError('Failed to fetch tender data');
      }
    };

    fetchTenderData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tenders.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ paddingTop: '7%' }}>
      {tenders.map((tenders) => (
        <div key={tenders.id} className="card mt-5 border-5 pt-2 active pb-0 px-3">
          <div className="card-body">
            <div className="row d-flex flex-col gap-4">
              <div className="col-12">
                <h4 className="card-title"><b>{tenders.title}</b></h4>
              </div>
              <div className="row d-flex align-items-center gap-4">
                <div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <p className="card-text text-muted h6">
                      <img src="https://img.icons8.com/color/26/000000/christmas-star.png" className="mr-1" width="19" height="19" id="star" />
                      <span className="vl mr-2 ml-0"></span>
                      <i className="fa fa-users text-muted"></i> Public
                      <span className="vl ml-1 mr-2"></span> Updated by <span className="font-weight-bold">Company Name</span> on {new Date(tenders.open_time).toLocaleDateString()}
                    </p>
                  </h6>
                </div>
                <div>
                  <h5>Tenders Description</h5>
                  <p>{tenders.description ? tenders.description : 'No description available'}</p>
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
                      <img src="https://img.icons8.com/metro/26/000000/star.png" className="mr-1" width="19" height="19" id="star" />Closing time: {new Date(tenders.close_time).toLocaleDateString()}
                    </div>
                  </h6>
                </div>
                <a 
                  href={`https://farmlink-ewxs.onrender.com${tenders.notice_file}`} 
                  className="btn-outlined btn-black text-muted d-flex gap-2"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="https://img.icons8.com/metro/26/000000/link.png" width="17" height="17" id="plus" />
                  <small>{tenders.notice_file.split('/').pop()}</small>
                </a>
                <a href="#" className="btn btn-success">View Enrollments</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewTender;
