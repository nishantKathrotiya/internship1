import React, { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useOnClickOutside from "../customHooks/useOnClickOutside";
import { setNull, setAction} from "../slices/application";
import { useDispatch , useSelector } from "react-redux";
import { updateStatus } from "../services/operation/admin";
import { hodStatusUpdate } from "../services/operation/hod";

const PopUp = ({ setOpen , getData}) => {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.profile);
  console.log(user)
  const { action  ,applicationID} = useSelector((state) => state.application);
  const popUpRef = useRef(null);

  useOnClickOutside(popUpRef, () => {dispatch(setNull()); setOpen(false)});

  const [reasonfield, setReasonfield] = useState(false);
  const [msg, setMsg] = useState("");

  const showField = () => setReasonfield(true);
  const hideField = () => setReasonfield(false);

  const approveAction = () => dispatch(setAction('approved'));
  const rejectAction = () => dispatch(setAction('rejected'));
  const returnAction = () => dispatch(setAction('returned'));

  const handleChange = (e) => setMsg(e.target.value);

  const submit = ()=>{
    if(user.role==="hod"){
      dispatch( hodStatusUpdate(applicationID , action , msg ,getData , dispatch ));
    }else{
      dispatch( updateStatus(applicationID , action , msg ,getData , dispatch ));
    }
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
            <button onClick={() => { hideField(); approveAction(); }} className={action == "approved" ? ('admin-approve admin-approve-active') : ("admin-approve")}>
              Approve
            </button>
            <button onClick={() => { showField(); returnAction(); }} className={action == "returned" ? ('admin-return admin-return-active') : ("admin-return")}>
              Return
            </button>
            <button onClick={() => { showField(); rejectAction(); }} className={action == "rejected" ? ('admin-reject admin-reject-active') : ("admin-reject")}>
              Reject
            </button>
          </div>
          {reasonfield && (
            <div className="admin-reason">
              <textarea placeholder="Reason" type="text" onChange={handleChange} />
            </div>
          )}
          <div className="admin-ok-status">
            <button onClick={() => { submit()} }>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
