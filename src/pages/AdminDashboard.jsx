import React, { useEffect, useState, useRef } from "react";
import DataTable from "../components/DataTable";
import MeteorDemo from "../components/Meteors";
import PopUp from "../components/PopUp";

import "../stylesheets/StudentDashboard.css";

import { adminDashboard } from "../services/operation/admin";
import GridPatternDemo from "../components/GridCard";
import useOnClickOutside from "../customHooks/useOnClickOutside";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [countData, setCountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const getData = ()=>{
    adminDashboard(setUserData,setCountData,setLoading);
  }

  // Getting details as soon as page is loaded
  useEffect(() => {
    getData();
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
              {
                (countData == null) ? (<>
                  <div className="tiles-container">
                    <MeteorDemo name={"committee"} />
                    <GridPatternDemo title={"Total Application"} count={'-'} />
                    <GridPatternDemo title={"Approved Application"} count={'-'} />
                    <GridPatternDemo title={"Rejected Application"} count={"-"} />
                    <GridPatternDemo title={"Returned Application"} count={"-"} />
                  </div>
                </>) : (<>
                  <div className="tiles-container">
                    <MeteorDemo name={"committee"} />
                    <GridPatternDemo title={"Total Application"} count={countData.totalCount} />
                    <GridPatternDemo title={"Approved Application"} count={countData.approved} />
                    <GridPatternDemo title={"Rejected Application"} count={countData.rejected} />
                    <GridPatternDemo title={"Returned Application"} count={countData.returned} />
                  </div>
                </>)
              }
            
          </div>

          {(userData == null || userData.length==0) ? (
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
          <PopUp setOpen={setOpen} getData={getData} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
