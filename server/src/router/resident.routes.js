
const {Router} = require("express")
const router = Router();
const {create, login, getAllResidents, getResidentById, update, deleteResident} = require("../controller/resident.controller")
const auth = require('../util/auth');

router.post("/create", auth.authMiddleware(["ADMIN"]), create);
router.post("/login", login);
router.get("/", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), getAllResidents);
router.get("/:residentId", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), getResidentById)
router.put("/:residentId", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), update)
router.delete("/:residentId", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), deleteResident)

module.exports.residentRouter = router;
