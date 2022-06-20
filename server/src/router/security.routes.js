
const {Router} = require("express")
const router = Router();
const {create, login, getAllSecurities, getSecurityById, update, deleteSecurity} = require("../controller/security.controller")
const auth = require('../util/auth');

router.post("/create", auth.authMiddleware(["ADMIN"]), create);
router.post("/login", login);
router.get("/", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), getAllSecurities);
router.get("/:securityId", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), getSecurityById)
router.put("/:securityId", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), update)
router.delete("/:securityId", auth.authMiddleware(["ADMIN", "RESIDENT", "SECURITY"]), deleteSecurity)

module.exports.securityRouter = router;
