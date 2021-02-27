const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  path = require("path"),
  fileUpload = require("express-fileupload"),
  session = require("express");

const Routes = require("./routes");

// handling data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initial file upload
app.use(fileUpload());

// views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

//routes
Routes(app);

app.listen(3000, () => console.log("server running at port 3000"));
