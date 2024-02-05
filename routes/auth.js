const router=require('express').Router();
const User=require('../models/user.js');
const bcrypt = require('bcryptjs');
//Sign UP

router.post('/register',async(req,res)=>{
    try{
        const {email,username,password}=req.body; 
        const saltRounds = 10;//timepass. The saltRounds parameter is necessary for bcrypt to generate a salt for hashing
        const hashpassword=bcrypt.hashSync(password,saltRounds);
        const user=new User({email,username,password:hashpassword});
       
        await user.save().then(()=>
            res.status(200).json({message:"SignUp Successfull"}))
    }catch(error){
        res.status(200).json({message:"User Already exists"});
    }
})
//Sign In
router.post('/signin',async(req,res)=>{
    try{
        //check is user is already there or not if not then print that console message
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
           return res.status(203).json({ message: "Please Sign Up first" });
          // Add return to stop execution if user is not found
        }
      //compares pass of what that user is typing and that of the password associated with req.body.email
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordCorrect) {
          return res.status(204).json({ message: "Password is incorrect" });
           // Add return to stop execution if password is incorrect
      }
      //password ke alawa username and email show karayega users ke doc se ...others matlab passowrd ke alawa
      const { password, ...others } = user._doc;
        res.status(200).json({ user:others });
    }catch(error){
        console.error("Error in /signin:", error);
        res.status(500).json({message:"Internal Server Error"});
    }
})


module.exports=router;
