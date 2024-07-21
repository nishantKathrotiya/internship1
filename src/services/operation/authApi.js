import { toast } from "react-toastify";
import { setLoading } from "../../slices/auth";
import { apiConnector } from "../connector";
import { setToken, setUser } from "../../slices/profile";
import Cookies from 'js-cookie';
import {auth} from '../api';

export function sendOtp(sid, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        auth.SENDOTP_API,
        { sid, checkUserPresent: true }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  firstName,
  lastName,
  sid,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        auth.SIGNUP_API,
        { firstName, lastName, sid, password, confirmPassword, otp }
      );

      if (!response.data.success) {
        throw new Error(response.data.msg);
      }
      toast.success("Signup Success");
      navigate("/login");
    } catch (error) {
      console.log("SignUp API ERROR............", error);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(sid, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        auth.LOGIN_API,
        { sid, password }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      // Cookies.set('token', response.data.token, { expires: 7 }); 
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/admin")
    } catch (error) {

      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export async function sendResetLink(email,setLoading,navigate) {
  
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        auth.SENDRESETLINK_API,
        { email}
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Email Sent");
      navigate("/login");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(error.message);
    }
   setLoading(false);
    toast.dismiss(toastId);
  
}

export async function updatePassword(token,password,confirmPassword,setLoading,navigate) {
  
  const toastId = toast.loading("Loading...");
  setLoading(true);
  try {
    const response = await apiConnector(
      "POST",
      auth.UPDATEPASSWORD_API,
      { token,password,confirmPassword}
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Updated");
    navigate("/login")
  } catch (error) {
    console.log("SENDOTP API ERROR............", error);
    toast.error("Could Not Update");
  }
  setLoading(false);
  toast.dismiss(toastId);

}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove('token');
    navigate("/");
    toast.success("Logged Out");
  };
}
