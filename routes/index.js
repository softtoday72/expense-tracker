const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const edit = require('./modules/edit')
const create = require('./modules/create')

router.use('/create', create)
router.use('/edit', edit)
router.use('/', home) 


module.exports = router