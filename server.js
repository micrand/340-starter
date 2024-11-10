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


/* ***********************
 * Routes
 *************************/
app.use(static)

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout");

app.get("", (req, res)=>{
  res.render("index", {
      title: "Home page"
  })
});

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
