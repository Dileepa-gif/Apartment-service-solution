
const {Router} = require("express")
const router = Router();
const {
    create,
    getAllServices,
    getServicesById,
    getCookingServicesByResidentId,
    getWashingServicesByResidentId,
    getCleaningServicesByResidentId,
    deleteService,
    confirm
        } = require("../controller/service.controller")
const auth = require('../util/auth');

router.post("/create",auth.authMiddleware(["RESIDENT"]), create);
router.get("/", getAllServices);
router.get("/getServicesById/:serviceId", getServicesById);
router.get("/getCookingServicesByResidentId", auth.authMiddleware(["RESIDENT"]), getCookingServicesByResidentId);
router.get("/getWashingServicesByResidentId", auth.authMiddleware(["RESIDENT"]), getWashingServicesByResidentId);
router.get("/getCleaningServicesByResidentId", auth.authMiddleware(["RESIDENT"]), getCleaningServicesByResidentId);
router.delete("/:serviceId", deleteService);
router.get("/confirm/:servicesId", confirm);

module.exports.serviceRouter = router;
