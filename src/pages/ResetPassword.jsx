import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import Navbar from "../pages/Navbar";
import { sendResetLink } from '../services/operation/authApi';
import "../stylesheets/ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast.error('Email address is required');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Enter a valid email address');
      return;
    }
    // Proceed with your logic here, such as sending the reset link
    sendResetLink(email,setLoading,navigate);
    // Optionally, clear the email field after submission
    setEmail('');
  };

  return (
    <div className='resetPasswordContainer'>
      <Navbar />
      <div className='contentContainer'>
        <div>
          <h1 className='h1Reset'>Reset Password</h1>
          <p>Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery.</p>
        </div>
        <form className='resetPasswordFormContainer' onSubmit={handleOnSubmit}>
          <label htmlFor="email">Email address: *</label>
          <input
            type="text"
            id='email'
            name='email'
            placeholder='00dit000@charusat.edu.in'
            value={email}
            onChange={handleOnChange}
          />
          {
            !loading ? (<button className='resetbtn'>Send Email <GoMail /></button>) : (<button className='resetbtn disabled' disabled="true">Sending Email <GoMail /></button>)
          }
          
          <Link to="/login" className='resetLink'> <FaArrowLeft /> Back To Login</Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
