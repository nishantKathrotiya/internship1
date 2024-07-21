import React, { useState } from "react";
import Navbar from "./Navbar";
import signupImg from "../assets/login.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operation/authApi";
import { useNavigate } from "react-router-dom";
import "../stylesheets/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ sid: "", password: "" });
  const { sid, password } = formData;

  function handleOnChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(login(sid, password, navigate));
  }

  return (
    <div>
      <Navbar />
      <div className="login-main-container">
        <div className="login-image">
          <img src={signupImg} alt="signup-image" />
        </div>

        <div className="login-container">
          <div className="login-form-container">
            <h1m className="loginTitle">Login</h1m>
            <div className="login-form">
              <div className="login-input-container">
                <label htmlFor="studentID">Student Id *</label>
                <input
                  type="text"
                  placeholder="22DITXXX"
                  id="studentID"
                  name="sid"
                  value={sid}
                  onChange={handleOnChange}
                />
              </div>
              <div className="login-input-container">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  className="passwordFix"
                  placeholder="8 charchter long"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                />
              </div>
             <Link to="/reset-password"> <p className="mb-[30px] text-sm">Forgot Password?</p></Link>
            </div>

            <div className="login-submit">
              <button onClick={handleOnSubmit}>Log In</button>
              <h4>
                Don't Have an account ?{" "}
                <span>
                  <Link id="red" to="/signup">
                    Signup
                  </Link>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
