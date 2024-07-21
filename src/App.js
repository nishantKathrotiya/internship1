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
import ResetPassword from "./pages/ResetPassword.jsx";
import UpdatePassword from "./pages/UpdatePassword.jsx";

import Form from "./pages/Form.jsx";
import EditApplication from "./pages/EditApplication.jsx";
import EditFile from "./pages/EditFile.jsx"
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Admin from "./pages/Admin.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import CommiteDashbord from "./pages/CommiteDashbord.jsx";
import HODDashboard from "./pages/HODDashboard.jsx";
import Download from "./pages/Download.jsx";
import HodRoute from "./components/HodRoute.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  useAuthCheck();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.profile);



  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OpenRoute> <Login /> </OpenRoute>} />
        <Route path="/signup" element={<OpenRoute> <Signup /> </OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute> <SendOtp /> </OpenRoute>} />
        <Route path="/reset-password" element={<OpenRoute> <ResetPassword /> </OpenRoute>} />
        <Route path="/update-password/:token" element={<OpenRoute> <UpdatePassword /> </OpenRoute>} />

        <Route path={"/committee"} element={<Committee><Admin /></Committee>} >
          <Route path={"/committee"} element={<CommiteDashbord />} />
        </Route>

        <Route path={"/hod"} element={<HodRoute><Admin /></HodRoute>} >
          <Route path={"/hod"} element={<HODDashboard />} />
        </Route>

        <Route path={"/admin"} element={<AdminRoute><Admin /></AdminRoute>} >
          <Route path={"/admin"} element={<AdminDashboard />} />
        </Route>

        <Route path="/student" element={<StudentRoute> <Student /> </StudentRoute>} >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/application" element={<Form />} />
          <Route path="/student/:applicationID/formedit" element={<EditApplication />} />
          <Route path="/student/:applicationID/fileedit" element={<EditFile />} />
        </Route>

        

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
