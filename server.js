const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes
require("./routes/api")(app);
require("./routes/html")(app);

//listens to the port
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});