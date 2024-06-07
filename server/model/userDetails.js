const mongoose = require('mongoose');

const userLoginSchema = mongoose.Schema({
   
    sid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Applications',
    }],
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userLoginSchema);
