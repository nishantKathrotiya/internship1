import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OpenRoute = ({ children }) => {
  //Change The logic and Check Loggedin OR Not

  const { token } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.profile);
  
  if (token === null ) {
    return children;
  } else {
    return (
      <>
        <Navigate to="/student" replace={true} />
      </>
    );
  }
};

export default OpenRoute;
