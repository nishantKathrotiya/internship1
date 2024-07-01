import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { setNull } from "../../slices/application";

export async function hodDashboard(setUserData,setCountData,setLoading){

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      "http://localhost:4000/hod/dashboard",
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setUserData(response.data.applications);
    setCountData(response.data.counts);
    
    toast.success("Data Found");

  } catch (error) {

    toast.error(error.message);

  }

  setLoading(false);
  toast.dismiss(toastId);
}

export function hodStatusUpdate(applicationID, action, msg , getData) {
    return async (dispatch) => { // Return a function that accepts `dispatch`
      const toastId = toast.loading("Loading...");
  
      try {
        const response = await apiConnector(
          "POST",
          "http://localhost:4000/hod/update",
          { applicationID, action, msg }
        );
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Updated");
        getData();
        dispatch(setNull()); 
      } catch (error) {
        toast.error(error.message);
      }
      toast.dismiss(toastId);
    };
  }