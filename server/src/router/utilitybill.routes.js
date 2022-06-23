const {Router} = require("express")
const router = Router();
const auth = require('../util/auth');
const { create, getAllUtilityBills, getUtilityBill, update, deleteUtilityBill, getUtilityBillsByResidentId, getPreviousBill, viewBill, addPaidAmount} = require("../controller/utilitybill.controller")

router.post("/create", create);
router.get("/",getAllUtilityBills);
router.get("/getUtilityBill/:utilityBillId",getUtilityBill);
router.put("/:utilityBillId",update);
router.delete("/:utilityBillId",deleteUtilityBill);
router.get("/getUtilityBillsByResidentId", auth.authMiddleware(["RESIDENT"]), getUtilityBillsByResidentId);
router.post("/getPreviousBill", auth.authMiddleware(["RESIDENT"]), getPreviousBill);
router.post("/viewBill", viewBill);
router.post("/addPaidAmount", addPaidAmount);

module.exports.utilityBillRouter = router;
