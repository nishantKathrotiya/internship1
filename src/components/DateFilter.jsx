import React from 'react'
import { AiOutlineSortAscending , AiOutlineSortDescending} from "react-icons/ai";
const DateFilter = ({setOpen}) => {
  return (
    <>
        <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortAscending className="text-lg" />
                On
            </div>

            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortDescending className="text-lg" />
                Range
            </div>

            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortDescending className="text-lg" />
                New On top
            </div>
    </>
  )
}

export default DateFilter