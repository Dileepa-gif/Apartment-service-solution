const Resident = require("../models/resident");

const { residentPasswordSender } = require("../util/emailService");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

const create = async function (req, res) {
  try {
    const emailExist = await Resident.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(200)
        .json({
          code: 200,
          success: false,
          message: "Email already available",
        });
    var randomPassword = Math.random().toString(36).slice(-8);
    const resident = new Resident({
      email: req.body.email,
      password: randomPassword,
    });

    const savedResident = await resident.save();
    residentPasswordSender(savedResident, randomPassword);

    res.status(200).json({
      code: 200,
      success: true,
      data: savedResident,
      message: "Successfully created",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const login = async function (req, res) {
  try {
    const resident = await Resident.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!resident)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      resident.password
    );
    if (!validPassword)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Password" });
    const tokenObject = auth.issueJWT(resident, "RESIDENT");
    res.status(200).json({
      code: 200,
      success: true,
      tokenObject: tokenObject,
      message: "Logged in successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getAllResidents = function (req, res) {
  try {
    Resident.find(function (err, resident_list) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid Request!" });
      }

      return res
        .status(200)
        .json({ code: 200, success: true, data: resident_list });
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getResidentById = function (req, res) {
  try {
    Resident.findById(req.params.residentId, function (err, resident) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid ID!" });
      }
      if (resident) {
        res.status(200).json({
          code: 200,
          success: true,
          data: resident,
          message: "Profile is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: resident,
          message: "Profile is not found",
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const update = async function (req, res) {
  try {
    const oldResident = await Resident.findById(req.params.residentId);
    if (!oldResident)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid resident id" });

    const emailExist = await Resident.findOne({ email: req.body.email });
    if (emailExist && emailExist.id !== req.params.residentId)
      return res
        .status(200)
        .json({
          code: 200,
          success: false,
          message: "Email already available",
        });

    var updatedResident;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updatedResident = { ...req.body, password: password };
    } else {
      updatedResident = { ...req.body };
    }
    const resident = await Resident.findByIdAndUpdate(
      req.params.residentId,
      updatedResident,
      { new: true }
    );
    res.status(200).json({
      code: 200,
      success: true,
      data: resident,
      message: "Resident Updated Successfully!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const deleteResident = async function (req, res) {
  try {
    Resident.remove({ _id: req.params.residentId }, function (err, resident) {
      if (err) {
        res
          .status(200)
          .json({ code: 200, success: false, data: "Unable to delete!" });
      }

      res.status(200).json({
        code: 200,
        success: true,
        data: "Resident removed successfully!",
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  login,
  getAllResidents,
  getResidentById,
  update,
  deleteResident,
};
