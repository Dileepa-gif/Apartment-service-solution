const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const complaintSchema = new Schema({
  resident_object_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  service_category: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time_slot: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "Pending",
  },
});

const Service = mongoose.model("service", complaintSchema);

module.exports = Service;
