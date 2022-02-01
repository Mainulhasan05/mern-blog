const router=require("express").Router();
const User=require("../../userSchema")
const bcrypt=require("bcrypt");
router.post("/login",async(req,res)=>{
    const findUser=await User.findOne({email:req.body.email});
    if(findUser){
        const matchPass=await bcrypt.compare(req.body.password,findUser.password);
        if(matchPass){
            res.status(200).json(findUser);
        }
        else{
            res.status(500).json({"msg":"Invalid Login"})
        }
        
    }
    else{
        res.status(500).json({"msg":"Invalid Login"})
    }
})

router.post("/register",async(req,res)=>{
    const duplicate=await User.findOne({email:req.body.email});
    if(!duplicate){
        req.body.password=await bcrypt.hash(req.body.password,10);
        const newUser=new User(req.body);

        const savedUser=await newUser.save();
        res.status(200).json({"msg":"User added successfully"})
    }
    else{
        res.status(500).json({"msg":"Email is already in use"})
    }
})

module.exports=router;