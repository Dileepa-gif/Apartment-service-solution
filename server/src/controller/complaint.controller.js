const Complaint = require("../models/complaint");
const Resident = require("../models/resident");

const create = async (req, res) => {
  try {
    const dateTime = require("node-datetime");
    const dt = dateTime.create();
    const today = dt.format("Y-m-d");

    const resident = await Resident.findById(req.jwt.sub.id)
    if (!resident)
    return res
      .status(200)
      .json({ code: 200, success: false, message: "Invalid resident" });

    const complaints = new Complaint({
      ...req.body,
      date: today,
      resident_id: resident.resident_id,
      resident_object_id : req.jwt.sub.id
    });

    const savedComplaint = await complaints.save();
    return res
      .status(200)
      .json({ code: 200, success: true, data: savedComplaint });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    return res.status(200).json({ code: 200, success: true, data: complaints });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getComplaintById = async (req, res) => {
  const complaintId = req.params.complaintId;
  try {
    const complaint = await Complaint.findById(complaintId);
    if (complaint) {
      res.status(200).json({
        code: 200,
        success: true,
        data: complaint,
        message: "Complaint is received",
      });
    } else {
      res.status(200).json({
        code: 200,
        success: false,
        data: complaint,
        message: "Complaint is not found",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};


const getComplaintByResidentId = async (req, res) => {
  try {
    const complaints = await Complaint.find({resident_object_id : req.jwt.sub.id});
    return res.status(200).json({ code: 200, success: true, data: complaints });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};


const update = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const updates = req.body;

    const oldComplaint = await Complaint.findById(complaintId);
    if (!oldComplaint)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid complaint id" });

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { ...updates },
      { new: true }
    );
    return res
      .status(200)
      .json({
        code: 200,
        success: true,
        data: updatedComplaint,
        message: "Complaint Updated Successfully!",
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.complaintId;
    const complaint = await Complaint.findByIdAndDelete(complaintId);
    if (complaint) {
      res.status(200).json({
        code: 200,
        success: true,
        data: complaint,
        message: "Complaint is received",
      });
    } else {
      res.status(200).json({
        code: 200,
        success: false,
        data: complaint,
        message: "Complaint is not found",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  getAllComplaints,
  getComplaintById,
  update,
  deleteComplaint,
  getComplaintByResidentId
};
