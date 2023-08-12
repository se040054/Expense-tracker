//index 做為首頁路由 ,路徑前綴index
const express = require("express");
const router = express.Router();


router.get('/',(req,res)=>{
  res.render('home')
})



module.exports = router;