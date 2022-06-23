
const {Router} = require("express")
const router = Router();
const {create, login, passwordReset, getAllAdmins, getAdminById, update, deleteAdmin} = require("../controller/admin.controller")
const auth = require('../util/auth');

router.post("/create", create);
router.post("/login", login);
router.post("/passwordReset", passwordReset);
router.get("/", getAllAdmins);
router.get("/:adminId",  getAdminById)
router.put("/:adminId",  update)
router.delete("/:adminId", deleteAdmin)

module.exports.adminRouter = router;
