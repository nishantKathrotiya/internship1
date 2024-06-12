import React, { useEffect, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useOnClickOutside from '../customHooks/useOnClickOutside';

const PopUp = ({ setOpen }) => {
  const popUpRef = useRef(null);

  // Use the useOnClickOutside hook to handle clicks outside the popup
  useOnClickOutside(popUpRef,  () => setOpen(false));

  return (
    <div className="absoulutContainer">
      <div ref={popUpRef} className="approvalContainer">
        <div className="approvalTitle">
          Take Action
          <AiOutlineCloseCircle className="iconBigger" onClick={()=>setOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
