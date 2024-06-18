import React from "react";
import Navbar from "./Navbar";
import "../stylesheets/Student.css";
import { Routes, Route, Outlet } from "react-router-dom";

const Student = () => {
  return (
    <div>
      <Navbar />
      <div className="margin">
        <Outlet />
      </div>
    </div>
  );
};

export default Student;
