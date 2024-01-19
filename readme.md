# Seal Project 2

- **Rabhi Alqadi**
- **FitnessTrackerX**
- **FitnessTrackerX is a comprehensive fitness tracking application designed to empower users on their journey to a healthier lifestyle. The purpose of the app is to provide individuals with a user-friendly platform to log and monitor their fitness activities, set and achieve personalized goals, and gain insights into their overall well-being.**
- **Github URL:* https://github.com/rabhioli/project2*
- Deployed Website: https://ra-seal-project22.onrender.com 
- Trello Board:https: https://trello.com/b/SZ8bNOpo/fitnesstrackerx

## List of Dependencies

##### Node Dependencies (package.json)

- express 
- bcrypt
- connect-mango
- dotenv
- ejs
- express-session
- method-override
- mongoose
- morgan




##### Frontend 

- alpine

## Route Map

| Route Name        | Endpoint                   | Method | Description                                       |
|-------------------|----------------------------|--------|---------------------------------------------------|
| Home              | /                          | GET    | Renders the home page with overview and user stats|
| Log Workout       | /workouts                  | GET    | Renders a form to log a new workout               |
|                  | /workouts                  | POST   | Handles the submission of a new workout form      |
| View Workouts     | /workouts/view             | GET    | Displays a list of logged workouts                |
| Edit Workout      | /workouts/:id/edit         | GET    | Renders a form to edit a specific workout         |
|                  | /workouts/:id/edit         | PUT    | Handles the submission of an edited workout form  |
| Delete Workout    | /workouts/:id/delete       | POST   | Deletes a specific workout                        |
| Set Goals         | /goals                     | GET    | Renders a form to set personal fitness goals      |
|                  | /goals                     | POST   | Handles the submission of personal fitness goals  |
| Progress Tracker  | /progress                  | GET    | Displays visual representations of fitness progress|
| Community Feed    | /community                 | GET    | Shows a feed of user achievements and discussions|

|

## Design Mockups (Desktop + Mobile)

##### Mobile Design

![My Desktop View](https://i.imgur.com/3eVxd4f.png)

##### Desktop Design
![My Desktop View](https://i.imgur.com/5XiIlk2.png)



## ERD (Entity Relationship Diagram)



![Entity Relationship Diagram](https://i.imgur.com/aAv8Ylx.png)