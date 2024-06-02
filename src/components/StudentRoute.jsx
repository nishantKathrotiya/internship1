import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StudentRoute = (children) => {
    
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.profile);
    
    if ((token !== null) && user.role === 'student')
        return children
    else
        return <Navigate to="/home" />
}

export default StudentRoute