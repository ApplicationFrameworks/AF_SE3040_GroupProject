const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Group = require('../models/Group');
const sendEmail = require("../utils/sendEmail");


//Group Register controller
exports.groupRegistration = async (req, res) => {
    const {
        leaderName,
        leaderItNo,
        leaderEmail,
        firstMemberName,
        firstMemberItNo,
        firstMemberEmail,
        secondMemberName,
        secondMemberItNo,
        secondMemberEmail,
        thirdMemberName,
        thirdMemberItNo,
        thirdMemberEmail
    } = req.body;

    try {

        //creating a new group
        const group = await Group.create({leaderName,
            leaderItNo,
            leaderEmail,
            firstMemberName,
            firstMemberItNo,
            firstMemberEmail,
            secondMemberName,
            secondMemberItNo,
            secondMemberEmail,
            thirdMemberName,
            thirdMemberItNo,
            thirdMemberEmail});


    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//update Group controller
exports.updateGroup = async (req, res) => {
    let groupID = req.params.id;

    const {leaderName,leaderItNo,
        leaderEmail,
        firstMemberName,
        firstMemberItNo,
        firstMemberEmail,
        secondMemberName,
        secondMemberItNo,
        secondMemberEmail,
        thirdMemberName,
        thirdMemberItNo,
        thirdMemberEmail} = req.body;

    //object with provided data
    const updateGroup = {
        leaderName,leaderItNo,
        leaderEmail,
        firstMemberName,
        firstMemberItNo,
        firstMemberEmail,
        secondMemberName,
        secondMemberItNo,
        secondMemberEmail,
        thirdMemberName,
        thirdMemberItNo,
        thirdMemberEmail
    }

    try {
        //find student by studentID and update the student with provided data
        await Group.findByIdAndUpdate(groupID, updateGroup);

        //sending the status message successful
        res.status(200).json({success: true, message: "Group updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//delete group controller
exports.deleteGroup = async (req, res) => {
    let groupID = req.params.id;

    try {
        //find Student by StudentID and delete it
        await Group.findByIdAndDelete(groupID);

        //sending the status message successful
        res.status(200).json({success: true, message: "Group deleted"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}


//fetch group controller
exports.fetchAll = async (req, res) => {

    try {
        //find all groups in the database
        const groups = await Group.find();

        res.status(200).json({success: true, result: groups})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}

//fetch one group controller
exports.fetchOne = async (req, res) => {
    let groupID = req.params.id;

    try {
        //find group with the specific id
        const group = await Group.findById(groupID);

        res.status(200).json({success: true, result: group})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}