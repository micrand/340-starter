const express = require('express')
const router = new express.Router()
const accountController = require('../controllers/accountController')

router.get('/registration', accountController.buildRegistration)

module.exports = router