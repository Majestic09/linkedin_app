
const express = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// User registeration
userRouter.post("/register", async (req, res) => {
    const {name,email,gender,password,age,city} = req.body;
    try {
        bcrypt.hash(password, 6, async(err, hash)=> {
            // Store hash in your password DB.
            const user = new userModel({ name, email, gender, password: hash, age, city });
            await user.save();
            res.send({"msg":"user is registerd"})
        });
    } catch (err) {
        console.log(err);
        res.send({"msg":err.message})
    }
})

//User login

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async(err, result)=> {
                if (result) {
                    const token = jwt.sign({ "userId": "userId" }, "water");
                    console.log(token);
                    res.send({ "msg": "Login Sucessfull", "token": token })
                } else {
                    res.send("wrong Credentials")
               }
            });
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":err.message})
    }
})

module.exports={userRouter}