const express = require('express');
// const upload = require('../utils/cloudinary')
// const {adminSignUp, adminLogIn, adminVerify, adminForgotPassword, adminResetPassword, adminChangePassword, allAdmins, oneAdmin, deleteAdmin, updateAdmin} = require('../controllers/addAdmin');
const {userSignUp, userLogIn, verifyUser, UserResetPassword, UserLogOut, UserForgotPassword, allUsers, oneUser, deleteUser, updateUser} = require('../controllers/addUsers')
const {newDoc, docVerify, docLogIn, docForgotPassword, docResetPassword, docLogout, allDoctors, oneDoctor, deleteDoctor, updateDoctor} = require('../controllers/addDoctor')
const { specificMessage, patientMessage, sessionCreation, doctorMessage } = require("../controllers/messageController");
const { IsAdminAuth } = require('../utils/authorization');
const { appointment,viewAppointment,acceptAppointment,docSelected } = require('../controllers/appointment');



const Router = express.Router();

//admin routes
// Router.get('/alladmins', allAdmins) 
// Router.get('/admin/:id', oneAdmin)
// Router.delete('/admin/:id', deleteAdmin)
// Router.patch('/admin/:id', updateAdmin)
// Router.route('/adminsignup').post(adminSignUp)
// // Router.route('/userVerify/:id').post(verifyLink)
// Router.route('/adminlogin').post(adminLogIn)
// Router.route('/adminVerify/:userid').post(adminVerify)
// Router.route('/adminForgotPassword').post(adminForgotPassword)
// Router.route('/adminchangepassword/:id/:token').post(adminResetPassword)
// Router.route('/adminchangepassword/:id').post(adminChangePassword)

// user routes
Router.get('/user/:id', oneUser)
Router.delete('/user/:id', deleteUser)
Router.patch('/user/:id', updateUser)
Router.route('/allusers').get(allUsers)
Router.route('/usersignUp').post(userSignUp)
Router.route('/userlogIn').post(userLogIn)
Router.route('/verifyUser/:id').post(verifyUser)
Router.route('/userforgotpassword').post(UserForgotPassword)
Router.route('/userchangepassword/:id/:token').post(UserResetPassword)
Router.route('/userlogOut').post(UserLogOut)
// Router.route('/bookappointment/:id').post(bookAppointment)
Router.route('/:id/bookappointment').post(appointment)
//doctors routes
Router.get('/alldoctors', IsAdminAuth, allDoctors)
Router.get('/doctor', oneDoctor)
Router.delete('/doctor',  IsAdminAuth, deleteDoctor)
Router.patch('/doctors', updateDoctor)
Router.route('/signup').post(newDoc)
Router.route('/docVerify/:docid').post(docVerify)
Router.route('/doctorlogin').post(docLogIn)
Router.route('/forgotpassword').post(docForgotPassword)
Router.route("/changepassword/:id/:token").post(docResetPassword)
Router.route('/logout').post(docLogout)
Router.route('/viewappointments').get(viewAppointment)
Router.route('/viewappointment').get(viewAppointment) 
Router.route('/:id/myappointment').get(docSelected)
Router.route('/:id/myappointment/acceptrequest').patch(acceptAppointment)
/
//message routes
Router.route("/chat/:patientId/:doctorId").post(sessionCreation);   
Router.post("/chatapp/:chatId/message", patientMessage);;
Router.post("/chatapp/:chatId/message", doctorMessage);
Router.get("/chat/:chatId", specificMessage);



module.exports = Router