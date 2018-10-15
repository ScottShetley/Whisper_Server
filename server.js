//pulling in all we need
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let morgan = require("morgan");
let mongoose = require("mongoose");

//initalize and setup express
let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

//import the seceet model
require("./models/Secret");
//import the routes
app.use(require("./routes"));

//connection to mongo db
let mongoDB = "mongodb://user:password1@ds115753.mlab.com:15753/scott";

//connect to database
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

//get the connection
let db = mongoose.connection;
//on error output to console
db.on("error", error => console.log("connection error" + error));
//on connection open, out and tell app we are ready
db.once("open", () => {
  console.log("connected to database...");
  //broadcast a ready event
  app.emit("ready");
});

//listen to the readyy event
app.on("ready", () => {
  //setup our app on port and to listen
  let server = app.listen(8080, () => {
    let port = server.address().port;
    //output to console the port we are using
    console.log("running on", port);
  });
});
