const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');

//staff sign in () 
exports.signinStaff = async(req,res) => {
    const{ reg, password } = req.body;

        try{
            //find the staff by registration number
            const staff = await Staff.findOne({reg}).select("+password");

            //if the SLMC registration doesn't exist
            if (!staff)
                return res.status(404).json({message: "Registration number doesn't exist"});

            //compare the password with provided password
            const ispasswordMatch = await bcrypt.compare(password, staff.password);

            //if passwords didn't match
            if(!ispasswordMatch)
                return res.status(400).json({message: "Invalid Password"});

            //creating a token
            const token = jwt.sign({reg: staff.reg, id: staff._id}, process.env.JWT_SECRET, {expiresIn:"1h"} )

            //joining the staff object and token
            res.status(200).json({result: staff, token})
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//staff signup
exports.signupStaff = async(req,res) => {

    const {name,reg,phoneno,password,title,email,speciality,about,interest, qualification, faculty, imgUrl } = req.body;

    try {
        //creating a new staff
        const staff = await Staff.create({name,reg,phoneno,password,title,email,speciality,about,interest, qualification, faculty, imgUrl });

        //creating a token
        const token = jwt.sign({name: staff.name, id: staff._id, reg: staff.reg}, process.env.JWT_SECRET, {expiresIn: "1h"})
 
        //joining the staff  object and token as the response
        res.status(200).json({result: staff, token})
    }catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    } 
}

//staff update
exports.updateStaff = async(req,res) => {

    let staffID = req.params.id;
    const { name,reg,phoneno,password,title,email,speciality,about,interest, qualification, faculty } = req.body;


    const updateStaff= { name,reg,phoneno,password,title,email,speciality,about,interest, qualification, faculty } 
    
    try{
        //find staff by ID  
         await Staff.findByIdAndUpdate(staffID ,updateStaff);

        res.status(200).json({message:"staff updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

//staff delete
exports.deleteStaff = async(req,res) => {
    
    let staffId = req.params.id;
    
    try{
        await Staff.findByIdAndDelete(staffId);

        res.status(200).json({message:"delete successful"});
    }catch(error){
        res.status(500).json({message: "delete failed",error:error.message});
    }
}

exports.fetchAll =async(req,res) =>{

    Staff.find().then((staffs)=>{
        
        res.status(200).json(staffs)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}

exports.fetchOne =async(req,res) =>{
    let staffId = req.params.id;

    await Staff.findById(staffId)
    .then( (staff) =>{
        res.status(200).json(staff)
    }).catch( (error) =>{
        res.status(500).json({message:"Fetching failed", error:error.message});
    })
}
