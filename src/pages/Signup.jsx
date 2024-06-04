import React, { useState } from 'react'
import Navbar from './Navbar'
import signupImg from '../assets/signup.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../slices/auth'
import {sendOtp} from '../services/operation/authApi'
// import { sendOtp } from '../../../services/operation/authApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../stylesheets/signup.css'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        sid: "",
        password: "",
        confirmPassword: "",
    })
    const { firstName, lastName, sid, password, confirmPassword } = formData
    const { loading } = useSelector((state) => state.auth)

    function handleOnChange(e) {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
        console.log(formData);
    }

    function validateSid(sid) {
        const regex = /^\d{2}[A-Za-z]{3}\d{3}$/;
        return regex.test(sid);
    }


    function handleOnSubmit(e) {
        e.preventDefault();
        console.log("Data Submitted");
        console.log(formData)
        if (password.length < 8 || confirmPassword.length < 8 || password != confirmPassword) {
            toast.error("Password must be at least 8 characters long and must match");
            return;
        }
        if (!validateSid(sid)) { toast.error("Enter Valid Student Id"); return; }
        const signupData = { ...formData };
        console.log("Data AT point of Dispatch");
        console.log(signupData)
        dispatch(setSignupData(signupData))
        dispatch(sendOtp(formData.sid, navigate))
        setFormData({ firstName: "", lastName: "", sid: "", password: "", confirmPassword: "", })           // Reset
    }


    return (
        <div className='signup-main-container'>
            <Navbar />
            {
                loading ? (<>Loading</>) : (
                    <>
                        <div className='signup-image'>
                <img src={signupImg} alt='signup-image' />
            </div>

            <div className='signup-container'>
                <div className='signup-form-container'>
                    <h1>Signup</h1>

                    <form className='signup-form' onSubmit={handleOnSubmit}>

                        <div className='field-group'>
                            <div className='input-container'>
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    placeholder='John'
                                    id='firstName'
                                    name='firstName'
                                    value={firstName}
                                    onChange={handleOnChange}
                                    required />
                            </div>
                            <div className='input-container'>
                                <label htmlFor="lastName">Last Name *</label>
                                <input
                                    type="text"
                                    placeholder='Doe'
                                    id='lastName'
                                    name='lastName'
                                    value={lastName}
                                    onChange={handleOnChange} />
                            </div>
                        </div>

                        <div className='field-group'>
                            <div className='input-container fullwidth'>
                                <label htmlFor="firstName">Student Id *</label>
                                <input
                                    type="text"
                                    placeholder='22DITXXX'
                                    id='firstName'
                                    name='sid'
                                    value={sid}
                                    onChange={handleOnChange} />
                            </div>

                        </div>

                        <div className='field-group'>
                            <div className='input-container'>
                                <label htmlFor="password">Password *</label>
                                <input
                                    type="password"
                                    placeholder='8 charchter long'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={handleOnChange} />
                            </div>
                            <div className='input-container'>
                                <label htmlFor="confirm-password">Confirm Password *</label>
                                <input
                                    type="password"
                                    placeholder='8 charchter long'
                                    id='confirm-password'
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleOnChange} />
                            </div>
                        </div>
                        <div className='signup-submit'>
                            <button type='submit'>Sign Up</button>
                            <h4>Alredy Have an account ? <span><Link id='red' to="/login">Login</Link></span></h4>
                        </div>
                    </form>


                </div>
            </div>
                    </>
                )
            }
        </div>
    )
}

export default Signup