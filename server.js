/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
var expressLayouts = require('express-ejs-layouts');
var path = require("path");
const baseController = require("./controllers/BaseController");
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require("./routes/accountRoute")
const session = require("express-session")
const pool = require('./database/')
const utilities = require('./utilities/')


/* ***********************
 * Routes
 *************************/
app.use(static)

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout")


/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

//app.get("/", baseController.buildHome)
app.get("/", utilities.handleErrors(baseController.buildHome))
app.use("/inv", utilities.handleErrors(inventoryRoute))
app.use("/account", accountRoute)
app.get("/routeerror", utilities.handleErrors(baseController.buildError))

/**
 *  404 error - File not found route
 */
app.use(async (req, res, next) => {
  next({status: 404, message: 'Congrats! You broke it...'}) //Congrats! You broke it...
})

/**
 * Error express handling
 */
app.use(async( err, req, res, next) => {
  let nav = await utilities.getNav()
  console.log(`Error at ${req.originalUrl} ! ${err.message}`)

  if( err.status == 404 ){
    message = err.message
  }else{
    message = "Oh no! there was a crash. Maybe try a different route?"
  }

  res.render('errors/error', {
    title: err.status || 'Server Error',
    message,
    nav
  })

})


// app.get("/about", (req, res) => {
//   res.render("about", {
      
//   });
// });


//app.set("views", path.join(__dirname, "views"));



//app.set('layout extractScripts', true)
//app.set('layout extractStyles', true)



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
