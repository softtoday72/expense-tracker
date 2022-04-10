const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//實際地址是 localhost3000/edit/:id
router.get('/:id', (req,res) => {
  const userId = req.user._id
  const _id = req.params.id
  Category.find({})
    .lean()
    .then(catagories => {
      Record.findOne({ _id, userId })
        .populate('categoryId')
        .lean()
        .then(record => {
          const categoryId = record.categoryId.name
          //moment.utc('2019-11-03T05:00:00.000Z').format('MM/DD/YYYY')
          //or
          //moment('2019-11-03T05:00:00.000Z').utc().format('MM/DD/YYYY')
          return res.render('edit', { catagories, record, categoryId })
        })
      
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

  
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  
  Record.findOne({ _id, userId })
    .populate('categoryId')
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.categoryId = categoryId
      return record.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
  
})


router.delete('/delete/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      record.remove()
    })
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })

})

module.exports = router