const AddServiceMember = require("../models/addservicemember");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const serviceMemberValidation = (data) => {
  const schema = Joi.object({
    FirstName: Joi.string().required().min(2).max(250),
    MiddleName: Joi.string().required().min(2).max(250),
    LastName: Joi.string().allow(null, "").min(2).max(250),
    ServiceCatogory: Joi.string().allow(null, "").min(2).max(250),
    Address: Joi.string().allow(null, "").min(2).max(250),
    Tel_No: Joi.string()
      .allow(null, "")
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    DOB: Joi.string().allow(null, "").min(2).max(250),
    NIC: Joi.string().allow(null, "").min(2).max(250),
    Date: Joi.string().allow(null, "").min(2).max(250),
    Mobile_number: Joi.string()
      .allow(null, "")
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
  });
  return schema.validate(data);
};

const createServiceember = async (req,res)=>{
  const { error } = serviceMemberValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });
    console.log(req.body);
    const servicemember = new AddServiceMember ({
        ...req.body, ServiceCatogory : req.body.ServiceCatogory.toUpperCase()
    })

    try {
        await servicemember.save();
        res.send(servicemember)
    } catch (error) {
       console.log(error)
    }
}

const getAllServiceMembers= async (req,res)=>{
    try {
        const servicemember = await AddServiceMember.find();
        res.send(servicemember)
    } catch (error) {
       console.log(error)
    }
}

const getServiceMember = async (req,res)=>{
    const servicememberId = req.params.servicememberId;
    try {
        const servicemember = await AddServiceMember.findById(servicememberId);
        res.send(servicemember)
    } catch (error) {
       console.log(error)
    }
}

const updateServiceMember= async (req,res)=>{
  const { error } = serviceMemberValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });
    const servicememberId = req.params.servicememberId;
    const updates = req.body;
    try {
        const servicemember = await AddServiceMember.findByIdAndUpdate(servicememberId,{...updates},{new:true});
        res.send(servicemember)
    } catch (error) {
       console.log(error)
    }
}

const deleteServiceMember = async (req,res)=>{
    const servicememberId = req.params.servicememberId;
    try {
        const servicemember = await AddServiceMember.findByIdAndDelete(servicememberId)
        res.send(servicemember)
    } catch (error) {
       console.log(error)
    }
}


const getMembersForCooking = async (req, res) => {
    try {

      const serviceMember = await AddServiceMember.find({ServiceCatogory : "COOKING"});
      if (serviceMember.length) {
        res.status(200).json({
          code: 200,
          success: true,
          data: serviceMember,
          message: "Service member list is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: serviceMember,
          message: "Service member list is empty",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, success: false, message: "Internal Server Error" });
    }
  };


  const getMembersForWashing = async (req, res) => {
    try {

      const serviceMember = await AddServiceMember.find({ServiceCatogory : "WASHING"});
      if (serviceMember.length) {
        res.status(200).json({
          code: 200,
          success: true,
          data: serviceMember,
          message: "Service member list is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: serviceMember,
          message: "Service member list is empty",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, success: false, message: "Internal Server Error" });
    }
  };


  const getMembersForCleaning = async (req, res) => {
    try {

      const serviceMember = await AddServiceMember.find({ServiceCatogory : "CLEANING"});
      if (serviceMember.length) {
        res.status(200).json({
          code: 200,
          success: true,
          data: serviceMember,
          message: "Service member list is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: serviceMember,
          message: "Service member list is empty",
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, success: false, message: "Internal Server Error" });
    }
  };



module.exports ={
    createServiceember,
    getAllServiceMembers,
    getServiceMember,
    updateServiceMember,
    deleteServiceMember,
    getMembersForCooking,
    getMembersForWashing,
    getMembersForCleaning
}