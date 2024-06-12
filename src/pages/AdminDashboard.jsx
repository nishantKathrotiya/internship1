import React, { useEffect, useState, useRef } from "react";
import DataTable from "../components/DataTable";
import MeteorDemo from "../components/Meteors";
import PopUp from "../components/PopUp";

import "../stylesheets/StudentDashboard.css";

import { dashboardDetails } from "../services/operation/student";
import GridPatternDemo from "../components/GridCard";
import useOnClickOutside from "../customHooks/useOnClickOutside";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  // Getting details as soon as page is loaded
  useEffect(() => {
    dashboardDetails(setUserData, setLoading);
  }, []);

  // Event handler for clicking outside the popup
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="studentDashboard">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="outerContainer-cards">
            <div className="tiles-container">
              <MeteorDemo name={"H.O.D"} />
              <GridPatternDemo title={"Your Application"} count={25} />
              <GridPatternDemo title={"Approved Application"} count={10} />
              <GridPatternDemo title={"Rejected Application"} count={12} />
              <GridPatternDemo title={"Returned Application"} count={3} />
            </div>
            
          </div>

          {userData == null ? (
            <h1>Data Not Found</h1>
          ) : (
            <div className="dataTable-container">
              <DataTable userData={userData} id={"admin"} setOpen={setOpen} />
            </div>
          )}
        </>
      )}

      {/* Using ref for the PopUp component to detect click outside */}
      {open && (
        <div ref={ref}>
          <PopUp setOpen={setOpen} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
