const {Router} = require("express")
const router = Router();
const {
    createServiceember,
    getAllServiceMembers,
    getServiceMember,
    updateServiceMember,
    deleteServiceMember,
    getMembersForCooking,
    getMembersForWashing,
    getMembersForCleaning
    } = require("../controller/servicemeber.controller")

router.post("/addServicemember",createServiceember)
router.get("/",getAllServiceMembers)
router.get("/getServiceMember/:servicememberId",getServiceMember)
router.patch("/:servicememberId",updateServiceMember)
router.delete("/:servicememberId",deleteServiceMember)
router.get("/getMembersForCooking",getMembersForCooking)
router.get("/getMembersForWashing",getMembersForWashing)
router.get("/getMembersForCleaning",getMembersForCleaning)

module.exports.serviceMemberRouter = router;
