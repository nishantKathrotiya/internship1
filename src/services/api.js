// const BASE_URL = "https://internshipserver.onrender.com";
const BASE_URL = "http://localhost:4000";

export const auth = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const student = {
  APPLICATION: BASE_URL + "/student/application",
  DASHBOARD: BASE_URL + "/student/dashboard",
  INITIAL_DATA: BASE_URL + "/student/initalData",
  UPDATE: BASE_URL + "/student/update",
  FIEL_UPDATE: BASE_URL + "/student/editfile",
  DELETE: BASE_URL + "/student/delete",
};


export const hod = {
  DASHBOARD: BASE_URL + "/hod/dashboard",
  UPDATE_STATU: BASE_URL + "/hod/update",
};


export const committee = {
  DASHBOARD: BASE_URL + "/committee/dashboard",
  UPDATE_STATU: BASE_URL + "/committee/update",
};

export const admin = {
  DASHBOARD: BASE_URL + "admin/dashboard",
  UPDATE_STATU: BASE_URL + "/admin/update",
};


