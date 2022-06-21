const Security = require("../models/security");

const { securityPasswordSender } = require("../util/emailService");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

const create = async function (req, res) {
  try {
    const emailExist = await Security.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Email already available" });
    var randomPassword = Math.random().toString(36).slice(-8);
    const security = new Security({
      email: req.body.email,
      password: randomPassword,
    });

    const savedSecurity = await security.save();
    securityPasswordSender(savedSecurity, randomPassword);

    res.status(200).json({
      code: 200,
      success: true,
      data: savedSecurity,
      message: "Successfully created",
    });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const login = async function (req, res) {
  try {
    const security = await Security.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!security)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      security.password
    );
    if (!validPassword)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Password" });
    const tokenObject = auth.issueJWT(security, "SECURITY");
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

const getAllSecurities = function (req, res) {
  try {
    Security.find(function (err, security_list) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid Request!" });
      }

      return res.status(200).json({ code: 200, success: true, data: security_list });
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const getSecurityById = function (req, res) {
  try {
    Security.findById(req.params.securityId, function (err, security) {
      if (err) {
        return res
          .status(200)
          .json({ code: 200, success: false, message: "Invalid ID!" });
      }
      if (security) {
        res.status(200).json({
          code: 200,
          success: true,
          data: security,
          message: "Profile is received",
        });
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          data: security,
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
    const oldSecurity = await Security.findById(req.params.securityId);
    if (!oldSecurity)
    return res
      .status(200)
      .json({ code: 200, success: false, message: "Invalid security id" });

    const emailExist = await Security.findOne({ email: req.body.email });
    if (emailExist && emailExist.id !== req.params.securityId)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Email already available" });

    var updatedSecurity;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updatedSecurity = { ...req.body, password: password };
    } else {
      updatedSecurity = { ...req.body };
    }

    const security = await Security.findByIdAndUpdate(
      req.params.securityId,
      updatedSecurity,
      { new: true }
    );
    res.status(200).json({
      code: 200,
      success: true,
      data: security,
      message: "Security Updated Successfully!",
    });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

const deleteSecurity = async function (req, res) {
  try {
    Security.remove({ _id: req.params.securityId }, function (err, security) {
      if (err) {
        res
          .status(200)
          .json({ code: 200, success: false, data: "Unable to delete!" });
      }

      res.status(200).json({
        code: 200,
        success: true,
        data: "Security removed successfully!",
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
  getAllSecurities,
  getSecurityById,
  update,
  deleteSecurity
};
