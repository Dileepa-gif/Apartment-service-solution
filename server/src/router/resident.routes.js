
const {Router} = require("express")
const router = Router();
const {create, login, passwordReset, getAllResidents, getResidentById, update, deleteResident} = require("../controller/resident.controller")
const auth = require('../util/auth');

router.post("/create", create);
router.post("/login", login);
router.post("/passwordReset", passwordReset);
router.get("/",  getAllResidents);
router.get("/:residentId",  getResidentById)
router.put("/:residentId",  update)
router.delete("/:residentId",  deleteResident)

module.exports.residentRouter = router;
