require('dotenv').config()
const cors = require("cors")
const express = require("express");
const socket = require("socket.io");
const mongoose = require('mongoose')
const fileUploader = require('express-fileupload')
const Router = require('./routers/addAdmin')
// const dotenv = require("dotenv");
const app = express()

const db = process.env.DATABASE

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send("My Api is connected successfully")
})

app.use(fileUploader({
    useTempFiles: true
}))

app.use('/api', Router)

mongoose.set('strictQuery', true)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongooseDATABASE connected")
})
const server = app.listen(process.env.PORT || 5555, ()=>{
    console.log("Server is listening to PORT: 5555")
})


const io = socket(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  const dataB = mongoose.connection;

  dataB.on("open", ()=>{
    const observer = dataB.collection("users").watch();
    observer.on("change", (change)=>{
      if(change.operationType === 'insert'){
        const userData = {
          _id: change.fullDocument._id,
          email: change.fullDocument.email 
        }
        io.emit("newUser", userData)
        console.log(userData)
      }
    })
  })

  dataB.on("newchat", ()=>{
  const messageObserver = dataB.collection("Messages").watch();
  messageObserver.on("change", (change)=>{
    if(change.operationType === 'insert'){
      const messageData ={
        patient: change.fullDocument.patient._id,
        doctor: change.fullDocument.doctor._id,
      }
      io.emit("recieve-message", messageData)
      console.log(messageData)
    }
  })
});

dataB.on("check", ()=>{
    const observeDoctor = dataB.collection("doc").watch();
    observeDoctor.on("change", (change)=>{
      if(change.operationType === 'insert'){
        const docData = {
          _id: change.fullDocument._id,
          email: change.fullDocument.email 
        }
        io.emit("newDoctor", docData)
        console.log(docData)
      }
    })
});

  io.on("connection", (socket) => {

      console.log('connected', socket.id)
      socket.on("disconnect", ()=>{
        console.log("disconected")
      })
    });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to)
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });