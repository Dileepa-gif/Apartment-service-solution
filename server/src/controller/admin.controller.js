const Admin = require("../models/admin");

const { adminPasswordSender } = require("../util/emailService");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

const create = async function (req, res) {
  try {
    const emailExist = await Admin.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(200)
        .json({
          code: 200,
          success: false,
          message: "Email already available",
        });
    var randomPassword = Math.random().toString(36).slice(-8);
    const admin = new Admin({
      email: req.body.email,
      password: randomPassword
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

    var updatedAdmin;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updatedAdmin = { ...req.body, email : oldAdmin.email, password: password };
    } else {
      updatedAdmin = { ...req.body, email : oldAdmin.email };
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
    Admin.remove({ _id: req.params.adminId }, function (err, admin) {
      if (err) {
        res
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
};
