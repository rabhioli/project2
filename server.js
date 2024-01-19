// Dependencies
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const Workout = require("./models/Workout")

// get .env variables
const {DATABASE_URL, SECRET, PORT} = process.env

// database connection
// mongoose.connect(DATABASE_URL)

// mongoose.connection
// .on("open", () => console.log("Connected to Mongoose"))
// .on("close", () => console.log("Disconnected from Mongoose"))
// .on("error", (error) => console.log(error))

// create app object
const app = express()



// turn on the server (the listener)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



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
        res.status(400).send("error, read logs for details")
    }
});
// New Route
app.get("/workouts/new", (req, res) => {
    res.render("workouts/new.ejs")
})

// create route
app.post("/workouts", async (req, res) => {
    try {
        console.log(req.body); 
        // check if completion should be true
        req.body.completion = req.body.completion ? true : false;
        // create the workout in the database
        await Workout.create(req.body);
        // redirect back to the main page
        res.redirect("/workouts");
    } catch (error) {
        console.log("----", error.message, "----");
        res.status(400).send("Error, read logs for details");
    }
});

// edit route (get request)
app.get("/workouts/:id/edit", async (req, res) => {
    try{
 // get the id from the params
 const id = req.params.id
 // get the fruit from the template
 const workout = await Workout.findById(id);
 //render the template 
 res.render("workouts/edit.ejs", { workout });
    }catch(error){
        console.log("----", error.message, "----")
        res.status(400).send("error, read logs for details")
    }
});

//update route
app.put("/workouts/:id", async (req, res) => {
    try{
        //get the id 
        const id  = req.params.id 
        req.body.completion = req.body.completion === "on" ? true : false
        //update the workout
        await Workout.findByIdAndUpdate(id, req.body)
        res.redirect(`/workouts/${id}`)
    }catch(error){
        console.log("----", error.message, "----")
        res.status(400).send("error, read logs for details")
    }
    
})

// delete route 
app.delete("/workouts/:id", async (req, res) => {
  const id = req.params.id
  await Workout.findByIdAndDelete(id)
  res.redirect("/workouts")
})

// the show route (get to /fruits/:id)
app.get("/workouts/:id", async (req, res) => {
    try{
        // get the id from params
        const id = req.params.id
        // find the particular workout from the database
        const workout = await Workout.findById(id)
        // render the template
        res.render("workouts/show.ejs", {workout})
    }catch(error){
        console.log("----", error.message, "----")
        res.status(400).send("error, read logs for details")
    }
    
})