const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  User_id:Number,
  username: {
    type: String,
    required:true,
    unique: true
  },
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true,
    unique: true
  },
  password:{
      type:String,
      required:true,
  },
  views: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  verified:{
    type:Boolean,
    default:false
  },
  journals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journal"
    }
  ],
  avatar: {
    type: String
  },
  school: String,
  degree: String
},{timestamps: true});

UserSchema.plugin(AutoIncrement, { inc_field: 'User_id' });

let User = mongoose.model("User", UserSchema);

module.exports = User;
