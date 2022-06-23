const ResidentAppointment = require("../models/residentappointment")

const createAppointment = async (req,res)=>{
    console.log(req.body)
    const appoinment = new ResidentAppointment({
    ...req.body
    })

    try {
        await appoinment.save();
        res.send(appoinment)
    } catch (error) {
       console.log(error)
    }
}

const getAllAppointment = async (req,res)=>{
    try {
        const appointments = await ResidentAppointment.find();
        res.send(appointments)
    } catch (error) {
       console.log(error)
    }
}

const getAppointment = async (req,res)=>{
    const appointmentId = req.params.appointmentId;
    try {
        const appointment = await ResidentAppointment.findById(appointmentId);
        res.send(appointment)
    } catch (error) {
       console.log(error)
    }
}

const updateAppointment = async (req,res)=>{
    const appointmentId = req.params.appointmentId;
    const updates = req.body;
    try {
        const appointment = await ResidentAppointment.findByIdAndUpdate(appointmentId,{...updates},{new:true});
        res.send(appointment)
    } catch (error) {
       console.log(error)
    }
}

const deleteAppointment = async (req,res)=>{
    const appointmentId = req.params.appointmentId;
    try {
        const appointment = await ResidentAppointment.findByIdAndDelete(appointmentId)
        res.send(appointment)
    } catch (error) {
       console.log(error)
    }
}



module.exports ={
    createAppointment,
    getAllAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment
}