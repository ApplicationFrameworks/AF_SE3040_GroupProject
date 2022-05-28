const Video = require("../models/Video.js");

//add new Video
exports.addVideo = async (req, res) => {
 
//constant variables for the attributes
const {group,topic,leader,details,url} = req.body;
 
//object
const newVideo= new Video({
    group,
    topic,
    leader,
    details,
    url
  })
 
//saving the object to the db 
newVideo.save().then(() => {
    res.status(200).json({ status: "New Video Added" });
  }).catch((error) => {
    res.status(500).json({message:"Fail to Add Video",error:error.message})
  })
}

//Delete existing Video
exports.deleteVideo = async (req, res) => {
  let videoId = req.params.id;
 
  await Video.findByIdAndDelete(videoId).then(() => {
    res.status(200).json({ status: "Video Deleted" });
  }).catch((error) => {
    res.status(500).json({ status: "Error with Deleting Video", error: error.message });
  })
}
 
//update Video
exports.updateVideo = async (req, res) => { 
  //fetch id from url
  let videoId = req.params.id;
 
  const {group,topic,leader,details,url} = req.body;
 
  const updateVideo = {
    group,topic,leader,details,url 
  }

//check whether there's a video for the ID
  try {
    await Video.findByIdAndUpdate(videoId, updateProduct);

//sending the successful status
    res.status(200).json({ success: true, message: "Video Updated" })
  } catch (error) {
    res.status(500).json({ message: "Error with Updating Video", error: error.message });
  }
}

//View Video
exports.viewAllVideo = async (req, res) => { 
 
//calling Video model
Video.find().then((document) => {
    res.status(200).json(document)
  }).catch((error) => {
    res.status(500).json({ message: "Error with fetching Video", error: error.message });
  })
}
 


//View one Video
exports.viewOneVideo = async (req, res) => {
  let videoId = req.params.id;

  await Video.findById(videoId).then((document) => {
    res.status(200).json({ status: "Video fetched", document });
  }).catch((error) => {
    res.status(500).json({ status: "Error with fetching Video", error: error.message });
  })
}