const router=require("express").Router();
const User=require('../models/user.js');
const List=require('../models/list.js');
//create
router.post('/addTodo',async(req,res)=>{
    try{
    const {title,description,id}=req.body;
    //check kar rahe h ki is email se ye user exist bhi karta h if nahi karta then ham allow hi nahi krenge update karne ke liye add todo User database h already signed in and ye jo upar h ye body se request kiya h
    const existingUser=await User.findById(id);
    if(existingUser){
        const list=new List({title,description,user:existingUser})
        await list.save().then(()=>res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
    }
    }catch(error){
      console.log(error);
    }
})
//update
router.put('/updateTodo/:id',async(req,res)=>{
    try{
        const { title, description } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, description });
        list.save().then(() => res.status(200).json({ message: "Task updated !" }));
    
    }catch(error){
      console.log(error);
    }
})
//delete
router.delete('/deleteTodo/:id',async(req,res)=>{
    try{
    const {id}=req.body;
    //check kar rahe h ki is email se ye user exist bhi karta h if nahi karta then ham allow hi nahi krenge update karne ke liye add todo User database h already signed in and ye jo upar h ye body se request kiya h
    const existingUser = await User.findByIdAndUpdate(id, {
        $pull: { list: req.params.id },
      });
    //{$pull:{list:req.params.id}}  ye karne se wo list m se to object id delet hogi hi hogi but vo jo users m list array h waha se bhi ho jayegi otherwise if ye nahi karenge to user array ke list m se delete nahi hogi object id bas list se hogi
    if (existingUser) {
        await List.findByIdAndDelete(req.params.id).then(() =>
          res.status(200).json({ message: "Task Deleted" })
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
//getTodo
router.get('/getTodo/:id',async(req,res)=>{
    //jitne bhi users available h is task m vo task hame batayega
    //id user ki aayegi
    try {
 const list=await List.find({user:req.params.id}).sort({createdAt:-1})//ye jo latest added task h usko 1 st pe le aayega -1 matalb ulta chalega
 if (list.length !== 0) {
    res.status(200).json({ list });
} else{
    //if list is empty then show this 
    res.status(200).json({ message: "No tasks associated" });
 }
}catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
}
})

module.exports=router;
