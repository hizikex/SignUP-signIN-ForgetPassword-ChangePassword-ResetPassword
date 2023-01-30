require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const Router = require('./routers/addAdmin')
// const dotenv = require("dotenv");
const app = express()

const db = process.env.DATABASE

app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send("My Api is connected successfully")
})
app.use('/api', Router)

mongoose.set('strictQuery', true)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongooseDB connected")
})

app.listen(process.env.PORT || 5555, ()=>{
    console.log("Server is listening to PORT: 5555")
})