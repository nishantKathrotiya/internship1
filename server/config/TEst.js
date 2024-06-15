const downloadApplication = async (req, res) => {
    try {
      const { applicationID } = req.query;
      console.log(req.query);
      if (!applicationID) {
        return res.send({
          success: false,
          message: "Application Not Found",
        });
      }
  
      const form = await applicationModal.find({ _id: applicationID });
      console.log(form);
      // Example file path (replace with your actual file path)
      const filePath = path.join(
        __dirname,
        "../Files/6662966bf5da26afa215a124/796546874351-conferenceAcceptance.pdf"
      );
  
      // Read the file asynchronously
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).json({ error: "Error reading file" });
        }
  
        // Prepare JSON response data
        const jsonResponse = {
          name: "Nishant",
          message: "File and JSON data fetched successfully",
        };
  
        // Set response headers
        res.setHeader(
          "Content-disposition",
          `attachment; filename=${jsonResponse.name}`
        );
        res.setHeader("Content-type", "application/pdf");
  
        // Send both file and JSON in the response
        res.json({
          file: fileData.toString("base64"), // Convert file data to base64 for easier handling in client-side
          jsonData: jsonResponse,
        });
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  