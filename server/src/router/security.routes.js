
const {Router} = require("express")
const router = Router();
const {create, login, passwordReset, getAllSecurities, getSecurityById, update, deleteSecurity} = require("../controller/security.controller")
const auth = require('../util/auth');

router.post("/create",  create);
router.post("/login", login);
router.post("/passwordReset", passwordReset);
router.get("/",  getAllSecurities);
router.get("/:securityId",  getSecurityById)
router.put("/:securityId",  update)
router.delete("/:securityId",  deleteSecurity)

module.exports.securityRouter = router;
