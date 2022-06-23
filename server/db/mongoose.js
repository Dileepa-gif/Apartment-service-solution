const mongoose = require("mongoose")

// mongoose.connect("mongodb+srv://kalanathathsara:Kalana99@cluster0.k9ihg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })


mongoose.connect("mongodb+srv://dddd:dddd1234@merncrud.0nitc.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})




console.log(process.env.MONGODB_URL)

const connection= mongoose.connection;

connection.once("open",()=>{
    console.log("Mongodb connected...")
})