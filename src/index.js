
const express = require("express");
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const app = express();
const connect = require("./configs/db");
const usercontroller = require("./controllers/user.controller")
const { login, register } = require("./controllers/auth.controller");


app.use(express.json());
app.use(cors());
app.post('/login', login);
app.post('/register',

body("name")
.isString()      
.isLength({ min: 3, max: 20 })   
 .withMessage("First name should be 3 to 20 characters long"),
    
body("username")
.isString()      
.isLength({ min: 3, max: 10 })   
.withMessage("User name should be 3 to 10 characters long"),

body("email")
.isEmail()      
.withMessage("Please enter a valid E-Mail address"), 

body("password")
.isLength({ min: 8, max: 20 })
.custom((value) => {
  let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (pattern.test(value)) {
    return true;
  }
  throw new Error("Your password must contain at least 8 characters, one uppercase letter, one number, and one special character.");
}),

    register);

app.use("/users", usercontroller);

const port = process.env.PORT || 5000; 

app.listen(port, async () => {
    
    try {
        await connect()
        console.log("listening on port 5000")
    }
    catch (err) {
        console.log({ message: err.message })
    }

})