const AddServiceMember = require("../models/addservicemember");

const createServiceember = async (req,res)=>{
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