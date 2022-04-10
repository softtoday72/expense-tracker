const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//新增的頁面(空白的)
router.get('/', (req, res) => {
  Category.find({})
    .lean()
    .then(catagories => {
      return res.render('create', { catagories })
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
})

//送出的按鈕
router.post('/', (req, res) => {
  const userId = req.user._id
  const name = req.body.name
  const date = req.body.date
  const categoryId = req.body.categoryId
  const amount = req.body.amount
  
 
  return Record.create({
    name, date, categoryId, amount, userId
    })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

module.exports = router