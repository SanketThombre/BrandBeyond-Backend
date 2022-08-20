const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const newToken = (user) => {
    return jwt.sign({ user }, "shhhhh")
};



const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          let newErrors;
          newErrors = errors.array().map((err) => {
              console.log("err", err);
              
           
            return ({ key: err.param, message: err.msg  });
          });
          return res.status(400).send({ errors: newErrors });
        }


        //We will try to find the user with the username provided
        let user = await User.findOne({ email: req.body.email }).lean().exec();
      
        //if the user is found then it is an error;

        if(user) return res.status(500).send({ message:"Email already exists" });

        //if the user is not found then we will create user with email and password

        user = await User.create(req.body);

        //hashing

        const token = newToken(user);

        let status = "ok";
        
        res.send({user, token,status})
    }
    catch (e) {
       return res.status(500).send(e.message);
    }
}


const login = async(req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });

        if(!user) return res.status(400).send({ message:"Invalid Email or password" });
       
        const match = user.checkpassword(req.body.password);

        if(!match) return res.status(400).send({ message:"Invalid Email or Password" });
       
        const token = newToken(user);
        
        let status = "ok";
       
        res.send({ user, token ,status});
    }
    catch (e) {
       return res.status(500).send(e.message);
    }
}

module.exports = { login, register }; 
