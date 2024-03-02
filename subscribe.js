const mongoose=require('mongoose');
const subscriberSchema= new mongoose.Schema({
    name:String,
    email:String,
  })
module.exports=mongoose.model('subscribers',subscriberSchema);