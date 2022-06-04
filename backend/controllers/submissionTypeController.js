const SubmissionType = require("../models/SubmissionType");

//add new Submission
exports.addSubmissionType = async (req, res) => {
 
  //constant variables for the attributes
  const {weekName,subName,details} = req.body;
 
  //object
  const newSubmissionType= new SubmissionType({
    weekName,
    subName,
    details
  })
 
  //saving the object to the db 
  newSubmissionType.save().then(() => {
    res.status(200).json({ status: "New SubmissionType Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add SubmissionType",error:error.message})
  })
}

//delete existing SubmissionType
exports.deleteSubmissionType = async (req, res) => {
  let SubmissionTypeId = req.params.id;
 
  await SubmissionType.findByIdAndDelete(SubmissionTypeId).then(() => {
    res.status(200).json({ status: "SubmissionType Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting SubmissionType", error: error.message });
  })
}
 
//update SubmissionType
exports.updateSubmissionType = async (req, res) => { 
  //fetch id from url
  let SubmissionTypeId = req.params.id;
 
  const {weekName,subName,details} = req.body;
 
  const updateSubmissionType = {
    weekName,
    subName,
    details
  }

  //check whether there's a SubmissionType for the ID
  try {
    await SubmissionType.findByIdAndUpdate(SubmissionTypeId, updateProduct);

    //sending the successful status
    res.status(200).json({ success: true, message: "SubmissionType Updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with Updating SubmissionType", error: error.message });
  }
}

//view SubmissionType
exports.viewAllSubmissionType = async (req, res) => { 
 
  //calling SubmissionType model
  SubmissionType.find().then((document) => {
    res.status(200).json(document)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching SubmissionType", error: error.message });
  })
}
 


//view one SubmissionType
exports.viewOneSubmissionType = async (req, res) => {
  let SubmissionTypeId = req.params.id;

  await SubmissionType.findById(SubmissionTypeId).then((document) => {
    res.status(200).json({ status: "SubmissionType fetched", document });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching SubmissionType", error: error.message });
  })
}