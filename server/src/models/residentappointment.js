const mongoose = require("mongoose")

const residentAppoinmetSchema = new mongoose.Schema({
    
    appointmentName:{
        type:String,
    },
    numOfGuest :{
        type:Number,
    },
    appointmentNIC:{
        type:String,
    },
    appointmentDate :{
        type:Date,
    },

    mobileNumber:{
        type:Number,
    },
    expireDate :{
        type:Date,
    },
    startDate :{
        type:Date,
    },
    otp:{
        type :Number,
    },
    appointmentStatus :{
        type:String,
    },
   
})

const ResidentAppointment = mongoose.model("ResidentAppointment",residentAppoinmetSchema);

module.exports=ResidentAppointment;