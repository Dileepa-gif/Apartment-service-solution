const mongoose = require("mongoose")

mongoose.connect("",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})







console.log(process.env.MONGODB_URL)

const connection= mongoose.connection;

connection.once("open",()=>{
    console.log("Mongodb connected...")
})
