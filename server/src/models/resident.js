const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

const residentSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: 'Resident'
  },
  resident_id: {
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: true,
  },
  block_number: {
    type: String,
    required: false,
  },
  house_number: {
    type: String,
    required: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  nic: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});


residentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const Resident = mongoose.model("resident", residentSchema);

module.exports = Resident;
