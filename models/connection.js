// import our deps
require("dotenv").config()
const mongoose = require("mongoose")


//establish connection
//grab url
const DATABASE_URL = process.env.DATABASE_URL

//establisdh connectiopn
mongoose.connect(DATABASE_URL);

//conection events
mongoose.connection
.on("open", () => {console.log("connected to mongoose")})
.on("close", () => {console.log("disconnected to mongoose")})
.on("error", (error) => {console.log(error)})

//export connection
module.exports = mongoose