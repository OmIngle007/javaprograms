import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (!user) {
      navigate('/login');
    } else {
      navigate('/home'); // or wherever your protected route is
    }
  }, [navigate]);

  return null; // This component only handles redirection
};

export default RedirectHandler;
