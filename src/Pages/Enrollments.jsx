import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar'; // Import react-avatar
import './Contract.css';

function Enrollments() {
  const { id } = useParams(); // Extract the id from the URL
  const [tenderDetails, setTenderDetails] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [userId, setUserId] = useState(null); // Store userId here

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Split the token into its parts
      const payload = token.split('.')[1];

      // Decode the base64 string
      const decodedPayload = atob(payload);

      // Parse the decoded JSON to get the user_id
      const payloadObj = JSON.parse(decodedPayload);

      const userId = payloadObj.user_id; // Assuming 'user_id' is in the payload
      setUserId(userId); // Save userId to state
      console.log('User ID:', userId);

      // Fetch tender details
      axios
        .get(`https://farmlink-ewxs.onrender.com/tender/tenders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTenderDetails(response.data);

          // Make the second API call to retrieve draft details using tender_id
          return axios.get(`https://farmlink-ewxs.onrender.com/draft/drafts/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
        .then(async (draftResponse) => {
          const draftDetails = draftResponse.data;

          // Fetch farmer details for each draft's farmer_id
          const draftsWithFarmers = await Promise.all(
            draftDetails.map(async (draft) => {
              const farmerResponse = await axios.get(
                `https://farmlink-ewxs.onrender.com/farmer/profile/${draft.farmer}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const [personalDetails, farmDetails] = farmerResponse.data;

              // Merge farmer's personal and farm details
              const farmer = { ...personalDetails, ...farmDetails };

              // Combine the draft with the farmer details
              return { ...draft, farmer };
            })
          );

          setDrafts(draftsWithFarmers);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      console.error('JWT token not found in local storage');
    }
  }, [id]);
  console.log(drafts)
  if (!tenderDetails || drafts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container profile-page" style={{ paddingTop: '10%' }}>
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="container px-5">
              <div className="about-text go-to">
                <h3 className="dark-color">{tenderDetails.title}</h3>

                <p>{tenderDetails.description}</p>
                <div className="row about-list">
                  <div className="col-md-6">
                    <div className="media">
                      <label>Start Date</label>
                      <p>{tenderDetails.open_time}</p>
                    </div>
                    <div className="media">
                      <label>Attachment</label>
                      <p>
                        <a
                          href={`https://farmlink-ewxs.onrender.com/${tenderDetails.notice_file}`}
                          className="btn-outlined btn-black text-muted d-flex gap-2 p-0 m-0"
                        >
                          <img
                            src="https://img.icons8.com/metro/26/000000/link.png"
                            width="17"
                            height="17"
                            id="plus"
                            alt="link"
                          />
                          <small>Attachment</small>
                        </a>
                      </p>
                    </div>
                    <div className="media">
                      <label>Status</label>
                      <p>{tenderDetails.status}</p>
                    </div>

                    <div className="media">
                      <label>Minimum Bid</label>
                      <p>{tenderDetails.minimum_bid}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="media">
                      <label>End Date</label>
                      <p>{tenderDetails.close_time}</p>
                    </div>
                    <div className="media">
                      <label>Maximum Bid</label>
                      <p>{tenderDetails.maximum_bid}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {drafts.map((draft) => (
            <div key={draft.id} className="col-xl-6 col-lg-7 col-md-12">
              <div className="card1 profile-header">
                <div className="body1">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <div className="profile-image float-md-right">
                        {/* Avatar based on farmer's name */}
                        <Avatar name={draft.farmer.name} size="100" round={true} />
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-12">
                      <h4 className="m-t-0 m-b-0">
                        <strong>{draft.farmer.name}</strong>
                      </h4>
                      <span className="job_post">{draft.farmer.farm_name}</span>
                      <p>{draft.farmer.farm_location}</p>
                      <p>Farm Size: {draft.farmer.farm_size} acres</p>
                      <a
                        href={`https://farmlink-ewxs.onrender.com${draft.draftfile}`}
                        className="btn-outlined btn-black text-muted d-flex gap-2 py-3"
                      >
                        <img
                          src="https://img.icons8.com/metro/26/000000/link.png"
                          width="17"
                          height="17"
                          id="plus"
                          alt="link"
                        />
                        <small>{draft.draftfile}</small>
                      </a>
                      <div className="d-flex gap-3">
                        <Link  to={`/Contractform/${draft.farmer.id}/${id}/${userId}`}  className="btn btn-primary btn-round">
                          Sign Contract
                        </Link>
                        <button className="btn btn-primary btn-round btn-simple">
                          Message Farmer
                        </button>
                      </div>
                      <p className="social-icon m-t-5 m-b-0">
                        <a title="Twitter" href="javascript:void(0);">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a title="Facebook" href="javascript:void(0);">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a title="Google-plus" href="javascript:void(0);">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a title="Behance" href="javascript:void(0);">
                          <i className="fa fa-behance"></i>
                        </a>
                        <a title="Instagram" href="javascript:void(0);">
                          <i className="fa fa-instagram "></i>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Enrollments;
