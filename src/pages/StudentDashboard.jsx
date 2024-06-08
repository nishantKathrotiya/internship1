import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import Dataview from "./Dataview";
import { Link } from "react-router-dom";
import "../stylesheets/StudentDashboard.css";

import { dashboardDetails } from "../services/operation/student";

const StudentDashboard = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Getting details as soon as page is loded
  useEffect(() => {
    dashboardDetails(setUserData, setLoading);
  }, []);

  return (
    <div className="studentDashboard">
      {
        loading ? (<h1>Loading...</h1>) : (
          <>

            {
              userData == null ? (<h1>Data Not Found</h1>) : (

                <>
                  <div className="tiles-container">
                    <h1>Hello Cards Come here</h1>
                    <Link to="/student/application">Click TO apply</Link>
                  </div>

                  <div className="dataTable-container">
                    <div className="header-row">
                      Applications
                      <input type="text" placeholder="search" id="searchInput" />
                    </div>
                    <div className="data-table-inner">

                      <div className="header-title-row">
                        <div className="colHeader DataNumber">Number</div>
                        <div className="colHeader">Paper Title <CiFilter className="icon" /></div>
                        <div className="colHeader">Date <CiFilter className="icon" /></div>
                        <div className="colHeader">Status<CiFilter className="icon" /></div>
                        <div className="colHeader">Action </div>
                      </div>

                      {
                        userData.map((data,index) => (
                        <>
                            <div className="row-content">
                            <Dataview key={data._id} data={data} index={index}/>
                          </div>
                          <div className="row-content">
                            <Dataview key={data._id} data={data} index={index}/>
                          </div>
                          <div className="row-content">
                            <Dataview key={data._id} data={data} index={index}/>
                          </div>
                          <div className="row-content">
                            <Dataview key={data._id} data={data} index={index}/>
                          </div>
                        </>
                        ))
                      }

                    </div>
                  </div>
                </>
              )
            }

          </>
        )
      }
    </div>
  );
};
export default StudentDashboard;
