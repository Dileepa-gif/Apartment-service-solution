const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: 'Admin'
  },
  email: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});



adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
