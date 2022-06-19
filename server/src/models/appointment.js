const mongoose = require("mongoose")

const appoinmetSchema = new mongoose.Schema({
    
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
    appointmentStatus :{
        type:String,
    },
   
})

const Appointment = mongoose.model("Appointment",appoinmetSchema);

module.exports=Appointment;