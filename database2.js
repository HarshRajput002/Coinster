const mongoose=require('mongoose');
const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  module.exports = mongoose.model('clients', clientSchema);