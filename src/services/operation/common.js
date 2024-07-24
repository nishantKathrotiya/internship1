import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { b64toBlob } from "../helper";

export async function viewApplication(applicationID) {
    try {
      const response = await apiConnector('GET', `http://localhost:4000/student/viewapplication?id=${applicationID}`);
  
      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
  
      const { file, jsonData } = response.data;
  
      // Convert base64 data to Blob object
      const blob = b64toBlob(file, 'application/pdf');
      const url = window.URL.createObjectURL(blob);
  
      // Create temporary <a> element to initiate download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${jsonData.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // Clean up after download
      a.remove(); // Remove temporary <a> element
  
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file");
    }
}

  export async function downloadFile(applicationID , title) {
    try {
      const response = await apiConnector('GET', `http://localhost:4000/student/download?id=${applicationID}&title=${title}`);
  
      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
  
      const { file , name } = response.data;
  
      // Convert base64 data to Blob object
      const blob = b64toBlob(file, 'application/pdf');
      const url = window.URL.createObjectURL(blob);
  
      // Create temporary <a> element to initiate download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // Clean up after download
      a.remove(); // Remove temporary <a> element
  
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file");
    }
}


export async function getStats(setStats) {
  try {
    const response = await apiConnector('GET', `http://localhost:4000/public/stats`);

    if (!response.data.success) {
      throw new Error("Network response was not ok");
    }

    setStats(response.data.data);

  } catch (error) {
    console.error("Error downloading the file:", error);
  }
}