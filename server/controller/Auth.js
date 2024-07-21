const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const otpModel = require("../model/otp");
const otpGenerator = require("otp-generator");
const userModel = require("../model/userDetails");
const mailSender = require("../transport/mailsender");
const otpTemplate = require("../emailBody/verificatioOtp");
require("dotenv").config();

//signUp
const signUp = async (req, res) => {
  try{
    let {
      firstName,
      lastName,
      sid,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body;
    
    if (
      !firstName||
      !lastName ||
      !sid ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.json({
        success: false,
        msg: "Fill All the Fields",
      });
    }
    sid = sid.toLowerCase();
    const userPresent = await userModel.findOne({ sid: sid });
  
    if (userPresent) {
      return res.json({
        success: false,
        msg: "User Alredy Exist",
      });
    }
  
    // const findOtp = await otpModel
    // .find( {sid:sid.toLowerCase()} )
    // .sort({ createdAt: -1 })
    // .limit(1);
  
  
  
    // if (findOtp[0].otp !== otp) {

    //   return res.json({
    //     success: false,
    //     msg: "OTP Does not match",
    //   });
    // }

    const otpEntries = await otpModel.find({ sid: sid.toLowerCase() }).sort({ createdAt: -1 });

    // Check if there are any OTP entries
    if (otpEntries.length === 0) {
      return res.json({
        success: false,
        msg: "No OTP Found",
      });
    }

    // Verify the most recent OTP
    const latestOtpEntry = otpEntries[0]; // Assuming the most recent OTP is at index 0

    if (latestOtpEntry.otp !== otp) {
      return res.json({
        success: false,
        msg: "OTP Does not match",
      });
    }



    const hasedPassword = await bcrypt.hash(password, 10);
  
    const registredUser = await userModel.create({
      firstName,
      lastName,
      sid,
      email:req.body.sid.toLowerCase()+'@charusat.edu.in',
      password: hasedPassword,
      role: accountType || "student",
    });
  
    return res.json({
      success: true,
      msg: "User Registred",
    });

  }catch(error){

    console.log(error);
    return res.json({
      success: false,
      message: "Signup Failure, please try again",
    });
    
  }
};

//Login
const login = async (req, res) => {
  try {
    let { sid, password } = req.body; 
    if (!sid || !password) {
      // validate krlo means all inbox are filled or not;
      return res.json({
        success: false,
        message: "Please Fill up All the Required Fields",
      });
    }
    sid = sid.toLowerCase();
  
    const user = await userModel.findOne({ sid: sid }); //user check exist or not
    if (!user) {
      return res.json({
        success: false,
        message: "User is not registrered, please signup first",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      //generate JWT, after password matching/comparing
      const payload = {
        // generate payload;
        sid: user.sid,
        id: user._id,
        accountType: user.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        // generate token (combination of header , payload , signature)
        expiresIn: "72h", // set expiry time; , 
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: false,
      };
      res.cookie("token", token, options);
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

//sendOTP
const sendOTP = async (req, res) => {
  try {
    let genratedOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    let exist = await otpModel.findOne({ otp: genratedOtp });
    while (exist) {
      genratedOtp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      let exist = await otpModel.findOne({ otp: genratedOtp });
    }

    let response = await otpModel.create({
      otp: genratedOtp,
      sid: req.body.sid.toLowerCase(),
    });

    let res2 = await mailSender(
      req.body.sid.toLowerCase()+'@charusat.edu.in',
      "Verification Code for Charusat Helpdesk",
      otpTemplate(genratedOtp)
    );

    res.json({
      success: true,
      msg: "OTP Sent Successfully",
    });
  } catch {
    res.json({
      success: false,
      msg: "Something Went Wrong",
    });
  }
};


const createAdmin = async (req, res) => {
  try{
    let {
      sid,
      password,
      accountType,
      department,
      email,
    } = req.body;
    

    if (
      !department ||
      !email ||
      !sid ||
      !password ||
      !accountType
    ) {
      return res.json({
        success: false,
        msg: "Fill All the Fields",
      });
    }
    sid = sid.toLowerCase();
    const userPresent = await userModel.findOne({ sid: sid });
  
    if (userPresent) {
      return res.json({
        success: false,
        msg: "User Alredy Exist",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10);
  
    const registredUser = await userModel.create({
      department,
      email,
      sid,
      password: hasedPassword,
      role: accountType
    });
  
    return res.json({
      success: true,
      msg: "User Registred",
    });

  }catch(error){

    console.log(error);
    return res.json({
      success: false,
      message: "Signup Failure, please try again",
    });
    
  }
};

const resetPassword = async (req, res) => {
  
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Email Missing",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Exist",
      });
    }

    // Generate reset token and save it to user's document
    const resetToken = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    user.ResetPasswordToken = resetToken;
    user.ResetPasswordTokenExperies = now.setHours(now.getHours() + 1); // Token expires in 1 hour

    await user.save();
    console.log(user);

    const mailBody = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `${process.env.FRONTEND_URL}/update-password/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    let res2 = await mailSender(
      email,
      "Reset Password Link for Charusat Helpdesk",
      mailBody
    );

    return res.json({
      success: true,
      message: "Email Sent",
    });

  } catch (err) {
    console.error(err.message);
    return res.json({
      success: false,
      message: "Some Thing Went Wrong",
    });
  }
}

const changePassword = async (req, res) => {
  
  try {
    const { token , password , confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.json({
        success: false,
        message: "Email Missing",
      });
    }

    const user = await userModel.findOne({
      ResetPasswordToken: token,
      ResetPasswordTokenExperies: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        success: false,
        message: "Invlid Token",
      });
    }

    //encrypt the password
    const hasedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token fields
    user.password = hasedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      success: true,
      message: "Password Updated",
    });

  } catch (err) {
    console.error(err.message);
    return res.json({
      success: false,
      message: "Some Thing Went Wrong",
    });
  }
}


module.exports = { signUp, login, sendOTP ,createAdmin,resetPassword,resetPassword,changePassword };
