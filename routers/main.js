//main 做為總路由 控管其他路由 不做資料處理,所有子路由必須使用路徑前綴
const express = require("express");
const router = express.Router();
const index = require('./index')
const user = require('./user');
const authHandler = require("../middleware/auth-handler");


router.use("/index", authHandler, index);
router.use('/users',user)
router.get('/',(req,res)=>{
  return res.redirect('/index')
})



module.exports = router;