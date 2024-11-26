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



/* ***********************
 * Routes
 *************************/
app.use(static)

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout")

app.get("/", baseController.buildHome)
app.use("/inv", inventoryRoute)
app.use(async( err, req, res, next) => {
  let nav = await utilities.getNav()
  // console.log(`Error at ${req.originalUrl} ! ${err.message}`)

  res.render('errors/error', {
    title: res.status || 'Server Error',
    message: err.message,
    nav
  })



})

app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

app.get("/about", (req, res) => {
  res.render("about", {
      
  });
});

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
