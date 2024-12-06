const express = require('express')
const router = new express.Router()
const inventoryController = require('../controllers/invController')

router.get('/type/:classificationId', inventoryController.buildByClassificationId)
router.get('/detail/:vehicleId', inventoryController.buildVehicleDetailsById)

module.exports = router