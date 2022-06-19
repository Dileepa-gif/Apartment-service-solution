const UtilityBill = require("../models/utilitybill");

const createutilitybill = async (req,res)=>{
    const utilitybill = new UtilityBill ({
        ...req.body
    })

    try {
        await utilitybill.save();
        res.send(utilitybill)
    } catch (error) {
       console.log(error)
    }
}

const getAllUtilityBill= async (req,res)=>{
    try {
        const utilitybill = await UtilityBill.find();
        res.send(utilitybill)
    } catch (error) {
       console.log(error)
    }
}

const getUtilityBill = async (req,res)=>{
    const utilitybillID = req.params.UtilitybillId;
    try {
        const utilitybill = await UtilityBill.findById(utilitybillID);
        res.send(utilitybill)
    } catch (error) {
       console.log(error)
    }
}

const updateUtilityBill= async (req,res)=>{
    const utilitybillID = req.params.utilitybillID;
    const updates = req.body;
    try {
        const utilitybill = await UtilityBill.findByIdAndUpdate(utilitybillID,{...updates},{new:true});
        res.send(utilitybill)
    } catch (error) {
       console.log(error)
    }
}

const deleteUtilityBill = async (req,res)=>{
    const utilitybillID = req.params.utilitybillID;
    try {
        const utilitybill = await UtilityBill.findByIdAndDelete(utilitybillID)
        res.send(utilitybill)
    } catch (error) {
       console.log(error)
    }
}



module.exports ={
    createutilitybill,
    getAllUtilityBill,
    getUtilityBill,
    updateUtilityBill,
    deleteUtilityBill
}