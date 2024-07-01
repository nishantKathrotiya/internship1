import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "./services/operation/authApi.js";

import OpenRoute from "./components/OpenRoute";
import useAuthCheck from "./components/AuthToken.jsx";
import StudentRoute from "./components/StudentRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Committee from "./components/Committee.jsx";


import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SendOtp from "./pages/SendOtp.jsx";

import Form from "./pages/Form.jsx";
import EditApplication from "./pages/EditApplication.jsx";
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Admin from "./pages/Admin.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import HODDashboard from "./pages/HODDashboard.jsx";
import Download from "./pages/Download.jsx";
import HodRoute from "./components/HodRoute.jsx";

function App() {
  useAuthCheck();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);

  if (token === null) {
    console.log("Printing Token", token);
    dispatch(logout);
  }

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OpenRoute> <Login /> </OpenRoute>} />
        <Route path="/signup" element={<OpenRoute> <Signup /> </OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute> <SendOtp /> </OpenRoute>} />
        <Route path="/download" element={<OpenRoute> <Download /> </OpenRoute>} />

        <Route path={"/committee"} element={<Committee><Admin /></Committee>} >
          <Route path={"/committee"} element={<AdminDashboard />} />
        </Route>

        <Route path={"/hod"} element={<HodRoute><Admin /></HodRoute>} >
          <Route path={"/hod"} element={<HODDashboard />} />
        </Route>

        <Route path="/student" element={<StudentRoute> <Student /> </StudentRoute>} >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/application" element={<Form />} />
          <Route path="/student/:applicationID/formedit" element={<EditApplication />} />
        </Route>

        

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
