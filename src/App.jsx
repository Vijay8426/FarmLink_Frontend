import React from 'react';
import Home from './Pages/Home';
import ViewTender from './Pages/ViewTender';
import IssueTender from './Pages/IssueTender';
import Contracts from './Pages/Contracts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';
import Sign_up from './Pages/Sign-up';
import Sigin from './Pages/Sigin';
import Contract_spec from './Pages/Contract-spec';
import Enrollments from './Pages/Enrollments';
import Contractform from './Pages/Contractform';
import Chat from './Pages/Chat';
import Contract_req from './Pages/Contract_req';
import Tender_farmer from './Pages/Tender_farmer';
import Contract_res from './Pages/Contract_res';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewtenders" element={<ViewTender />} />
      <Route path="/issuetender" element={<IssueTender />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign-up" element={<Sign_up/>}></Route>
      <Route path="/sign-in" element={<Sigin/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
      <Route path="/contract/:id" element={<Contract_spec/>}></Route>
      <Route path="/tender/enrollments/:id" element={<Enrollments/>}></Route>
      <Route path="/Contractform/:farmer_id/:tender_id/:buyer_id" element={<Contractform />} />
      <Route path="/tender-farmer" element={<Tender_farmer/>}></Route>
      <Route path="/contract-req" element={<Contract_req/>}></Route>
      <Route path="/contract-res" element={<Contract_res/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
