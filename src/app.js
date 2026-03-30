const express =require('express');
const cookieparser=require('cookie-parser')

const userRouter=require('./routes/user.routes');



const app= express();

app.use(express.json());
app.use(cookieparser())
app.use('/api/auth/user',userRouter);



module.exports=app;