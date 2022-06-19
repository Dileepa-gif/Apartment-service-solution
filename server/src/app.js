const express = require("express");
require("../db/mongoose")
const cors = require("cors")

const {appointmentRouter} = require("./router/appointment.routes")
const {serviceMemberRouter}=require("./router/servicemember.routes")
const { utilityBillRouter } = require("./router/utilitybill.routes");

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
app.use("/utilitybill",utilityBillRouter)

module.exports = app;

