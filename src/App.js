import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "./services/operation/authApi.js";

import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SendOtp from "./pages/SendOtp.jsx";

import Form from "./pages/Form.jsx";
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Admin from "./pages/Admin.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import Download from "./pages/Download.jsx";

function App() {
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
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <SendOtp />
            </OpenRoute>
          }
        />
        <Route
          path="/download"
          element={
            <OpenRoute>
              <Download />
            </OpenRoute>
          }
        />

        <Route
          path="/student"
          element={
            <PrivateRoute>
              <Student />
            </PrivateRoute>
          }
        >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/application" element={<Form />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              {" "}
              <Admin />{" "}
            </AdminRoute>
          }
        >
          <Route path="/admin" element={<Home />} />
        </Route>

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
