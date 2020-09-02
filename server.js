//Series of npm packages that we will use to give our server useful functionality
var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

//listens to the port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
