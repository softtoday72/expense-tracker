if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../../models/users')
const Record = require('../../models/record')
const Category = require('../../models/category')
const db = require('../../config/mongoose')



const SEED_USER = { 
  name: 'User1', email: 'user1@example.com', password: '12345678' 
}

const SEED_TRACKER = [
  { name: "早餐", date: "2022-03-11", amount: 100, catrgory: "交通出行" },
  { name: "管理費", date: "2022-03-12", amount: 200, catrgory: "居家物業" }
]




db.once("open", () => {
   User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
     password: SEED_USER.password
    })
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 2 },
        (_, i) =>
          Category.findOne({ category: SEED_TRACKER[i].catrgory })
            .then(userCategory => {
              const categoryId = userCategory.id
              return Record.create({ name: SEED_TRACKER[i].name, date: SEED_TRACKER[i].date, amount: SEED_TRACKER[i].amount, category: SEED_TRACKER[i].catrgory, userId, categoryId })
            })
      ))
    })
    .then(() => {
      console.log("done.")
      process.exit()
    })
})