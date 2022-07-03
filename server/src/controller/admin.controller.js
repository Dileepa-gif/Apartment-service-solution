const Admin = require("../models/admin");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const { adminPasswordSender, adminForgotPasswordSender } = require("../util/emailService");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

const adminRegisterValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
  });
  return schema.validate(data);
};

const adminLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
    password: Joi.string().required().min(6).max(25),
  });
  return schema.validate(data);
};

const adminUpdateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().allow(null, "").min(2).max(250),
    mobile_number: Joi.string()
      .allow(null, "")
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected",
      }),
    address: Joi.string().allow(null, "").min(2).max(250),
    password: Joi.string().allow(null, "").min(6).max(15)
  });
  return schema.validate(data);
};


const create = async function (req, res) {
  try {
    const { error } = adminRegisterValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Email already available",
      });
    var randomPassword = Math.random().toString(36).slice(-8);
    const admin = new Admin({
      email: req.body.email,
      password: randomPassword,
    });

    const savedAdmin = await admin.save();
    adminPasswordSender(savedAdmin, randomPassword);
    const tokenObject = auth.issueJWT(savedAdmin, "ADMIN");
    res.status(200).json({
      code: 200,
      success: true,
      tokenObject: tokenObject,
      data: savedAdmin,
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
    const { error } = adminLoginValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    const admin = await Admin.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!admin)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Password" });
    const tokenObject = auth.issueJWT(admin, "ADMIN");
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
    const { error } = adminRegisterValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    const admin = await Admin.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!admin)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Email" });

    var randomPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(randomPassword, salt);
    var updatedAdmin = { password: password };

    const _updatedAdmin = await Admin.findByIdAndUpdate(
      admin.id,
      updatedAdmin,
      { new: true }
    );

    await adminForgotPasswordSender(_updatedAdmin, randomPassword);
    res.status(200).json({
      code: 200,
      success: true,
      data: _updatedAdmin,
      message: "Please check your email!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};



const getAllAdmins = function (req, res) {
  try {
    Admin.find(function (err, admin_list) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid Request!" });
      }

      return res
        .status(200)
        .json({ code: 200, success: true, data: admin_list });
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getAdminById = function (req, res) {
  try {
    Admin.findById(req.params.adminId, function (err, admin) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid ID!" });
      }
      if (admin) {
        res.status(200).json({
          code: 200,
          success: true,
          data: admin,
          message: "Profile is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: admin,
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
    const oldAdmin = await Admin.findById(req.params.adminId);
    if (!oldAdmin)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid admin id" });

    const { error } = adminUpdateValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });    
    var updatedAdmin;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updatedAdmin = { ...req.body, email: oldAdmin.email, password: password };
    } else {
      updatedAdmin = { ...req.body, email: oldAdmin.email };
    }

    const admin = await Admin.findByIdAndUpdate(
      req.params.adminId,
      updatedAdmin,
      { new: true }
    );
    res.status(200).json({
      code: 200,
      success: true,
      data: admin,
      message: "Admin Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const deleteAdmin = async function (req, res) {
  try {
    Admin.deleteOne({ _id: req.params.adminId }, function (err, admin) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, data: "Unable to delete!" });
      }

      res.status(200).json({
        code: 200,
        success: true,
        data: "Admin removed successfully!",
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
  getAllAdmins,
  getAdminById,
  update,
  deleteAdmin,
  passwordReset
};
