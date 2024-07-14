import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useOnClickOutside from "../customHooks/useOnClickOutside";
import { setNull, setAction} from "../slices/application";
import { useDispatch , useSelector } from "react-redux";
import { updateStatus } from "../services/operation/admin";

const ClosePopup = ({ setOpen , getData}) => {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.profile);
  const { action  ,applicationID} = useSelector((state) => state.application);
  const popUpRef = useRef(null);

  useOnClickOutside(popUpRef, () => {dispatch(setNull()); setOpen(false)});
  const approveAction = () => dispatch(setAction('closed'));

  const submit = ()=>{
    dispatch( updateStatus(applicationID , action  ,getData , dispatch ));
    setOpen(false);
  }
  

  return (
    <>
      <div className="absoulutContainer">
        <div ref={popUpRef} className="approvalContainer">
          <div className="approvalTitle">
            Take Action
            <AiOutlineCloseCircle
              className="iconBigger"
              onClick={() => {dispatch(setNull()); setOpen(false)}}
            />
          </div>
          <div className="admin-main-container">
            <button onClick={() => { approveAction(); }} className={action == "closed" ? ('admin-approve admin-approve-active') : ("admin-approve")}>
              Close
            </button>
          </div>
          <div className="admin-ok-status">
            <button onClick={() => { submit()} }>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClosePopup;
