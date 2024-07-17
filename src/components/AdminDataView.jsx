import React from 'react'
import { MdPendingActions } from "react-icons/md";
import Menu from './Menu';
import { downloadData } from '../lib/data';
import { setApplicationID } from '../slices/application'
import { useDispatch , useSelector } from 'react-redux'

const   AdminDataView = ({data , index , setOpen}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);

    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.paperTitle}</div>
            <div className="colHeader">{data.createdAt.split('T')[0]}</div>
            <div className="colHeader"><span className={data.status.status}>{data.status.status}</span></div>
            <div className="colHeader"><span className={data.status.status}>{data.status.status}</span></div>
            <button className="colHeader"><MdPendingActions className="iconMedium" onClick={()=>{dispatch(setApplicationID(data._id)); setOpen(true)}}/> | <Menu applicationID={data._id} data={downloadData.downloadData} icon={downloadData.downloadIcon} /> </button>
        </>
    )
}

export default AdminDataView