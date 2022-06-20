const express = require("express");
require("../db/mongoose")
const cors = require("cors")

const {appointmentRouter} = require("./router/appointment.routes")
const {serviceMemberRouter}=require("./router/servicemember.routes")
const { utilityBillRouter } = require("./router/utilitybill.routes");
const { adminRouter } = require("./router/admin.routes");
const { residentRouter } = require("./router/resident.routes");
const { securityRouter } = require("./router/security.routes");
const { complaintRouter } = require("./router/complaint.routes");

const app = express();
app.use(cors({origin:"*"}))
const bodyParser = require("body-parser");





app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({
    extended:true,
    limit:"50mb"
}))

app.use(express.json())

app.use("/appointment",appointmentRouter)
app.use("/servicemember",serviceMemberRouter)
app.use("/utilityBill",utilityBillRouter)
app.use("/admin",adminRouter)
app.use("/resident",residentRouter)
app.use("/security",securityRouter)
app.use("/complaint",complaintRouter)

module.exports = app;

