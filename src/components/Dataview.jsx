import React from 'react'
import { CiEdit } from "react-icons/ci";
import { AiOutlineDownload } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { viewApplication , downloadFile } from "../services/operation/common";
import Menu from './Menu';
import { downloadData } from '../lib/data';
import { useNavigate } from 'react-router-dom';

const Dataview = ({ data, index }) => {

    const navigate = useNavigate();
    
    const elemnts = {
        editData: [
            {
                name: "Form",
                function: () => navigate("/edit"),
            },
            {
                name: "File",
                function: () => navigate("/file"),
            }
        ],
        editIcon : <CiEdit className="icon iconMedium" />,
    }

    return (
        <>
            <div className="colHeader DataNumber">{index + 1}</div>
            <div className="colHeader">{data.paperTitle}</div>
            <div className="colHeader">{data.createdAt.split('T')[0]}</div>
            <div className="colHeader"><span className={data.status.status}>{data.status.status}</span></div>
            <div className="colHeader"><Menu applicationID={data._id} data={elemnts.editData} icon={elemnts.editIcon} /> | <Menu applicationID={data._id} data={downloadData.downloadData} icon={downloadData.downloadIcon} /> | <MdDeleteOutline className="icon iconMedium" /></div>
        </>
    )
}

export default Dataview