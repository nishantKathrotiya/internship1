import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SendOtp from "./pages/SendOtp.jsx";

import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import Form from "./pages/Form.jsx";
import Home from "./pages/Home.jsx";
import Student from "./pages/Student.jsx";
import Admin from "./pages/Admin.jsx";
import StudentDashboard from './pages/StudentDashboard.jsx'
import Download from "./pages/Download.jsx";
function App() {
  return (
    <>  
      {/* <Navbar /> */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={ <OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={ <OpenRoute><Signup /></OpenRoute>} />
        <Route path="/verify-email" element={ <OpenRoute><SendOtp /></OpenRoute>} />
        <Route path="/download" element={ <OpenRoute><Download /></OpenRoute>} />
        
      
        <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>}>
          <Route path="/student" element={<StudentDashboard />}/>
          <Route path="/student/application" element={<Form />}/>
        </Route>

        <Route path="/admin" element={<AdminRoute> <Admin /> </AdminRoute>}>
          <Route path="/admin" element={<Home />}/>
        </Route>

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
