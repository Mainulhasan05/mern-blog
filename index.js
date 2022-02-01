const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const PORT=process.env.PORT||5000;
const cors=require("cors")
const mongoose=require("mongoose");
const auth=require("./Routes/Auth/Login")
const postRoute=require("./Routes/Posts/Posts")
const path=require("path")
app.use(express.json());
app.use(cors())
app.use("/auth",auth)
app.use("/post",postRoute)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("Database Connected");
})

app.listen(PORT,()=>{
    console.log("Server is listening on port "+PORT);
})




