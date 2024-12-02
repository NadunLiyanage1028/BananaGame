
//define the schema for users account creation User model can be used
const mongoose = require('mongoose')

 const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
 })

 const User = mongoose.model("User", userSchema)
 
 module.exports = User
