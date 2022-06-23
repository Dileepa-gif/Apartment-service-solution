const Security = require("../models/security");
const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const { securityPasswordSender } = require("../util/emailService");
const bcrypt = require("bcrypt");
const auth = require("../util/auth");

const securityRegisterValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
  });
  return schema.validate(data);
};

const securityLoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().max(250).email(),
    password: Joi.string().required().min(6).max(25),
  });
  return schema.validate(data);
};

const securityUpdateValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().allow(null, "").min(2).max(250),
    address: Joi.string().allow(null, "").min(2).max(250),
    nic: Joi.string().allow(null, "").min(10).max(15),
    dob: Joi.string().allow(null, "").min(2).max(250),
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
    password: Joi.string().allow(null, "").min(6).max(15)
  });
  return schema.validate(data);
};

const create = async function (req, res) {
  try {
    const { error } = securityRegisterValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
    const emailExist = await Security.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Email already available" });
    
    var security_id = Math.random().toString(36).slice(-4).toUpperCase();
    var securityIdExist = await Security.find({ security_id: security_id });

    while(securityIdExist.length>0){
      security_id = Math.random().toString(36).slice(-4).toUpperCase();
      securityIdExist = await Security.find({ security_id: security_id });
    }

    var randomPassword = Math.random().toString(36).slice(-8);
    const security = new Security({
      email: req.body.email,
      security_id : security_id,
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
    const { error } = securityLoginValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });

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

      const { error } = securityUpdateValidation(req.body);
      if (error)
        return res.status(200).json({
          code: 200,
          success: false,
          message: error.details[0].message,
        });  

    var updatedSecurity;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      updatedSecurity = { ...req.body, security_id : oldSecurity.security_id, email : oldSecurity.email, password: password };
    } else {
      updatedSecurity = { ...req.body , security_id : oldSecurity.security_id, email : oldSecurity.email };
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
