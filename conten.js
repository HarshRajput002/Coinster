const mongoose=require('mongoose');
const contenSchema = new mongoose.Schema({
    contentype: String,
    contenname:String,
    imge: String,
    video: String
  });
  module.exports = mongoose.model('contens', contenSchema);