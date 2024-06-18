import React from 'react'
import Navbar from './Navbar';
import '../stylesheets/Student.css'
import {Outlet} from 'react-router-dom';

const Admin = () => {
  return (
    <div>
        <Navbar />
        <div className='margin'>
          <Outlet />
        </div>
    </div>
  )
}

export default Admin