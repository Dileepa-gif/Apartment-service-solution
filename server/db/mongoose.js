const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://kalanathathsara:Kalana99@cluster0.k9ihg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})







console.log(process.env.MONGODB_URL)

const connection= mongoose.connection;

connection.once("open",()=>{
    console.log("Mongodb connected...")
})