
    const express = require("express");
    const { connection } = require("./config/db.js");
    const cors = require("cors");
    const {userRouter }= require("./routes/user.route.js")
const { postRouter } = require("./routes/post.route")
const {authentication}=require("./middlewares/auth.middleware.js")
    require("dotenv").config();
    const app = express();


    app.use(express.json())
    app.use(cors())


    app.get("/", (req, res) => {
        res.send("<html><h1>HOME PAGE</h1></html>")
    })
app.use("/users", userRouter)
    app.use(authentication())
    app.use("/posts",postRouter)    


    const port = process.env.PORT;
    app.listen(port, async () => {
        try {
            await connection;
            console.log("connected to db");
            console.log(`server is running at:${port}`);
        } catch (err) {
            console.log(err);
        }
    })