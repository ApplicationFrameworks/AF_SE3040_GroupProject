const Document = require("../models/Document");

//add new doc
exports.addDocument = async (req, res) => {
 
  //constant variables for the attributes
  const {group,topic,leader,details,url} = req.body;
 
  //object
  const newDocument= new Document({
    group,
    topic,
    leader,
    details,
    url
  })
 
  //saving the object to the db 
  newDocument.save().then(() => {
    res.status(200).json({ status: "New Documents Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add Item",error:error.message})
  })
}

//delete existing document
exports.deleteDocument = async (req, res) => {
  let documentId = req.params.id;
 
  await Document.findByIdAndDelete(documentId).then(() => {
    res.status(200).json({ status: "Document Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting Document", error: error.message });
  })
}
 
//update Document
exports.updateDocument = async (req, res) => { 
  //fetch id from url
  let documentId = req.params.id;
 
  const {group,topic,leader,details,url} = req.body;
 
  const updateDocument = {
    group,topic,leader,details,url 
  }

  //check whether there's a document for the ID
  try {
    await Document.findByIdAndUpdate(documentId, updateProduct);

    //sending the successful status
    res.status(200).json({ success: true, message: "Document Updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with Updating Document", error: error.message });
  }
}

//view Document
exports.viewAllDocument = async (req, res) => { 
 
  //calling Document model
  Document.find().then((document) => {
    res.status(200).json(document)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Product", error: error.message });
  })
}
 


//view one Document
exports.viewOneDocument = async (req, res) => {
  let documentId = req.params.id;

  await Document.findById(documentId).then((document) => {
    res.status(200).json({ status: "Document fetched", document });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching document", error: error.message });
  })
}