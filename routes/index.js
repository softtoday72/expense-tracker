const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const edit = require('./modules/edit')
const create = require('./modules/create')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/create', authenticator, create)
router.use('/edit', authenticator, edit)
router.use('/', authenticator, home) 


module.exports = router