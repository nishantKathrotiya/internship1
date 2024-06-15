import { toast } from "react-toastify";
import { setLoading } from "../../slices/auth";
import { apiConnector } from "../connector";
import { setToken, setUser } from "../../slices/profile";
import Cookies from 'js-cookie';

export function sendOtp(sid, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/auth/sendotp",
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
        "http://localhost:4000/auth/signup",
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
}export function login(sid, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/auth/login",
        { sid, password }
      );
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/admin")
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
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
