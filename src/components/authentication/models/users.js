const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  User_id:Number,
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
  },
  journals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Journal"
    }
  ]
},{timestamps: true});

UserSchema.plugin(AutoIncrement, { inc_field: 'User_id' });

let User = mongoose.model("User", UserSchema);

module.exports = User;
