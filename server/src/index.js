require("dotenv").config()

const app =require("./app")

const port = process.env.PORT;


app.listen(4000,()=>{
    console.log("Server is up on port 6000")
    
})