const {Router} = require("express")
const router = Router();
const {
    createAppointment,
    getAllAppointment,
    getAppointment,
    updateAppointment,
    deleteAppointment} = require("../controller/residentappoinment.controller")

router.post("/addAppointment",createAppointment)
router.get("/",getAllAppointment)
router.get("/:appointmentId",getAppointment)
router.patch("/:appointmentId",updateAppointment)
router.delete("/:appointmentId",deleteAppointment)

module.exports.residentappointmentRouter = router;
