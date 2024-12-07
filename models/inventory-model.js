const pool = require("../database/")

async function  getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/**
 * Get all inventory items and classification_name by classification_id
 */
async function getInventoryByClassificationId(classification_id){
    try {
        const data= await pool.query(
            `SELECT * FROM public.inventory AS i 
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id  
            WHERE i.classification_id = $1`,
            [classification_id]
        )

        //console.log( data )

        return data.rows

    }
    catch(error){
        console.error("getClassificationsById error " + error)
    }
}

async function getVehicleDetailsById(vehicle_id) {
    try {

        const data = await pool.query(
            `SELECT * FROM public.inventory as i
            WHERE i.inv_id = $1`,
            [vehicle_id]
        )       

        return data.rows[0]

    }
    catch(error){
        console.error("vehicle Detail error: " + error)
    }
}

module.exports = {getClassifications, getInventoryByClassificationId, getVehicleDetailsById}