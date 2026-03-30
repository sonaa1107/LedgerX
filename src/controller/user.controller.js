const userModel=require('../model/user.model');
const jwt=require('jsonwebtoken');

async function userRegistration(req,res){
    const {name,email,password}=req.body;
    const isExist=await userModel.findOne({email});
    if(isExist){
        return res.status(422).json({mssg:'Already registered email'})
    }
    const user= await userModel.create({
        name:name,
        email:email,
        password:password
    })
    const token=jwt.sign({id:user._id,email:email},process.env.JWT_SECRET,{expiresIn:"3d"});
    res.cookie('token',token);
    res.status(201).json({
        id:user._id,
        name:user.name
    })
}
async function userLogin(req,res){
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({mssg:"Invalid Email or Password"})
    }
    const isValid=user.comparePassword(password);
    if(!isValid){
        return res.status(401).json({mssg:"Invalid Email or Password"})
    }
    const token=jwt.sign({id:user._id,email:email},process.env.JWT_SECRET,{expiresIn:"3d"});
    res.cookie('token',token);
    res.status(200).json({
        id:user._id,
        name:user.name
    })
    
}

module.exports={userRegistration,userLogin}