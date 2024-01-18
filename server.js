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


// register our middleware 
app.use(morgan("dev")) // logger
app.use(methodOverride("_method")) // overridse form submission
app.use(express.urlencoded({extended: true})) //parsely
app.use(express.static("public")) // serve files from the public folder

/////////////////////////////////////////////////////
// routes
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("It's Working")
})

app.get("/workouts/seed", async (req, res) => {
 try{

// array of starting workpouts
const startWorkouts = [
    {exercise: "Cycling", duration: "45 minutes", intensity: "Moderate", completion: true},
    {exercise: "Pilates", duration: "40 minutes", intensity: "Low", completion: false},
    {exercise: "Swimming", duration: "1 hour", intensity: "High", completion: true},
    {exercise: "Strength Training", duration: "50 minutes", intensity: "Very High", completion: false},
        ];
// delete all workouts 
 await Workout.deleteMany({})

 // seed my starter workout
const createdWorkouts = await Workout.create(startWorkouts)
res.json(createdWorkouts)
    } catch (error){
        console.log(error.message)
        res.send("there was an error")
    }
});

// index route get -> /workouts
app.get("/workouts", async(req, res) => {
    try{
        // get all workouts
        const workouts = await Workout.find({})
        // render a template
        // workouts/index.ejs = views/workouts/index.ejs
        res.render("workouts/index.ejs", {workouts})
    }catch(error){
        console.log("----", error.message, "----")
        resizeBy.status(400).send("error, read logs for details")
    }
});