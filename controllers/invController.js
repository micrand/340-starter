const invModel = require('../models/inventory-model')
const utilities = require('../utilities/')


const inventoryController = {}

/**
 * Build inventory by classification view
 */
inventoryController.buildByClassificationId = async function(req, res, next){

    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    try {
        const className = data[0].classification_name
    
        const grid = await utilities.buildClassificationGrid(data)
        let nav = await utilities.getNav()
        res.render('./inventory/classification', {
            title: className + " vehicles",
            nav,
            grid
        })
    }
    catch(error){
        throw error;
    }
    


}

inventoryController.buildVehicleDetailsById = async function(req, res, next){

    const vehicle_id = req.params.vehicleId    
    let data = await invModel.getVehicleDetailsById(vehicle_id)
    const detail = await utilities.buildVehicleDetailsView(data)
    const vehicle_title = data.inv_make + ' ' + data.inv_model

    let nav = await utilities.getNav()
    res.render('./inventory/detail', {
        title: vehicle_title,
        nav,
        detail
    })
}


module.exports = inventoryController