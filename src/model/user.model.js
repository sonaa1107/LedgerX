const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email"]
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minLength:[6,'password must be at least 6 characters'],
        select:false //bydefatlt password field will not be returned in query results
    }
},{timestamps:true});

userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return 
    }else {
        const hashpassword= await bcrypt.hash(this.password,10);
        this.password=hashpassword;

        return 
    }
})
userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;