
const {Router} = require("express")
const router = Router();
const {create, getAllComplaints, getComplaintById, update, deleteComplaint, getComplaintByResidentId} = require("../controller/complaint.controller")
const auth = require('../util/auth');

router.post("/create",auth.authMiddleware(["RESIDENT"]), create);
router.get("/", getAllComplaints);
router.get("/getComplaintById/:complaintId", getComplaintById);
router.get("/getComplaintByResidentId", auth.authMiddleware(["RESIDENT"]), getComplaintByResidentId);
router.put("/:complaintId", update)
router.delete("/:complaintId", deleteComplaint)

module.exports.complaintRouter = router;
