import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useOnClickOutside from "../customHooks/useOnClickOutside";
import { set } from "mongoose";

const PopUp = ({ setOpen }) => {
  const popUpRef = useRef(null);

  // Use the useOnClickOutside hook to handle clicks outside the popup
  // useOnClickOutside(popUpRef,  () => setOpen(false));
  const [reasonfield, setReasonfield] = useState(false);
  const [okbutton, setokbutton] = useState(false);
  const showField = () => setReasonfield(true);
  const hideField = () => setReasonfield(false);

  return (
    <>
      <div className="absoulutContainer">
        <div ref={popUpRef} className="approvalContainer">
          <div className="approvalTitle">
            Take Action
            <AiOutlineCloseCircle
              className="iconBigger"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="admin-main-container">
            <button onClick={hideField} className="admin-approve">
              Approve
            </button>
            <button onClick={showField} className="admin-reject">
              Reject
            </button>
            <button onClick={showField} className="admin-return">
              Return
            </button>
          </div>
          {reasonfield && (
            <div className="admin-reason">
              <textarea placeholder="Reason" type="text" />
            </div>
          )}
          <div className="admin-ok-status">
            <button>OK</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;
