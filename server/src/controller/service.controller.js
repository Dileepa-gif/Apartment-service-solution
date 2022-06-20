const Service = require("../models/service");

const create = async (req, res) => {
  try {
    const service = new Service({
      ...req.body,
      resident_id: req.jwt.sub.id,
      service_category: req.body.service_category.toUpperCase()
    });

    const savedService = await service.save();
    return res
      .status(200)
      .json({ code: 200, success: true, data: savedService });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json({ code: 200, success: true, data: services });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getServicesById = async (req, res) => {
  const servicesId = req.params.complaintId;
  try {
    const service = await Service.findById(servicesId);
    if (service) {
      res.status(200).json({
        code: 200,
        success: true,
        data: service,
        message: "Service is received",
      });
    } else {
      res.status(200).json({
        code: 200,
        success: false,
        data: service,
        message: "Service is not found",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getCookingServicesByResidentId = async (req, res) => {
  try {
    const services = await Service.find({
      resident_id: req.jwt.sub.id,
      service_category: "COOKING",
    });
    return res.status(200).json({ code: 200, success: true, data: services });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getWashingServicesByResidentId = async (req, res) => {
  try {
    const services = await Service.find({
      resident_id: req.jwt.sub.id,
      service_category: "WASHING",
    });
    return res.status(200).json({ code: 200, success: true, data: services });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getCleaningServicesByResidentId = async (req, res) => {
  try {
    const services = await Service.find({
      resident_id: req.jwt.sub.id,
      service_category: "CLEANING",
    });
    return res.status(200).json({ code: 200, success: true, data: services });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await Service.findByIdAndDelete(serviceId);
    if (service) {
      res.status(200).json({
        code: 200,
        success: true,
        data: service,
        message: "Service is received",
      });
    } else {
      res.status(200).json({
        code: 200,
        success: false,
        data: service,
        message: "Service is not found",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const confirm = async (req, res) => {
  const servicesId = req.params.servicesId;
  try {
    var service = await Service.findById(servicesId);
    service.status = "Confirmed";
    service.save();

    res.status(200).json({
      code: 200,
      success: true,
      data: service,
      message: "confirmed",
    });

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  getAllServices,
  getServicesById,
  getCookingServicesByResidentId,
  getWashingServicesByResidentId,
  getCleaningServicesByResidentId,
  deleteService,
  confirm
};
