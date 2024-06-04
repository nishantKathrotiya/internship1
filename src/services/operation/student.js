import { toast } from "react-toastify";
import { apiConnector } from "../connector";


export async function newApplication(formData,setLoading,navigate) {
    
      const toastId = toast.loading("Loading...");
      setLoading(true)
      try {
        const response = await apiConnector("POST", 'http://localhost:4000/student/application', {formData})
        if(!response.data.success) {
            throw new Error(response.data.message)
          }
          toast.success("Application Registred")
          // navigate("/student")
      }
       catch (error) {
        console.log("Application Register API ERROR............", error)
        toast.error(error.message)
      }
     setLoading(false)
    toast.dismiss(toastId)
    
  }