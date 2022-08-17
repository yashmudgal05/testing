const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");

const errorMiddleware = require("./middleware/error");

//config
if (process.env.NODE_ENV!=="PRODUCTION"){
  require("dotenv").config({path:"backend/config/config.env"});
}

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
const user = require("./routes/userRoute");
const contact = require('./routes/contactRoute');

app.use("/api/v1",user);
app.use("/api/v1",contact);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

//Middleware for error
app.use(errorMiddleware);

module.exports = app;