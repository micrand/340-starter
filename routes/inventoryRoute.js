const express = require('express')
const router = new express.Router()
const inventoryController = require('../controllers/invController')
const utilities = require('../utilities')

router.get('/type/:classificationId', inventoryController.buildByClassificationId)
router.get('/detail/:vehicleId', utilities.handleErrors(inventoryController.buildVehicleDetailsById))

module.exports = router