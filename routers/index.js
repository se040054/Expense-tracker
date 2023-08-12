//index 做為首頁路由 ,路徑前綴index
const express = require("express");
const router = express.Router();
const db =require('../models')
const Expenses=db.Expenses
const sequelize = require("sequelize");

const CATEGORYIMG = {
  1: "fa-solid fa-house",
  2: "fa-solid fa-van-shuttle",
  3: "fa-solid fa-face-grin-beam",
  4: "fa-solid fa-utensils",
  5: "fa-solid fa-pen"
}

router.get('/',async (req,res)=>{
  let expenses = await Expenses.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.fn("DATE", sequelize.col("date")), "date"],
      "amount",
      "categoryId"
    ],
    raw: true,
  });
  expenses.forEach(expense => {
    expense.categoryIMG = CATEGORYIMG[expense.categoryId];
  });
  const totalAmount = await Expenses.sum('amount')
  return res.render('home',{expenses,totalAmount})
})


router.get('/create',(req,res)=>{
  return res.render('create')
})

router.post('/create',async(req,res)=>{
  const {name,date,categoryId,amount}=req.body
  console.log(name,date,categoryId,amount)
  await Expenses.create({name,date,categoryId,amount})
  return res.redirect('/index')
})


module.exports = router;