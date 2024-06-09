import React from 'react'
import { AiOutlineSortAscending , AiOutlineSortDescending} from "react-icons/ai";
const TitleFilter = ({setOpen}) => {
    return (
        <>
            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortAscending className="text-lg" />
                Ascending
                
            </div>

            <div className="linkAtDropDown_22" onClick={() => setOpen(false)}>
                <AiOutlineSortDescending className="text-lg" />
                Descending
            </div>
        </>
    )
}

export default TitleFilter