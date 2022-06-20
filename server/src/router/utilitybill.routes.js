const {Router} = require("express")
const router = Router();
const auth = require('../util/auth');
const { create, getAllUtilityBills, getUtilityBill, update, deleteUtilityBill, getUtilityBillsByResidentId, getPreviousBill} = require("../controller/utilitybill.controller")

router.post("/create",create);
router.get("/",getAllUtilityBills);
router.get("/getUtilityBill/:utilityBillId",getUtilityBill);
router.patch("/:UtilitybillId",update);
router.delete("/:UtilitybillId",deleteUtilityBill);
router.get("/getUtilityBillsByResidentId", auth.authMiddleware(["RESIDENT"]), getUtilityBillsByResidentId);
router.post("/getPreviousBill", getPreviousBill);

module.exports.utilityBillRouter = router;
