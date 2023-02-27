const mongoose = require('mongoose');
const Message = require('../models/messageModel')
const Patient = require('../models/userModel');
const Doctor = require('../models/docModel');


// exports.messageFromDoctor = async (req, res) => {
//   try {
//       // const senderPat = await Patient.findById(req.params.senderId);
//       const senderDoc = await Doctor.findById(req.params.senderId);
//       const receiverPat = await Patient.findById(req.params.receiverId);
//       // const receiverDoc = await Doctor.findById(req.params.receiverId);
  
//       if (!senderDoc || !receiverPat)
//       res.status(404).json({
//         Message: "Patient or Doctor Not found"
//       })
//       console.log(senderDoc)
//       console.log(receiverPat)
//       if (senderDoc && receiverPat) {
//         const chat = new Message({
//           message: req.body.message
//       });
  
//       chat.senderD = senderDoc;
//       chat.recieverP = receiverPat;
  
//       await chat.save();
  
//       senderDoc.sentMessages.push(chat);
//       receiverPat.recievedMessages.push(chat);
  
//       await senderDoc.save();
//       await receiverPat.save()
  
//       res.status(200).json({
//           message: "Successfully",
//           data: chat
//       })
//       }
//   } catch (err) {
//     res.status(401).json({
//       message: err.message
//     })
//   }
// }

//
// // create a new chat session
// exports.messageFromPatient = async (req, res, next) =>{
//   try {
//     const id = req.params.id;
//     const receiverId = req.params.receiverId;
//     const senderPat = await Patient.findOne({id});
//     // const senderDoc = await Doctor.findById(req.params.senderId);
//     // const receiverPat = await Patient.findById(req.params.receiverId);
//     const receiverDoc = await Doctor.findOne({receiverId});
//     // console.log(senderPat);
//     // console.log(receiverDoc);

//     if (!senderPat || !receiverDoc) {
//       res.status(404).json({
//         Message: "Patient or Doctor Not found"
//       })
//     } else if (senderPat && receiverDoc) {
//       const chat = new Message({
//         message: req.body.message 
//       })
//       chat.senderP = senderPat;
//       chat.receiverD = receiverDoc
//       await chat.save();
  
//       senderPat.sentMessages.push(chat);
//       receiverDoc.recievedMessages.push(chat);
  
//       await senderPat.save();
//       await receiverDoc.save();
      
//       res.status(200).json({
//         message: "Successfully",
//         data: chat
//     })
//     } else {
//       res.status(400).json({
//         message: err.message
//       })
//     }
//   } catch (err) {
//     res.status(400).json({
//       message: err.message
//     })
//   }
// }

//router.post("/chat/:patientId/:doctorId", 
// Create a new chat session
exports.sessionCreation = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    const doctor = await Doctor.findById(req.params.doctorId);

    if (!patient || !doctor) {
      res.status(404).send({ error: "Patient or doctor not found" });
    }

    const chat = new Chat({
      patient: patient._id,
      doctor: doctor._id,
    });

    await chat.save();

    patient.chatHistory.push(chat._id);
    doctor.chatHistory.push(chat._id);

    await patient.save();
    await doctor.save();

    res.status(200).json({
      data: chat
    })
  } catch (error) {
    res.status(500).json({
      error: "Failed to create chat session"
    });
  }
};

// Add a new message to a chat session
//router.post("/chat/:chatId/message", 
exports.patientMessage = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
         error: "Chat session not found" 
        });
    }

    chat.messages.push({
      sender: req.body.sender,
      message: req.body.message,
    });

    await chat.save();

    res.status(200).json({
       chat 
      });
  } catch (error) {
    res.status(500).json({
       error: "Failed to add message to chat session" 
      });
  }
};

// Retrieve the chat history for a specific chat session
exports.specificMessage = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({
         error: "Chat session not found" 
        });
    }

    res.send({ chat });
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve chat history" });
  }
};
