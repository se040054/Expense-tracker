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
  const select_category = req.query.select_category;
  let totalAmount;
  let records;
  let message;
  if (select_category){
    records = await Record.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("DATE", sequelize.col("date")), "date"],
        "amount",
        "categoryId",
      ],
      where: { userId: userId, categoryId: select_category },
      raw: true,
    }).catch((error)=>{
      console.log(error)
      return res.redirect('back')
    })
    totalAmount = await Record.sum("amount", { where: { userId , categoryId:select_category } });
  }else{
    records = await Record.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("DATE", sequelize.col("date")), "date"],
        "amount",
        "categoryId",
      ],
      where: { userId },
      raw: true,
    }).catch((error) => {
      console.log(error);
      return res.redirect("back");
    });
  totalAmount = await Record.sum("amount", { where: { userId } });
  }
   
  if (records.length===0){
    totalAmount=0
    message='這裡沒有項目 '
   return res.render("home", { totalAmount, message, select_category });
  }

  records.forEach((record) => {
    record.categoryIMG = CATEGORYIMG[record.categoryId];
  });
  console.log(select_category)
  return res.render("home", { records, totalAmount,select_category });
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
  const userId=req.user.id
  const record = await Record.findByPk(id, {
    attributes: [
      "id",
      "name",
      [sequelize.fn("DATE", sequelize.col("date")), "date"],
      "amount",
      "categoryId",
      "userId"
    ],
    raw: true,
  }).catch(()=>{
    return res.redirect('/')
  })
  if (!record){
    return res.redirect('/')
  }
  if (record.userId !== userId){
    return res.render('invalid')
  }
  return res.render('edit',{record,id})
})

router.put('/:id/edit',async(req,res)=>{
  const id=req.params.id
  const {name,date,categoryId,amount}=req.body
  const userId=req.user.id
  const record = await Record.findByPk(id);
  if (!record){
    res.redirect('/')
  }
  if (record.userId!==userId){
    res.render('invalid')
  }
  await record.update(
    { name, date, categoryId, amount, userId },
    { where: { id } }
  );
  return res.redirect('/index')

})

router.delete('/:id/delete',async(req,res)=>{
  const id=req.params.id
  const userId = req.user.id;
  const record = await Record.findByPk(id);
  if (!record) {
    res.redirect("/");
  }
  if (record.userId !== userId) {
    res.render("invalid");
  }
  await record.destroy({ where: { id } });
  return res.redirect('/index')
})


module.exports = router;

