const mongoose = require('mongoose');

const otpSchema =  mongoose.Schema({
    otp:{
        type : String,
        required : true
    },
    sid:{
        type : String,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: '5m' 
    }
    
});




module.exports = mongoose.model('otp',otpSchema);