import React, { useState } from 'react';

function Sigin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First API call to login
      const response = await fetch('https://farmlink-ewxs.onrender.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login Response Data:', data);  // Log the response to check the format

      // Extract access and refresh tokens
      const { access, refresh } = data.token;

      // Store tokens in local storage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Second API call to fetch role using the access token
      const roleResponse = await fetch('http://localhost:5000/role', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`, // Use access token
        },
      });

      if (!roleResponse.ok) {
        throw new Error('Failed to fetch role');
      }

      const roleData = await roleResponse.json();
      console.log('Role Data:', roleData);

      // Store the role in local storage
      const { role } = roleData;
      localStorage.setItem('userRole', role);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <section className="vh-100 py-5">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="./images/draw2.svg" className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>

                <button type="submit" className="btn btn-lg btn-block" style={{ backgroundColor: '#008c78', color: 'white' }}>
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sigin;
