//import devs
const express = require("express")
const Workout = require("../models/Workout")
//create the router
const router = express.Router()

//routes

router.get("/seed", async (req, res) => {
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
   router.get("/", async(req, res) => {
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
   router.get("/new", (req, res) => {
       res.render("workouts/new.ejs")
   })
   
   // create route
   router.post("/", async (req, res) => {
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
   router.get("/:id/edit", async (req, res) => {
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
   router.put("/:id", async (req, res) => {
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
   router.delete("/:id", async (req, res) => {
     const id = req.params.id
     await Workout.findByIdAndDelete(id)
     res.redirect("/workouts")
   })
   
   // the show route (get to /fruits/:id)
   router.get("/:id", async (req, res) => {
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

//export the router
module.exports = router