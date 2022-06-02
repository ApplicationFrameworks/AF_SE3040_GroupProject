const MarkingScheme = require("../models/MarkingScheme");

//add new doc
exports.addMarkingScheme = async (req, res) => {
 
  //constant variables for the attributes
  const {details,url} = req.body;
 
  //object
  const newMarkingScheme= new MarkingScheme({
    details,
    url
  })
 
  //saving the object to the db 
  newMarkingScheme.save().then(() => {
    res.status(200).json({ status: "New MarkingScheme Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add MarkingScheme",error:error.message})
  })
}

//delete existing MarkingScheme
exports.deleteMarkingScheme = async (req, res) => {
  let MarkingSchemeId = req.params.id;
 
  await MarkingScheme.findByIdAndDelete(MarkingSchemeId).then(() => {
    res.status(200).json({ status: "MarkingScheme Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting MarkingScheme", error: error.message });
  })
}
 
//update MarkingScheme
exports.updateMarkingScheme = async (req, res) => { 
  //fetch id from url
  let MarkingSchemeId = req.params.id;
 
  const {details,url} = req.body;
 
  const updateMarkingScheme = {
    details,url 
  }

  //check whether there's a MarkingScheme for the ID
  try {
    await MarkingScheme.findByIdAndUpdate(MarkingSchemeId, updateProduct);

    //sending the successful status
    res.status(200).json({ success: true, message: "MarkingScheme Updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with Updating MarkingScheme", error: error.message });
  }
}

//view MarkingScheme
exports.viewAllMarkingScheme = async (req, res) => { 
 
  //calling MarkingScheme model
  MarkingScheme.find().then((document) => {
    res.status(200).json(document)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Product", error: error.message });
  })
}
 


//view one MarkingScheme
exports.viewOneMarkingScheme = async (req, res) => {
  let MarkingSchemeId = req.params.id;

  await MarkingScheme.findById(MarkingSchemeId).then((document) => {
    res.status(200).json({ status: "MarkingScheme fetched", document });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching MarkingScheme", error: error.message });
  })
}