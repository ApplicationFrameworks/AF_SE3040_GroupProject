const router = require("express").Router();
let Request = require("../models/Request");

//add new Request
exports.addRequest = async (req, res) => {
  //constant variables for attributes
  const studentID = req.body.studentID;
  const staffID = req.body.staffID;

  //object
  const newRequest = new Request({
    //initializing properties
    studentID,
    staffID,
    subject,
    msg
  })

  //exception handling
  newRequest.save().then(() => {
    //saving the object to the db
    res.status(200).json({ success: true, message: "Request was created" })
  }).catch((error) => {
    res.status(500).json({ success: false, message: "Creating Request failed", error: error.message })
  })
}


//view Request
exports.viewRequest = async (req, res) => {
    let studentID = req.params.id;
    let staffID = req.params.id;
  
    try {
      //find Request by student id
      const request = await Request.find({ $or: [{ studentID }, { staffID }] }).populate(
        { path: 'studentID staffID', select: ['firstname', 'lastname', 'name',  'title','reg'] });
      //success message
      res.status(200).json({ success: true, result: request })
      
    } catch (error) {
      //error message
      res.status(500).json({ message: "fetching Request failed", error: error.message })
    }
}

//view one Request
exports.viewOneRequest = async (req, res) => {
  let requestID = req.params.id;

    await Request.findById(requestID).populate(
      { path: 'studentID staffID', select: ['firstname', 'lastname', 'name',  'title','reg'] }).then((request) => {
        res.status(200).json({success: true, result:request});
    }).catch((error) =>{
        res.status(500).json({success:false, status: "Fetching Request failed", error: error.message });
    })
}




