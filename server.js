// Dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")

// get .env variables
const {DATABASE_URL, SECRET, PORT} = process.env

// database connection
mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

// create app object
const app = express()


// routes
app.get("/", (req, res) => {
    res.send("It's Working")
})

// turn on the server (the listener)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// destructure schema and model into their own variables
const {Schema, model} = mongoose

// schema - shape of the data
const workoutSchema = new Schema({
    exercise: String,
    duration: String,
    intensity: String,
    completion: Boolean
})

// model- object for the interacting with the db
const Workout = model("Workout", workoutSchema)




