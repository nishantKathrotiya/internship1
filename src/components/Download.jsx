import { useRef, useState } from "react"
import { AiOutlineDownload } from "react-icons/ai";
import { viewApplication , downloadFile } from "../services/operation/common";


import "../stylesheets/Profile.css"

import useOnClickOutside from "../customHooks/useOnClickOutside"



const Download = ({applicationID}) => {

    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setOpen(false))
    if (!true) return null

    const renderFilter = () => (
        <>
            <div className="linkAtDropDown_22" onClick={()=>viewApplication(applicationID)}>
                Application
            </div>
            <div className="linkAtDropDown_22" onClick={()=>downloadFile(applicationID,"regFeesProof")}>
                Fees
            </div>

            <div className="linkAtDropDown_22" onClick={()=>downloadFile(applicationID,"conferenceAcceptance")}>
            Conference
            </div>
            <div className="linkAtDropDown_22" onClick={()=>downloadFile(applicationID , "indexingProof")}>
            Indexing Proof
            </div>
        </>
    )


    return (
        <button className="relative removerBtnCss" onClick={() => setOpen(!open)}>
            <div className="ProfileDrop_22">
                <AiOutlineDownload onClick={() => console.log("Hey")} className="icon iconMedium" />
            </div>
            {open && (
                <div onClick={(e) => e.stopPropagation()} ref={ref} className="DropDownContainer_22" >
                    {renderFilter()}
                </div>
            )}
        </button>
    )
}

export default Download