const responseObject = require('../../utils/responseObject');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/users');
const config = require('../../config/configuration');


const register = async (userDTO) => {
  let user = await User.findOne({ email: userDTO.email }).exec();
  try {
    if (user) {
        let response = new responseObject(
          409,
          'email exists already',
          'error',
          null
        );
        // console.log(response)
        return response;
      } else {
        let hash = await bcrypt.hash(userDTO.password, 10);
        userDTO.password = hash;
            let user = new User(userDTO);
            await user.save();
            var token = jwt.sign({ email: userDTO.email }, config.jwtsecret);
           let response = new responseObject(
              201,
              'User created successfully',
              'success',
              { token }
            );
            return response;
      }    
  } catch (error) {
      console.log("error");
  }
  
};

const login=async (userDTO)=>{
  let user = await User.findOne({ email: userDTO.email }).exec();
  try {
    if(user){
      if(await bcrypt.compare(userDTO.password,user.password)){
        let token = jwt.sign({ email: userDTO.email }, config.jwtsecret);
        let response = new responseObject(
           200,
           'User logged in successfully',
           'success',
           { token }
         );
         return response;
      }else{
        let response = new responseObject(
          403,
          'Invalid email/password',
          'error',
          null
        );
        return response;
      }
    }else{
      let response = new responseObject(
        404,
        'User does not exist',
        'error',
        null
      );
      return response;
    }
  } catch (error) {
    console.log("error");
  }
}


module.exports.register = register;
module.exports.login = login;
