import React from 'react'
import { CiFilter, CiEdit } from "react-icons/ci";
import Download from "./Download"
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { viewApplication } from '../services/operation/common';

const Dataview = ({data , index }) => {
    const viewHandler = ()=>{
        viewApplication(data._id);
    }
    return (
        <>
            <div className="colHeader DataNumber">{index+1}</div>
            <div className="colHeader">{data.paperTitle}</div>
            <div className="colHeader">{data.createdAt.split('T')[0]}</div>
            <div className="colHeader"><span className={data.status.status}>{data.status.status}</span></div>
            <div className="colHeader"><CiEdit className="icon iconMedium"/> | <Download applicationID={data._id} /> | <MdDeleteOutline className="icon iconMedium"/></div>
        </>
    )
}

export default Dataview