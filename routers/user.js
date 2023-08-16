const express = require("express");
const router = express.Router();
const db = require("../models");
const User=db.User
const passport = require("passport");

const { Model } = require("sequelize");

router.get('/register',(req,res)=>{
  return res.render('register')
})

router.post('/register',async (req,res)=>{
  const { name, username, password, confirm_password } = req.body;
  if (!name || !username || !password || !confirm_password){
    const message="有欄位沒填寫"
    return res.render('register_fail',{message})
  }if (password !== confirm_password){
    const message = "密碼不一致";
    return res.render("register_fail", { message });
  }
  const user = await User.findOne({ where: { username } }).catch((error) => {
    console.log(error);
    return res.redirect("back");
  });
  if (user){
    const message = "帳號已被使用";
    return res.render("register_fail", { message });
  }
  await User.create({ name, username, password });
  const message="註冊成功"
  return res.render('login',{message})
})

router.get('/login',(req,res)=>{
  const message = req.query.message
  return res.render('login',{message})
})
router.get('/login_fail',(req,res)=>{
  const message = req.query.message;
  return res.render("login_fail", { message });
})
router.post('/login',(req,res,next)=>{
  const {username, password } = req.body
  console.log(username, password);
  if (!password || !username){
    const message="帳號密碼不能為空"
    return res.render('login_fail',{message})
  }
  passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/users/login_fail?message=帳號或密碼錯誤",
  })(req,res,next)
})

router.post('/logout',(req,res,next)=>{
  req.logout((err)=>{
    if (err) { return next(err); }
    return res.redirect('/users/login');
  });
})

module.exports = router