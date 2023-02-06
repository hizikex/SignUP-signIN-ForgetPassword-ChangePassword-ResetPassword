const express = require('express');
const {adminSignUp, adminLogIn, adminVerify, adminForgotPassword, adminResetPassword, adminChangePassword} = require('../controllers/addAdmin');
const {userSignUp, userlogIn, verifyUser, UserResetPassword, UserLogOut, UserForgotPassword, allUsers} = require('../controllers/addUsers')
const {newDoc, docVerify, docLogIn, docForgotPassword, docResetPassword, docLogout} = require('../controllers/addDoctor')
const { addMessage, getMessages } = require("../controllers/messageController");


const Router = express.Router();

//admin routes
Router.route('/adminsignup').post(adminSignUp)
// Router.route('/userVerify/:id').post(verifyLink)
Router.route('/adminlogin').post(adminLogIn)
Router.route('/adminVerify/:userid').post(adminVerify)
Router.route('/adminForgotPassword').post(adminForgotPassword)
Router.route('/adminchangepassword/:id/:token').post(adminResetPassword)
Router.route('/adminchangepassword/:id').post(adminChangePassword)

// user routes
Router.route('/allusers').get(allUsers)
Router.route('/usersignUp').post(userSignUp)
Router.route('/userlogIn').post(userlogIn)
Router.route('/userverify/:id').post(verifyUser)
Router.route('/userforgotpassword').post(UserForgotPassword)
Router.route('/userchangepassword/:id/:token').post(UserResetPassword)
Router.route('/userlogOut').post(UserLogOut)

//doctors routes
Router.route('/sign').post(newDoc)
Router.route('/docVerify/:docid').post(docVerify)
Router.route('/login').post(docLogIn)
Router.route('/forgotpassword').post(docForgotPassword)
Router.route("/changepassword/:id/:token").post(docResetPassword)
Router.route('/logout').post(docLogout)

//message routes
Router.post("/addmsg/", addMessage);
Router.post("/getmsg/", getMessages);


module.exports = Router