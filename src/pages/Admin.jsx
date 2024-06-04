import React from 'react'
import Navbar from './Navbar';
import '../stylesheets/Student.css'
import { Routes , Route,Outlet} from 'react-router-dom';

const Admin = () => {
  return (
    <div>
        <Navbar bgwhite={true}/>
        <div className='margin'>
          <Outlet />
        </div>
    </div>
  )
}

export default Admin