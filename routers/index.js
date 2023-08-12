//index 做為首頁路由 ,路徑前綴index
const express = require("express");
const router = express.Router();
const db =require('../models')
const Expenses=db.Expenses
const sequelize = require("sequelize");
router.get('/',async (req,res)=>{
  const expenses = await Expenses.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.fn("DATE", sequelize.col("date")), "date"],
      "amount",
    ],
    raw: true,
  });
  const totalAmount = await Expenses.sum('amount')
  res.render('home'  ,{expenses,totalAmount})
})



module.exports = router;