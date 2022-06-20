const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

const securitySchema = new Schema({
  name: {
    type: String,
    default: 'Security'
  },
  security_id: {
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  nic: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  phone_number: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});


securitySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



const Security = mongoose.model("security", securitySchema);

module.exports = Security;
