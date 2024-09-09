import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PrettyChatWindow } from "react-chat-engine-pretty";

function Chat() {
  const [userData, setUserData] = useState({ username: '', secret: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make the API call to fetch username and secret
        const response = await axios.get('https://farmlinkbc.onrender.com/chatui', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Include token if required
          }
        });

        // Set the retrieved username and secret to state
        setUserData({
          username: response.data.username,
          secret: response.data.secret
        });
        setLoading(false); // Stop loading once the data is fetched
      } catch (error) {
        console.error('Error fetching chat user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Render a loading state while fetching data
  if (loading) {
    return <div>Loading Chat...</div>;
  }

  return (
    <div style={{ height: "100vh", width: "95vw", paddingTop: '8%',borderRadius:'1%', backgroundColor: "#f0f0f0" }} className='px-5'>
      <PrettyChatWindow
        projectId={`d4c85415-4ada-409f-a738-60fe68d048f5`}
        username={userData.username} // Pass the username from state
        secret={userData.secret} // Pass the secret from state
        style={{
          height: "100%",
          backgroundColor: "#f0f0f0", // Change background color
          color: "#333", // Change font color
          borderRadius: "10px", // Add rounded corners
          border: "1px solid #ccc" // Change border color
        }}
      />
    </div>
  );
}

export default Chat;
