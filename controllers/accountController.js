const utilities = require('../utilities/')

const accountCont = {}

accountCont.buildRegistration = async function(req, res){
    const nav = await utilities.getNav()    

    //req.flash("notice", "This is a flash message.")
    res.render( "account/login", { title: "Login", nav })
}

/* ****************************************
*  Deliver login view
* *************************************** */
// async function buildLogin(req, res, next) {
//     let nav = await utilities.getNav()
//     res.render("account/login", {
//       title: "Login",
//       nav,
//     })
//   }

module.exports = accountCont