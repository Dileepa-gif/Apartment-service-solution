const Resident = require("../models/resident");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const { residentPasswordSender, residentForgotPasswordSender } = require("../util/emailService");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

const residentRegisterValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
  });
  return schema.validate(data);
};

const residentLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
    password: Joi.string().required().min(6).max(25),
  });
  return schema.validate(data);
};

const residentUpdateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().allow(null, "").min(2).max(250),
    block_number: Joi.string().allow(null, "").min(2).max(250),
    house_number: Joi.string().allow(null, "").min(2).max(250),
    phone_number: Joi.string()
      .allow(null, "")
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    nic: Joi.string().allow(null, "").min(2).max(250),
    gender: Joi.string().allow(null, "").min(2).max(250),
    dob: Joi.string().allow(null, "").min(2).max(250),
    occupation: Joi.string().allow(null, "").min(2).max(250),
    password: Joi.string().allow(null, "").min(6).max(15)
  });
  return schema.validate(data);
};

const getResidentByResidentIdValidation = (data) => {
  const schema = Joi.object({
    resident_id: Joi.string().required().max(250),
  });
  return schema.validate(data);
};

const create = async function (req, res) {
  try {
    const { error } = residentRegisterValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    const emailExist = await Resident.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(200)
        .json({
          code: 200,
          success: false,
          message: "Email already available",
        });

    var resident_id = Math.random().toString(36).slice(-4).toUpperCase();
    var residentIdExist = await Resident.find({ resident_id: resident_id });

    while(residentIdExist.length>0){
      resident_id = Math.random().toString(36).slice(-4).toUpperCase();
      residentIdExist = await Resident.find({ resident_id: resident_id });
    }

    var randomPassword = Math.random().toString(36).slice(-8);

    const resident = new Resident({
      email: req.body.email,
      resident_id : resident_id,
      password: randomPassword
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
    const { error } = residentLoginValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
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


const passwordReset = async function (req, res) {
  try {
    const { error } = residentRegisterValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    const resident = await Resident.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!resident)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Email" });

    var randomPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(randomPassword, salt);
    var updatedResident = { password: password };

    const _updatedResident = await Resident.findByIdAndUpdate(
      resident.id,
      updatedResident,
      { new: true }
    );

    await residentForgotPasswordSender(_updatedResident, randomPassword);
    res.status(200).json({
      code: 200,
      success: true,
      data: _updatedResident,
      message: "Please check your email!",
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


const getResidentByResidentId = function (req, res) {
  try {
    const { error } = getResidentByResidentIdValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });

    Resident.findOne({resident_id : req.body.resident_id}, function (err, resident) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid resident id!" });
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

    const { error } = residentUpdateValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });  

    var updatedResident;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updatedResident = { ...req.body, resident_id : oldResident.resident_id, email : oldResident.email, password: password };
    } else {
      updatedResident = { ...req.body, resident_id : oldResident.resident_id, email : oldResident.email };
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
    Resident.deleteOne({ _id: req.params.residentId }, function (err, resident) {
      if (err) {
        return res
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
  passwordReset,
  getResidentByResidentId
};
