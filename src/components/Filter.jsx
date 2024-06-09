import { useRef, useState } from "react"
import { CiFilter } from "react-icons/ci"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import TitleFilter from "./TitleFilter"
import DateFilter from "./DateFilter"
import StatusFilter from "./StatusFilter"

import "../stylesheets/Profile.css"

import useOnClickOutside from "../customHooks/useOnClickOutside"



const Filter = ({id}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useOnClickOutside(ref, () => setOpen(false))
    if (!true) return null

    const renderFilter = () => {
        switch(id) {
            case "title":
                return <TitleFilter setOpen={setOpen} />
            case "date":
                return <DateFilter setOpen={setOpen} />
            case "status":
                return <StatusFilter setOpen={setOpen} />
            default:
                return null
        }
    }

    return (
        <button className="relative removerBtnCss" onClick={() => setOpen(true)}>
            <div className="ProfileDrop_22">
                <CiFilter onClick={() => console.log("Hey")} className="icon" />
            </div>
            {open && (
                <div onClick={(e) => e.stopPropagation()} ref={ref} className="DropDownContainer_22" >
                    {renderFilter()}
                </div>
            )}
        </button>
    )
}

export default Filter