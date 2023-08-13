const express = require("express");
const router = express.Router();
const db = require("../models");
const User=db.User
const passport = require("passport");

const LocalStrategy = require("passport-local");
const { Model } = require("sequelize");


router.get('/register',(req,res)=>{
  return res.render('register')
})

router.post('/register',async (req,res)=>{
  const { name, username, password, confirm_password } = req.body;
  if ( (!name || !username || !password || !confirm_password) || (password!==confirm_password) ){
    
    return res.render('register_fail')
  }
  await User.create({name,username,password})
  return res.redirect('login')
})



router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',(req,res)=>{
  const {username, password } = req.body
  console.log(username,password)
  
})

module.exports = router