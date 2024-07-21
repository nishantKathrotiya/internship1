import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../services/operation/authApi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RiLockPasswordLine } from "react-icons/ri";
import Navbar from './Navbar';
import '../stylesheets/ResetPassword.css';

const UpdatePassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8 || confirmPassword.length < 8 || password !== confirmPassword) {
            toast.error('Password must be at least 8 characters long and must match.');
            setFormData({ password: '', confirmPassword: '' });
            return;
        }
        //Update IT
        updatePassword(token, password, confirmPassword, setLoading, navigate);
        setFormData({ password: '', confirmPassword: '' });
    };

    return (
        <div className='resetPasswordContainer'>
            <Navbar />
            <div className='contentContainer'>
                <div>
                    <h1 className='h1Reset'>Update Password</h1>
                    <p>Enter Your New Password</p>
                </div>
                <form className='resetPasswordFormContainer' onSubmit={handleOnSubmit}>
                    <label htmlFor='password'>Enter Password: *</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        placeholder='********'
                        value={password}
                        onChange={handleOnChange}
                    />
                    <label htmlFor='confirmPassword'>Re-Enter Password: *</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        placeholder='********'
                        value={confirmPassword}
                        onChange={handleOnChange}
                    />

                    {
                        !loading ? (<button className='resetbtn' type='submit'>Update Password <RiLockPasswordLine /></button>) : (<button className='resetbtn disabled' type='submit'>Updating Password<RiLockPasswordLine /></button>)
                    }
                    <Link to='/login' className='resetLink'>
                        <FaArrowLeft /> Back To Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
