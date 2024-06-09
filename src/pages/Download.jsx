import React, { useEffect } from "react";

const Download = () => {
  useEffect(() => {
    const downloadFile = async () => {
      try {
        const response = await fetch("http://localhost:4000/download-pdf", {
          method: "GET",
          responseType: "blob",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "22DIT017.jpeg";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    };

    downloadFile();
  }, []);

  return (
    <div>
      <p>Downloading your file...</p>
    </div>
  );
};

export default Download;
