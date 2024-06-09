import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/DataTable";
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
                    <DataTable userData={userData} />
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
