if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../../models/users')
const Record = require('../../models/record')
const Category = require('../../models/category')
const db = require('../../config/mongoose')
const { userList, recordList } = require('./user_seeder.json')

db.once('open', ()=> {
  Promise.all(Array.from(userList, (seedUser, i) => {
    return User.create({
      name:seedUser.name, email: seedUser.email, password: seedUser.password
    })
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(recordList, (_, i) => {
        Category.findOne({ id : recordList[i].categoryId })
          .then(userCategory => {
            const categoryId = userCategory.name
            return Record.create({
              name: recordList[i].name, date: recordList[i].date, amount: recordList[i].amount, category: recordList[i].catrgory, userId, categoryId
          })
        
          })
      }))
    })
      .then(() => {
        console.log("done.")
        process.exit()
      })
  }))
})