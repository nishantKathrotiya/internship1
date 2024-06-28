import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Committee = ({ children }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.profile);
    console.log("Tu aagay Admin main");
    if (token !== null && user.role == 'committee') {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};


export default Committee