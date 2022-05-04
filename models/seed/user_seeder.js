if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../../models/users')
const Record = require('../../models/record')
const Category = require('../../models/category')
const db = require('../../config/mongoose')
const { recordList } = require('./user_seeder.json')


const SEED_USERS = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    expenses: recordList.slice(0, 2)
  },
  {
    name: '美冴',
    email: 'user2@example.com',
    password: '87654321',
    expenses: recordList.slice(2, 5)
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, seeduser => {
    return User.create({
      name: seeduser.name,
      email: seeduser.email,
      password: seeduser.password
    })
      .then(user => {
        return Promise.all(Array.from(seeduser.expenses, expense => {
          return Category.findOne({ name: expense.category })
            .lean()
            .then(category => {
              expense.categoryId = category._id
              expense.userId = user._id
              return Record.create(expense)
            })
        }))
      })
  }))
  .then(() => {
    console.log('done!')
    process.exit()
  })
  .catch(err => console.log(err))
  
})