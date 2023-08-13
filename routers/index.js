//index 做為首頁路由 ,路徑前綴index
const express = require("express");
const router = express.Router();
const db =require('../models')
const Record = db.Record;
const sequelize = require("sequelize");

const CATEGORYIMG = {
  1: "fa-solid fa-house",
  2: "fa-solid fa-van-shuttle",
  3: "fa-solid fa-face-grin-beam",
  4: "fa-solid fa-utensils",
  5: "fa-solid fa-pen"
}

router.get('/',async (req,res)=>{
  const userId=req.user.id
  console.log(userId)
  let records = await Record.findAll({
    attributes: [
      "id",
      "name",
      [sequelize.fn("DATE", sequelize.col("date")), "date"],
      "amount",
      "categoryId",
    ],
    raw: true,
  });
  records.forEach((record) => {
    record.categoryIMG = CATEGORYIMG[record.categoryId];
  });
  const totalAmount = await Record.sum("amount");
  return res.render("home", { records, totalAmount });
})


router.get('/create',(req,res)=>{
  return res.render('create')
})

router.post('/create',async(req,res)=>{
  const {name,date,categoryId,amount}=req.body
  const userId=req.user.id
  console.log(name,date,categoryId,amount)
  await Record.create({ name, date, categoryId, amount, userId });
  return res.redirect('/index')
})

router.get('/:id/edit', async (req,res)=>{
  const id=req.params.id
  const record = await Record.findByPk(id, {
    attributes: [
      "id",
      "name",
      [sequelize.fn("DATE", sequelize.col("date")), "date"],
      "amount",
      "categoryId",
    ],
    raw: true,
  });
  return res.render('edit',{record,id})
})

router.put('/:id/edit',async(req,res)=>{
  const id=req.params.id
  const {name,date,categoryId,amount}=req.body
  await Record.update({ name, date, categoryId, amount }, { where: { id } });
  return res.redirect('/index')

})

router.delete('/:id/delete',async(req,res)=>{
  const id=req.params.id
  await Record.destroy({where:{id}})
  return res.redirect('/index')
})


module.exports = router;

