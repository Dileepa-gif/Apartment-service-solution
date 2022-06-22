const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const complaintSchema = new Schema({
  resident_object_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: false,
    default: "Pending",
  },
  Reply: {
    type: String,
    required: false,
  },
});

const Complaint = mongoose.model("complaint", complaintSchema);

module.exports = Complaint;
