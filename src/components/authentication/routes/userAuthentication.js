const express = require('express');
const userController=require("../usersController");
const { register, login }=userController
const {regBodyValidate, logBodyValidate}=require("../middlewares/validbody");

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post("/signup",regBodyValidate,async (req,res)=>{
    let response=await register(req.userDTO);
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
})

router.post("/login",logBodyValidate,async (req,res)=>{
    let response=await login(req.userDTO);
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
});

module.exports=router;