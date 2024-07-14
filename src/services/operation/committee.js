import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { setNull } from "../../slices/application";


export async function committeeDashboard(setUserData,setCountData,setLoading){

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      "http://localhost:4000/committee/dashboard",
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setUserData(response.data.applications);
    setCountData(response.data.counts)

  } catch (error) {

    toast.error(error.message);

  }

  setLoading(false);
  toast.dismiss(toastId);
}

export function updateStatus(applicationID, action, msg , getData) {
    return async (dispatch) => { // Return a function that accepts `dispatch`
      const toastId = toast.loading("Loading...");
  
      try {
        const response = await apiConnector(
          "POST",
          "http://localhost:4000/committee/update",
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
  