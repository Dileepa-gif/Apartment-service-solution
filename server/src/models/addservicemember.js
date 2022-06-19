const mongoose = require("mongoose")

const addserviceSchema = new mongoose.Schema({
    FirstName :{
        type:String,
    },
    MiddleName:{
        type:String,
    },
    LastName:{
        type:String,
    },
    ServiceCatogory :{
        type:String,
    },
    Address:{
        type:Number,
    },
    Tel_No:{
        type:String,
    },
    DOB :{
        type:Date,
    },
    NIC :{
        type:String,
    },
    Date :{
        type:Date,
    },
    Mobile_number:{
    type:String
    },
})

const AddServiceMember = mongoose.model("AddServiceMember",addserviceSchema);

module.exports=AddServiceMember;