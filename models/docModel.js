const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const docSchema = new mongoose.Schema({
name: {
        type: String,
        required: [true, "Name is required"]
    },
   
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
        sentMessages: [{
        type: Schema.Types.ObjectId,
        ref: 'Messages'
      }],
      recievedMessages: [{
        type: Schema.Types.ObjectId,
        ref: 'Messages'
      }],
    mobileNo: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true
    },
 birthDate: {
        type: String,
        required: [true, "Birthdate is required"]
    },
gender: {
        type: String,
        required: [true, "kindly provide your gender"]
    },
    speciality: {
        type: String,
        required: [true, "speciality is required"]
    },
    admin: {
        type: String,
        default: true
    },
location: {
        type: String,
        required: [true, "location is required"]
    },
   password: {
        type: String,
        required: [true, "Password is required"],
    },
    //   confirmPassword: {
    //     type: String,
    //     required: [true, "Confirm Password is required"],
    //   },


      certificateUpload:{
    public_id: {
        type: String,
         },
    url:{ type: String,}},

    // license: {
    //     public_id: {
    //         type: String,
    //          },
    //     url:{ type: String
    //     }},
    
    // proofOfId: {
    //     public_id: {
    //          },
    //     url:{ type: String
    //     }},
    // profilePic: {
    //     public_id: {
    //         type: String,
    //          },
    //     url:{ type: String
    //     }
    // },
    bookAppointment: [{
        type: Schema.Types.ObjectId,
        ref:'appointment'
      }],
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false
    },
    // cloudId: {
    //     type: String
    // },
   
},  
{
 timestamps: true
})

const doc = mongoose.model('doc', docSchema)
module.exports= doc