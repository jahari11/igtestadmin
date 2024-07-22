


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import "../styles/reg.css"
import { toast } from 'react-toastify';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Hide .navbar-side and set width of .content-container when component mounts
    const navbarSide = document.querySelector('.navbar-side');
    const contentContainer = document.querySelector('.content-container');
    
    if (navbarSide) {
      navbarSide.style.display = 'none';
    }

    if (contentContainer) {
      contentContainer.style.width = '100%';
    }

    // Clean up function to reset styles when component unmounts
    return () => {
      if (navbarSide) {
        navbarSide.style.display = '';
      }

      if (contentContainer) {
        contentContainer.style.width = '';
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount


  const handleRegister = async () => {
    try {
      const response = await axios.post('https://igtestbackend-5ab2183ee5ee.herokuapp.com/api/user/login', { username, password });
      console.log('Login successful:', response.data);
      toast.success("Login successful");

      navigate("/home")
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Try ");

      setError('Login failed');
    }
  };

  return (
    <div className='container'>
      <div className="logbox">
      <h2> Admin Login</h2> 

       <div className="form-box">
       {error && <p className='red'>{error}</p>}
        <input className='form-input' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className='form-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister} className='form-btn'>Login</button>
       </div>
      <Link to='/register'>Register</Link> 
      </div>
    
    </div>
  );
}

export default Login;
