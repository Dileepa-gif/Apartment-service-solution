const {Router} = require("express")
const router = Router();
const {
    createServiceember,
    getAllServiceMembers,
    getServiceMember,
    updateServiceMember,
    deleteServiceMember
    } = require("../controller/servicemeber.controller")

router.post("/addServicemember",createServiceember)
router.get("/",getAllServiceMembers)
router.get("/:servicememberId",getServiceMember)
router.patch("/:servicememberId",updateServiceMember)
router.delete("/:servicememberId",deleteServiceMember)

module.exports.serviceMemberRouter = router;
