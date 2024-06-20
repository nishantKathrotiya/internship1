import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { b64toBlob } from "../helper";


export async function newApplication(formData, setLoading, navigate) {
  const formDataToSend = new FormData();

  // Object.keys(formData).forEach((data) => {
  //   formDataToSend.append(data, formData[data]);
  // });
  if (formData.coAuthors) {
    formDataToSend.append('coAuthors', JSON.stringify(formData.coAuthors));
  }
  if (formData.facultyCoAuthors) {
    formDataToSend.append('facultyCoAuthors', JSON.stringify(formData.facultyCoAuthors));
  }

  // Append other fields to FormData
  Object.entries(formData).forEach(([key, value]) => {
    if (key !== 'coAuthors' && key !== 'facultyCoAuthors') {
      formDataToSend.append(key, value);
    }
  });


  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      "http://localhost:4000/student/application",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Application Registred");
    // navigate("/student");
  } catch (error) {
    console.log("Application Register API ERROR............", error);
    toast.error(error.message);
  }
  setLoading(false);
  toast.dismiss(toastId);
}




export async function dashboardDetails(setUserData , setLoading){

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      "http://localhost:4000/student/dashboard",
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setUserData(response.data.applications)
    toast.success("Data Found");

  } catch (error) {

    toast.error(error.message);

  }

  setLoading(false);
  toast.dismiss(toastId);
}
