const user=require("../models/userModel");
const doc=require("../models/docModel");

//user  appointment
exports.bookAppointment=async(req,res)=>{
    const id=req.params.id
    
    try {const userAppointment = await user.findById(id);
        const {appointmentDate, appointmentTime, appointmentType}=req.body
    const createUserAppointment=await user.findByIdAndUpdate(userAppointment._id,
        {appointmentDate, appointmentTime,appointmentType},
        {new : true }
        )
     

    res.status(200).json({
        data:`your appointment is fixed for ${createUserAppointment.appointmentDate} by ${createUserAppointment.appointmentTime}`,
        message:"appointment booked"

    });
        
    } catch (error) {res.status(400).json({message:"cant book appointment"})
        
    }
}

// 
// doc view appointment
exports.viewAppointment=async(req,res)=>{
    

    try {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
       
        const currentDate = `${day}-0${month}-${year}`;
        
        const theDayAppointment=await user.find({appointmentDate:currentDate}).select([
            "firstName", "lastName", "mobileNumber"
        ])
       


       
        res.status(201).json({
            message:`hello doc you have ${theDayAppointment.length} appointments today kindly check below for their details`,
            // data: {...others}
            data: theDayAppointment
        })
        
    }catch (error) {res.status(404).json({message:"cant view appointment"})
        
    }
}