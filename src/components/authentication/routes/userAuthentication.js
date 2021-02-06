const express = require('express');
const userController=require("../usersController");
const register=userController.register;
const login=userController.login;
const bodyvalidate=require("../middlewares/validbody");
const regBodyValidate=bodyvalidate.regBodyValidate;
const logBodyValidate=bodyvalidate.logBodyValidate;

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