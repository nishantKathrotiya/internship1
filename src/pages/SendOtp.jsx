
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import optImg from '../assets/otp.png'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import { signUp,sendOtp } from '../services/operation/authApi';
import { IoMdRefresh } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";


import '../stylesheets/SendOtp.css'

const SendOtp = () => {

    const [otp, setOtp] = useState();
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    });

    const signupHandler = (e) => {
        e.preventDefault();
        if (otp === undefined) {
            return toast.error("Fill The OTP")
        }
        const { firstName, lastName, sid, password, confirmPassword, } = signupData;
        dispatch(signUp(firstName, lastName, sid, password, confirmPassword, otp, navigate));
    };


    return (
        <div>
            <Navbar />
            {
                loading ? (<>Loading</>) : (
                    <div className='sendotp-main-container'>
                        <div className='sendtop-image'>
                            <img src={optImg} alt='sendtop-image' />
                        </div>

                        <div className='sendotp-container'>

                            <div className='sendotp-form-container'>
                                <h1 className='sendotp-title'>Verify-email</h1>

                                <div className='sendotp-form'>
                                    <form className='verifyEmailForm_22' >
                                        <p className='paraAtVerify_22'>A verification code has been sent to you. Enter the code below</p>
                                        <OtpInput
                                            className="otpContainer_22"
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={6}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} className='inputAtOTP_22' />}
                                        />

                                        <div className='lastSectionAtVerify_22'>
                                            <div className='sendotp-submit'>
                                                <button onClick={signupHandler}>Verify</button>
                                            </div>
                                            <div className='verifyEmailLastLink_22'>
                                                <Link to="/signup" className='verifyEmailLastLinkStyle_22 adjustBTn'>
                                                    <FaArrowLeft />
                                                    Back To Signup
                                                </Link>
                                                <button className='adjustBTn' onClick={()=>dispatch(sendOtp(signupData.sid, navigate))} >
                                                    <IoMdRefresh />
                                                    Resend It
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SendOtp