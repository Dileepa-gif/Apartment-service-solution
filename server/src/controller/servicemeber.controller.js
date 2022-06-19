const AddServiceMember = require("../models/addservicemember");

const createServiceember = async (req,res)=>{
    const servicemember = new AddServiceMember ({
        ...req.body
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



module.exports ={
    createServiceember,
    getAllServiceMembers,
    getServiceMember,
    updateServiceMember,
    deleteServiceMember
}