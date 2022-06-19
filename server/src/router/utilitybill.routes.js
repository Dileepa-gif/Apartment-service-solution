const {Router} = require("express")
const router = Router();
const {
    createutilitybill,
    getAllUtilityBill,
    getUtilityBill,
    updateUtilityBill,
    deleteUtilityBill
    } = require("../controller/utilitybill.controller")

router.post("/addUtilityBill",createutilitybill)
router.get("/",getAllUtilityBill)
router.get("/:UtilitybillId",getUtilityBill)
router.patch("/:UtilitybillId",updateUtilityBill)
router.delete("/:UtilitybillId",deleteUtilityBill)

module.exports.utilityBillRouter = router;
