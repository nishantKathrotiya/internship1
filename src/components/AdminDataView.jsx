import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const   AdminDataView = ({data , index , setOpen}) => {
    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.paperTitle}</div>
            <div className="colHeader">{data.createdAt.split('T')[0]}</div>
            <div className="colHeader"><span className={data.status.status}>{data.status.status}</span></div>
            <div className="colHeader">Admin | <FaRegEye onClick={setOpen} /> | <MdDeleteOutline /></div>
        </>
    )
}

export default AdminDataView