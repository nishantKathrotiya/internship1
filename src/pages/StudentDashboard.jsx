import React from "react";
import "../stylesheets/StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div>
      <div className="title">Recent Application</div>
      <div className="navbar-dashboard">
        <ul>
          <li>Paper Title</li>
          <li>Date</li>
          <li>Status</li>
          <li>Action</li>
        </ul>
      </div>
    </div>
  );
};
export default StudentDashboard;
