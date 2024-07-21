const applicationModal = require("../model/appllication");

var fs = require('fs');
const path = require("path");

const downloadFile = async (req, res) => {
    try {
  
      const { id, title } = req.query;
      if (!id || !title) {
        return res.json({
          success: false,
          message: "Id or Title Not Found",
        });
      }
  
      const form = await applicationModal.findById(id);
      if (!form) {
        return res.json({
          success: false,
          message: "Application Not Found",
        });
      }
  
      let fileName;
  
      switch (title) {
        case 'regFeesProof':
          fileName = form.regFeesProof;
          break;
        case 'indexingProof':
          fileName = form.indexingProof;
          break;
        case 'conferenceAcceptance':
          fileName = form.conferenceAcceptance;
          break;
        default:
          return res.json({
            success: false,
            message: "Invalid 'title' parameter",
          });
      }
  
      if (!fileName) {
        return res.json({
          success: false,
          message: `File path for '${title}' not found in the database`,
        });
      }
  
     
      // Example file path (replace with your actual file path)
      const userId = String(form.studentDBID);
      const filePath = path.join(__dirname, "../Files", userId,fileName);
  
      // Read the file asynchronously
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ error: 'Error reading file' });
        }
  
  
        
        // Set response headers
        res.setHeader('Content-disposition', `attachment; filename=${form.paperTitle}-${title}`);
        res.setHeader('Content-type', 'application/pdf');
  
        // Send both file and JSON in the response
        res.json({
          success:true,
          file: fileData.toString('base64'), // Convert file data to base64 for easier handling in client-side
          name:`${form.paperTitle}-${title}`
        });
      });
  
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something Went Wrong",
      });
    }
  };
  
const viewApplication = async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) {
        return res.json({
          success: false,
          message: "Id Not Found",
        });
      }
  
      
      const form = await applicationModal.findById({_id:id});
  
      if(!form){
        return res.json({
          success: false,
          message: "Application Not Found",
        });
      }

      
      // Example file path (replace with your actual file path)
      const userId = String(form.studentDBID);
      const filePath = path.join(__dirname, "../Files", userId,`${id}.pdf`);
  
      // Read the file asynchronously
      fs.readFile(filePath, (err, fileData) => {
        if (err) {
          console.error('Error reading file:', err);
          return res.status(500).json({ error: 'Error reading file' });
        }
  
  
        // Prepare JSON response data
        const jsonResponse = {
          name:form.paperTitle,
          message: 'File and JSON data fetched successfully',
        };
  
        // Set response headers
        res.setHeader('Content-disposition', `attachment; filename=${jsonResponse.name}`);
        res.setHeader('Content-type', 'application/pdf');
  
        // Send both file and JSON in the response
        res.json({
          success:true,
          file: fileData.toString('base64'), // Convert file data to base64 for easier handling in client-side
          jsonData: jsonResponse,
        });
      });
  
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "SomeThing Went Wrong",
      });
    }
  };


const getDashboardStats = async (req, res) => {
  try {
    const stats = await applicationModal.aggregate([
      {
        $facet: {
          totalApplications: [{ $count: "count" }],
          totalApprovedApplications: [
            { $match: { "status.status": "approved" } },
            { $count: "count" }
          ],
          totalPendingApplications: [
            { $match: { "status.status": { $in: ["pending", "inprogress"] } } }, // Match pending or inprogress status
            { $count: "count" }
          ],
          totalAmountGiven: [
            { $match: { "status.status": "closed" } }, // Match only closed status
            { $group: { _id: null, totalAmount: { $sum: "$regFees" } } }
          ],
          amountGivenForWebScience: [
            { $match: { "status.status": "closed", "indexing": "Web Science" } }, // Match only closed status and Web Science
            { $group: { _id: null, totalAmount: { $sum: "$regFees" } } }
          ],
          amountGivenForScopus: [
            { $match: { "status.status": "closed", "indexing": "Scopus" } }, // Match only closed status and Scopus
            { $group: { _id: null, totalAmount: { $sum: "$regFees" } } }
          ]
        }
      },
      {
        $project: {
          totalApplications: { $ifNull: [{ $arrayElemAt: ["$totalApplications.count", 0] }, 0] },
          totalApprovedApplications: { $ifNull: [{ $arrayElemAt: ["$totalApprovedApplications.count", 0] }, 0] },
          totalPendingApplications: { $ifNull: [{ $arrayElemAt: ["$totalPendingApplications.count", 0] }, 0] },
          totalAmountGiven: { $ifNull: [{ $arrayElemAt: ["$totalAmountGiven.totalAmount", 0] }, 0] },
          amountGivenForWebScience: { $ifNull: [{ $arrayElemAt: ["$amountGivenForWebScience.totalAmount", 0] }, 0] },
          amountGivenForScopus: { $ifNull: [{ $arrayElemAt: ["$amountGivenForScopus.totalAmount", 0] }, 0] }
        }
      }
    ]);

    console.log(stats[0]);

    return res.json({
      success: true,
      message: "Looged Your data",
      data:stats[0],
    });

  } catch (error) {
    console.log(error);
      res.json({
        success: false,
        message: "SomeThing Went Wrong",
      });
  }
};


module.exports = { downloadFile , viewApplication,getDashboardStats }