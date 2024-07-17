import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
import "../stylesheets/StudentDashboard.css";
import MeteorDemo from "../components/Meteors";

import { dashboardDetails, downloadPDF } from "../services/operation/student";
import GridPatternDemo from "../components/GridCard";
import { useSelector } from "react-redux";

const StudentDashboard = () => {

  const [userData, setUserData] = useState(null);
  const [countData , setCountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useSelector((state)=>state.profile)
  const getData = ()=>{
    dashboardDetails(setUserData,setCountData, setLoading);
  }

  // Getting details as soon as page is loded
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="studentDashboard">
      {
        loading ? (<h1>Loading...</h1>) : (
          <>
            <div className="outerContainer-cards">
            {
                (countData == null) ? (<>
                  <div className="tiles-container">
                    <MeteorDemo name={user.sid} />
                    <GridPatternDemo title={"Total Application"} count={'-'} />
                    <GridPatternDemo title={"Approved Application"} count={'-'} />
                    <GridPatternDemo title={"Rejected Application"} count={"-"} />
                    <GridPatternDemo title={"Returned Application"} count={"-"} />
                  </div>
                </>) : (<>
                  <div className="tiles-container">
                    <MeteorDemo name={user.sid} />
                    <GridPatternDemo title={"Total Application"} count={countData.totalCount} />
                    <GridPatternDemo title={"Approved Application"} count={countData.approved} />
                    <GridPatternDemo title={"Rejected Application"} count={countData.rejected} />
                    <GridPatternDemo title={"Returned Application"} count={countData.returned} />
                  </div>
                </>)
              }
              
            </div>
            <div className="newApplication-conatainer">
                <Link to="/student/application" className="newApplicationBTN">New Application</Link>
              </div>

            {
              userData == null ? (<h1>Data Not Found</h1>) : (
                <>
                  <div className="dataTable-container">
                    <DataTable userData={userData} id={'student'}/>
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
