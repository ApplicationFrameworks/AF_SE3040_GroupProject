const EvaluationMarks = require("../models/EvaluationMarks");

//add new doc
exports.addEvaluationMarks = async (req, res) => {
  //constant variables for the attributes
  const { group, topic, marks, url } = req.body;

  //object
  const newEvaluationMarks = new EvaluationMarks({
    group,
    topic,
    marks,
    url,
  });

  //saving the object to the db
  newEvaluationMarks
    .save()
    .then(() => {
      res.status(200).json({ status: "EvaluationMarks Added" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Fail to Add EvaluationMarks", error: error.message });
    });
};

//view EvaluationMarks
exports.viewAllEvaluationMarks = async (req, res) => {
  //calling EvaluationMarks model
  EvaluationMarks.find()
    .then((document) => {
      res.status(200).json(document);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error with fetching EvaluationMarks", error: error.message });
    });
};

//view one EvaluationMarks
exports.viewOneEvaluationMarks = async (req, res) => {
  let EvaluationMarksId = req.params.id;

  await EvaluationMarks.findById(EvaluationMarksId)
    .then((document) => {
      res.status(200).json({ status: "EvaluationMarks fetched", document });
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          status: "Error with fetching EvaluationMarks",
          error: error.message,
        });
    });
};
