import React from "react";
import "../stylesheets/StudentDashboard.css";
import StudentDashboardStatus from "./StudentDashboardStatus";

const StudentDashboard = () => {
  return (
    <div>
      <div className="title">Recent Application</div>
      <div className="navbar-dashboard-main-container">
        <div className="papertitle">Paper Title</div>
        <div className="date">Date</div>
        <div className="status">Status</div>
        <div className="action">Action</div>
      </div>
      <StudentDashboardStatus />
    </div>
  );
};
export default StudentDashboard;
