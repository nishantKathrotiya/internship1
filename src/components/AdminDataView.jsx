import React from 'react'
import { MdPendingActions } from "react-icons/md";
import Download from './Download';
import { setApplicationID } from '../slices/application'
import { useDispatch } from 'react-redux'

const   AdminDataView = ({data , index , setOpen}) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.paperTitle}</div>
            <div className="colHeader">{data.createdAt.split('T')[0]}</div>
            <div className="colHeader"><span className={data.status.status}>{data.status.status}</span></div>
            <button className="colHeader"><MdPendingActions className="iconMedium" onClick={()=>{dispatch(setApplicationID(data._id)); setOpen(true)}}/> | <Download applicationID={data._id} /> </button>
        </>
    )
}

export default AdminDataView