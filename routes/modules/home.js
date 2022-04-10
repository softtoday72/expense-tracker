const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req,res) => {
  const userId = req.user._id
  
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(item => {
        totalAmount += item.amount
      })
      return res.render('index', {
        totalAmount, records
      })
    })

})

router.post('/', (req, res) => {
  const userId = req.user._id
  const sort = req.body.sort
  
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .then(records => {
      let totalAmount = 0
      const result = []
      if (sort === '全部') {
        records.forEach(record => {
          totalAmount += record.amount
          
        })
        
        return res.render('index', { records, totalAmount, sort })
      } else {
        records.forEach(record  => {
          if (record.categoryId.name === sort){
            result.push(record)
            
            result.forEach(result => {
            totalAmount += result.amount
            })
          }
        })
        return res.render('index', {records: result, totalAmount, sort})
      }
    })
    .catch(error => {
      console.log(error)
      res.render('errorPage', { error: error.message })
    })
  
})

module.exports = router
