const invModel = require('../models/inventory-model')
const utilities = require('../utilities/')


const inventoryController = {}

/**
 * Build inventory by classification view
 */
inventoryController.buildByClassificationId = async function(req, res, next){

    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const className = data[0].classification_name
    
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    res.render('./inventory/classification', {
        title: className + " vehicles",
        nav,
        grid
    })


}

inventoryController.buildVehicleDetailsById = async function(req, res, next){
    const vehicle_id = req.params.vehicleId
    const detail = 'Vehicle detail content'
    let nav = await utilities.getNav()
    res.render('./inventory/detail', {
        title: 'Vehicle detail',
        nav,
        detail
    })
}


module.exports = inventoryController