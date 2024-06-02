import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import SendOtp from "./pages/SendOtp.jsx";

import { Route, Routes } from "react-router-dom";
import OpenRoute from "./components/OpenRoute";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx"
import Form from "./pages/Form.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<OpenRoute> <Login /> </OpenRoute>}></Route>
        <Route path="/signup" element={<OpenRoute> <Signup/> </OpenRoute>}></Route>
        <Route path="/verify-email" element={<OpenRoute> <SendOtp/> </OpenRoute>}></Route>
        <Route path="/student" element={<PrivateRoute>Hey Student</PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><h1>Hey Admin</h1></AdminRoute>}/>
        <Route path="/student/application" element={<Form />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
