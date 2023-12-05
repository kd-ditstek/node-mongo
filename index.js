const express = require("express"), app = express();
var db = require('./dbconnection');
require("dotenv").config();
authRoutes = require("./routes/auth");

//parse the request for application JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))

//using user route
app.use(authRoutes);

//setup server for listen port
app.listen(process.env.PORT || 8080, () => {
    console.log("server running on "+ process.env.PORT ? process.env.PORT : '8080')
})