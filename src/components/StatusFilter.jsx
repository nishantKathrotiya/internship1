import React from 'react'
import { AiOutlineSortAscending , AiOutlineSortDescending} from "react-icons/ai";

const StatusFilter = ({setOpen}) => {
  return (
    <>
        <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortAscending className="text-lg" />
                Pending
            </div>

            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortDescending className="text-lg" />
                Rejected
            </div>

            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortDescending className="text-lg" />
                Rerurned
            </div>

            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortDescending className="text-lg" />
                Approved
            </div>
    </>
  )
}

export default StatusFilter