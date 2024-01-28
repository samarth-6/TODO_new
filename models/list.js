const mongoose=require('mongoose');
const listSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        reuired:true,
    },
    user:[{
        type:mongoose.Types.ObjectId,
        ref:"User",

    }],
    
},
{timestamps:true}
);
module.exports=mongoose.model("List",listSchema)