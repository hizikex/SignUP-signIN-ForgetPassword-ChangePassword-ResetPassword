const user=require("../models/userModel")
const doc=require("../models/docModel");
const userSendEmail = require('../utils/adminEmail');
const moment=require("moment")
//user  appointment
exports.appointment=async(req,res)=>{
    const userId=req.params.userId
    const docId=req.params.docId
    // const doctorWithId=req.body.bookDoctor
    try {const userAppointment = await user.findById(userId);
        
         const selectDoc=await doc.findOne().where({_id:docId}).select([
            "id","email","name"
         ]);
         console.log(selectDoc)
        const {appointmentDate,appointmentTime, appointmentType}=req.body
      
        // console.log(selectDoc)  
         
    const createUserAppointment=await user.findByIdAndUpdate(userAppointment,
        {appointmentDate, 
        appointmentTime,
        appointmentType,
        bookDoctor:docId }
        ) 
    
    res.status(200).json({
        data:`you have fixed an appointment for ${createUserAppointment.appointmentDate} by ${createUserAppointment.appointmentTime} with Doctor ${selectDoc.name}`,
        message:`appointment booked with ${selectDoc.name},kindly check back for approval`

    });
        
    } catch (error) {res.status(400).json({message:"cant book appointment"})
        
    }
}

// 
// doc view appointment
exports.viewAppointment=async(req,res)=>{
    

    try {
        // const date = new Date();

        // const day=date.getDate( );
        // // const newday=(day)=>{  if(day.length==1){ "0"+day}}
      
        
        // const month = date.getMonth() + 1;
        // const year = date.getFullYear(); 
       
        
        const currentDate =moment().format('DD-MM-YYYY')  
        //  `${newday()}-0${month}-${year}`; 
       
        // const currentDate2= `0${day}-0${month}-${year}` ;
        //  const currentDate3 = `0${day}-${month}-${year}` ;
        // console.log(currentDate)

      
        const theDayAppointment=await user.find().where({appointmentDate:currentDate }).select([
            "name", "email", "mobileNo","appointmentType"
        ])
       

        
       
        res.status(201).json({
            message:`hello doc you have ${theDayAppointment.length} appointments today kindly check below for their details`,
            // data: {...others}
            data: theDayAppointment
        })
        
    }catch (error) {res.status(404).json({message:"cant view appointment"})
        
    }
}


//doctor to accept
exports.acceptAppointment=async(req,res)=>{
    const id=req.body.id
    
    
    try {const userAppointment = await user.findOne().where({id:id});
        
        // console.log(userAppointment)
      
        
        const{appointmentStatus}=req.body   
    await user.findByIdAndUpdate(userAppointment._id,
        { appointmentStatus},
        {new : true } 
        ) 
     

    res.status(200).json({
        data:`you have accepteed an appointment with  patient ${userAppointment.name} slated for ${userAppointment.appointmentDate} by ${userAppointment.appointmentTime}`,
        message:`appointment booked `

    });
        
    } catch (error) {res.status(400).json({message:"cant book appointment with user"})
        
    }
}

exports.docSelected=async(req,res)=>{
    

    try {
    const currentDate =moment().format('DD-MM-YYYY')  
  const theDayAppointment=await user.find().where({appointmentDate:currentDate ,bookDoctor:req.params.id}).select([
            "name", "email", "mobileNo","appointmentDate","appointmentTime","appointmentType"
        ])
const id=req.params.id
             const selectDoc=await doc.findOne().where({_id:id}).select([
                "id","email","name"
             ]);
 res.status(201).json({
            message:`hello doc ${selectDoc.name} you have ${theDayAppointment.length} appointments today kindly check below for their details`,
          data: theDayAppointment
        })


        const sendId=req.body.id
    
    
        const userAppointment = await user.findOne().where({id:sendId});

        const message = `Hello, ${userAppointment.name},your appointment has been approved with ${selectDoc.name}`;
        userSendEmail({
          email:userAppointment.email ,
          subject: "Appointment booked",
          message,
        });
          
    }catch (error) {res.status(404).json({message:"cant view appointment"}) 
        
    }   
} 