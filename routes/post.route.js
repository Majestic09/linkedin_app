
const express = require("express");
const postRouter = express.Router();
const { postModel } = require("../models/post.model.js")


postRouter.get("/", async (req, res) => {
    const users = await postModel.find();
    res.send(users)
})

postRouter.post("/top", async (req, res) => {
    
    const userdata = await postModel.find({})
});

postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const id = req.params.id;
    const data = await postModel.findOne({ "_id": id });
    try {
        if (data.userId !== userId) {
            res.send({"msg":"Your are not autorized for operation "})
        } else {
            await postModel.findByIdAndUpdate({ "_id": id }, payload);
            res.send("Data is updated")
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"Not ablet to update the data"})
    }
})

postRouter.put("/delete/:id", async (req, res) => {
   
    const id = req.params.id;
    const data = await postModel.findOne({ "_id": id });
    try {
        if (data.userId !== userId) {
            res.send({"msg":"Your are not autorized for operation "})
        } else {
            await postModel.findByIdAndDelete({ "_id": id });
            res.send("Data is Deleted")
        }
    } catch (err) {
        console.log(err);
        res.send({"msg":"Not ablet to update the data"})
    }
})