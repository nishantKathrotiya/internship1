import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { b64toBlob } from "../helper";
import {student} from '../api'

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
      student.APPLICATION,
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
    navigate("/student");
  } catch (error) {
    toast.error(error.message);
  }
  setLoading(false);
  toast.dismiss(toastId);
}

export async function dashboardDetails(setUserData,setCountData,setLoading){

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      student.DASHBOARD,
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

export async function initialData(applicationID, setFormData , setLoading , navigate){

  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      student.INITIAL_DATA+`?applicationID=${applicationID}`,
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setFormData(response.data.applications)
  } catch (error) {
    navigate("/student");
    toast.error(error.message);
  }
  setLoading(false);
}

export async function updateApplication(formData,applicationID, setLoading, navigate){

  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      student.UPDATE+`?applicationID=${applicationID}`,
      {formData , applicationID}
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    navigate("/student");
    toast.success("Application Updated");

  } catch (error) {
    toast.error(error.message);
  }
  setLoading(false);
}

export async function fileEdit(formData,applicationID,setLoading,navigate) {
  const formDataToSend = new FormData();

  // Append other fields to FormData
  Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
  });

  const toastId = toast.loading("Loading...");
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      student.FIEL_UPDATE+`?applicationID=${applicationID}`,
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
      navigate("/student");
  } catch (error) {
    toast.error(error.message);
  }
  setLoading(false);
  toast.dismiss(toastId);
}

export async function deleteApplication(applicationID){
  try {
    const response = await apiConnector(
      "DELETE",
      student.DELETE+`?applicationID=${applicationID}`,
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Deleted");

  } catch (error) {
    toast.error(error.message);
  }

}