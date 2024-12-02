const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./model/User")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/bananaGameDB");




app.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/signup", (req, res) => {
    User.create(req.body)``
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


app.listen(4000, () => {
    console.log("server is running")
})
