const userModel = require("../model/userDetails");
const applicationModal = require("../model/appllication");
const userDetails = require("../model/userDetails");


var html_to_pdf = require('html-pdf-node');
var fs = require('fs');
const path = require("path");
const multer = require("multer");

const dashboard = async (req, res) => {
  try {
    //Coollecting all application
    //but only the few details like [name , date and status]
    const applications = await applicationModal.find( {} , { paperTitle: 1, createdAt: 1, status: 1 } );

    res.send({
      success: true,
      applications,
    });

  } catch (error) {

    console.log(error);
    res.json({
      success: false,
      message: "SomeThing Went Wrong",
    });

  }
};

const updateStatus =  async (req, res) => {

  try {

    const {applicationID , action , msg} = req.body;

    if(!applicationID || !action){
      return res.send({
        success: false,
        message:"Field Missing",
      });
    }

    const action2 = action == 'approved' ? ('inprogress') :  (action) ;
    const application = await applicationModal.findByIdAndUpdate({_id:applicationID},{
      $set:{
        status:{
          status:action2,
          msg:msg
        }
      }
    },{new:true});

    res.send({
      success: true,
      message:"status Updated",
    });

  } catch (error) {

    console.log(error);
    res.json({
      success: false,
      message: "SomeThing Went Wrong",
    });

  }
};



module.exports = { dashboard , updateStatus  };


    