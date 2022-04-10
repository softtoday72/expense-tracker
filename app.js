const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const port = process.env.PORT
require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})