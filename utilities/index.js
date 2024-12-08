const invModel = require("../models/inventory-model")
const Util = {}

Util.getNav = async function(req, res, next) {

    let data = await invModel.getClassifications()

    let list = "<ul>"
    list += `<li><a href="/" title="Home page">Home</a></li>`
    
    data.rows.forEach((row) => {
        // console.log(row)
        list += '<li><a href="/inv/type/' + row.classification_id + '" '
        list += ' title="See our inventory of ' + row.classification_name +  ' vehicles">'
        list += row.classification_name
        list += `</a></li>`
    })
    list += "</ul>" 

    return list

}

Util.buildClassificationGrid = async function(data){
    let grid

    if( data.length > 0) {
        grid = '<ul id="inv-display">'

        data.forEach( vehicle => {
            grid += '<li class="vehicle-item">'
            grid += '<a href="/inv/detail/'+ vehicle.inv_id +'">'
            grid += '<img src="'+vehicle.inv_thumbnail+'" '
            grid += ' alt="Image of ' +vehicle.inv_make + ' ' + vehicle.inv_model + '">'    
            grid += '</a>'
            grid += '<div class="namePrice">'
            grid += '<hr/>'
            grid += '<a href="/inv/detail/' + vehicle.inv_id
            grid += '">'
            grid += '<h2>'
            grid += vehicle.inv_make + ' ' + vehicle.inv_model
            grid += '</h2>'
            grid += '</a>'
            grid += '<span>$'+new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })

        grid += '</ul>'
    } else {

    }

    return grid
}

Util.buildVehicleDetailsView = async function(data) {

    let detail    

    
    try {

        let vehicle_title = data.inv_make + ' ' + data.inv_model
        detail += '<div class="detail-content">'
        detail += '<div class="detail-photo detail-column">'
        detail += `<img src="${data.inv_image}" loading="lazy" alt="${vehicle_title}" />`
        detail += '</div>'
        detail += '<div class="detail-info detail-column-2">'
        detail += `<h2>${vehicle_title}</h2>`
        detail += `<p class="price">Price: <span>$${new Intl.NumberFormat('en-US').format(data.inv_price)}</span></p>`
        detail += `<p>${data.inv_description}</p>`
        detail += `<p class="year">Year: ${data.inv_year}</p>`
        detail += `<p class="miles">Miles: ${new Intl.NumberFormat('en-US').format(data.inv_miles)}</p>`
        detail += '</div>'
        detail += '</div><!--.detail-content-->'
        detail += ''
    }
    catch(error){

    }


    //}
    
  
    
   
    return detail
}

/**
 * Middleware for handling errors
 * wrap other function in this for
 * general error handling
 * @param {*} fn 
 * @returns 
 * unite 3 activity
 */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util