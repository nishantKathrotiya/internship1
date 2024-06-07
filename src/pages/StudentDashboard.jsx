import React, { useEffect, useState } from "react";
import "../stylesheets/StudentDashboard.css";
import StudentDashboardStatus from "./StudentDashboardStatus";
import { dashboardDetails } from "../services/operation/student";
const StudentDashboard = () => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Getting details as soon as page is loded
  useEffect(() => {
    dashboardDetails(setUserData , setLoading);
  }, []);

  return (
    <div>
      {
        loading ? (<h1>Loading...</h1>) : (
          <>
          <div className="card-img">
            <Bg />
            <h1>Hell</h1>
          </div>
            <div className="title">Recent Application</div>
            <div className="navbar-dashboard-main-container">
              <div className="papertitle">Paper Title</div>
              <div className="date">Date</div>
              <div className="status">Status</div>
              <div className="action">Action</div>
            </div>
           {
             userData === null ? (<>No data Found</>) : (
              <>
                {
                  userData.map((data , index)=>(
                    <StudentDashboardStatus key={index} data={data} />
                  ))
                }
              </>)
           }
          </>
        )
      }
    </div>
  );
};
export default StudentDashboard;
