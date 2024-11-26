const invModel = require("../models/inventory-model")
const Util = {}

Util.getNav = async function(req, res, next) {

    let data = await invModel.getClassifications()

    let list = "<ul>"
    list += `<li><a href="/" title="Home page">Home</a></li>"`
    
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
            grid += '<li>'
            grid += '<a href="/inv/detail/'+ vehicle.classification_id +'">'
            grid += '<img src="/'+vehicle.inv_thumbnail+'" '
            grid += ' alt="Image of ' +vehicle.inv_make + ' ' + vehicle.inv_model + '">'    
            grid += '</a>'

            grid += '<a href="/inv/detail/"' + vehicle.classification_id
            grid += '>'
            grid += '<h2>'
            grid += vehicle.inv_make + ' ' + vehicle.inv_model
            grid += '</h2>'
            grid += '</a>'
            grid += '</li>'
        })

        grid += '</li>'
    } else {

    }

    return grid
}

module.exports = Util