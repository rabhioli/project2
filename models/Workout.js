// import deps
const mongoose = require("./connection")

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
const Workout = model("Workout", workoutSchema);

// export the model
module.exports = Workout

