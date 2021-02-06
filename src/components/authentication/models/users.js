const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  },
  password:{
      type:String
  },
  verified:{
    type:Boolean,
    default:false
  }
},{timestamps: true});

let User = mongoose.model("User", UserSchema);

module.exports = User;
