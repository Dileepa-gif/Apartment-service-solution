
const {Router} = require("express")
const router = Router();
const {create, login, getAllAdmins, getAdminById, update, deleteAdmin} = require("../controller/admin.controller")
const auth = require('../util/auth');

router.post("/create", create);
router.post("/login", login);
router.get("/", auth.authMiddleware(["ADMIN"]), getAllAdmins);
router.get("/:adminId", auth.authMiddleware(["ADMIN"]), getAdminById)
router.put("/:adminId", auth.authMiddleware(["ADMIN"]), update)
router.delete("/:adminId", auth.authMiddleware(["ADMIN"]), deleteAdmin)

module.exports.adminRouter = router;
