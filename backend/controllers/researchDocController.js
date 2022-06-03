const ResearchDocument = require("../models/researchDocModel");

//add new doc
exports.addDocument = async (req, res) => {
 
  //constant variables for the attributes
  const {group,topic,leader,url} = req.body;
 
  //object
  const newResearchDocument= new ResearchDocument({
    group,
    topic,
    leader,
    url
  })
 
  //saving the object to the db 
  newResearchDocument.save().then(() => {
    res.status(200).json({ status: "New Research Documents Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add Document",error:error.message})
  })
}

// //delete existing document
// exports.deleteDocument = async (req, res) => {
//   let documentId = req.params.id;
 
//   await ResearchDocument.findByIdAndDelete(documentId).then(() => {
//     res.status(200).json({ status: "Document Deleted" });
//   }).catch((error) => {
//     res.status(500).json({ status: "Error with Deleting Document", error: error.message });
//   })
// }
 
// //update Document
// exports.updateDocument = async (req, res) => { 
//   //fetch id from url
//   let documentId = req.params.id;
 
//   const {group,topic,leader,url} = req.body;
 
//   const updateDocument = {
//     group,topic,leader,url 
//   }

//   //check whether there's a document for the ID
//   try {
//     await ResearchDocument.findByIdAndUpdate(documentId, updateProduct);

//     //sending the successful status
//     res.status(200).json({ success: true, message: "Document Updated" })
//   } catch (error) {
//     res.status(500).json({ message: "Error with Updating Document", error: error.message });
//   }
// }

// //view Document
// exports.viewAllDocument = async (req, res) => { 
 
//   //calling Document model
//   ResearchDocument.find().then((document) => {
//     res.status(200).json(document)
//   }).catch((error) => {
//     res.status(500).json({ message: "Error with fetching Product", error: error.message });
//   })
// }
 


// //view one Document
// exports.viewOneDocument = async (req, res) => {
//   let documentId = req.params.id;

//   await ResearchDocument.findById(documentId).then((document) => {
//     res.status(200).json({ status: "Document fetched", document });
//   }).catch((error) => {
//     res.status(500).json({ status: "Error with fetching document", error: error.message });
//   })
// }