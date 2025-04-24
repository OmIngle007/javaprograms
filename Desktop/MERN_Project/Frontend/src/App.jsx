import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./components/login";
import Home from './components/homepage';
import Register from './components/register';
import RedirectHandler from './components/redirectHandler';
import Report from './components/report_item';
import UserReports from './components/user_reports';

function App() {

  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RedirectHandler />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<Report />} />
          <Route path="/user-reports" element={<UserReports />} />
        </Routes>
      </Router>
    
    </>
  )
}

export default App