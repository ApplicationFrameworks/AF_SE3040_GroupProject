import { useState } from "react";
import axios from "axios";
import "./MarksSubmission.css";
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function EvaluationMarks() {
  const [group, setGroup] = useState("");
  const [topic, setTopic] = useState("");
  const [marks, setMarks] = useState("");

  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState("");

  //Handling the pdf uploading
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  //Display a preview of uploaded pdf
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  async function add(event) {
    event.preventDefault();
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    let url;

    if (previewSource) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "evaluationMarks");

      try {
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/movie-reservation/image/upload",
            formData
          )
          .then((res) => {
            url = res.data.secure_url;
          });
      } catch (error) {
        alert(error);
      }
    }

    const newEvaluationMarks = { group, topic, marks, url };

    try {
      await axios.post(
        "http://localhost:8070/evaluationMarks/add",
        newEvaluationMarks,
        config
      );
      alert("Evaluation Marks Added Successfully");
      event.target.reset();
    } catch (error) {
      alert("Evaluation Marks can't be Added");
    }
  }

  return (
    <div>
      <div style={{ width: "1000px", height: "600px" }}>
        <div className="container" align="center">
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "black",
              marginTop: "120px",
              marginLeft: "400px",
            }}
          >
            EVALUATION MARKS
          </h2>
          <div className="row">
            <div className="col-12">
              <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between"></div>
            </div>
          </div>
          <br></br>
          <div className="create_pdf">
            <form onSubmit={add} className="addmarks">
              <div className="box-cover1">
                <div className="pdfIcon">
                  <img
                    src={require("./pdf.png")}
                    style={{
                      height: "110px",
                      marginTop: "10px",
                      marginLeft: "90px",
                    }}
                  ></img>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <br />

                    <div className="col-8 d-flex justify-content-center">
                      <div>
                        {previewSource ? (
                          <img className="previewImgsub" />
                        ) : (
                          <img className="previewImgsub" />
                        )}
                        <div className="form-group17">
                          <label htmlFor="profilepic">
                            <input
                              style={{ display: "none" }}
                              id="profilepic"
                              name="profilepic"
                              type="file"
                              accept=".pdf"
                              onChange={handleFileInputChange}
                              value={fileInputState}
                            />
                            <Button
                              color="primary"
                              variant="contained"
                              component="span"
                              className="uploadBtn"
                              style={{
                                padding: "10px 20px",
                                fontWeight: "600",
                                fontSize: "15px",
                              }}
                            >
                              <FileUploadOutlinedIcon /> &nbsp; Upload PDF
                            </Button>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="label18">Group Id :</label>
                      <br />
                      <div className="col-md-7 mb-4">
                        <div className="form-group18">
                          <OutlinedInput
                            type="group"
                            id="group"
                            placeholder="Group ID"
                            required
                            fullWidth
                            onChange={(e) => setGroup(e.target.value)}
                            inputProps={{ style: { padding: 13 } }}
                          />
                        </div>
                      </div>

                      <label className="label18">Topic :</label>
                      <br />
                      <div className="col-md-7 mb-4">
                        <div className="form-group18">
                          <OutlinedInput
                            type="topic"
                            id="topic"
                            placeholder="Topic"
                            required
                            fullWidth
                            onChange={(e) => setTopic(e.target.value)}
                            inputProps={{ style: { padding: 13 } }}
                          />
                        </div>
                      </div>

                      <label className="label18">Marks :</label>
                      <br />
                      <div className="col-md-7 mb-4">
                        <div className="form-group18">
                          <OutlinedInput
                            type="marks"
                            id="marks"
                            placeholder="Marks"
                            required
                            fullWidth
                            onChange={(e) => setMarks(e.target.value)}
                            inputProps={{ style: { padding: 13 } }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group19">
                  <input
                    className="btn"
                    type="submit"
                    value="Submit"
                    style={{
                      padding: "10px 50px",
                      borderRadius: "10px",
                      background: "orange",
                      border: "2px solid blue",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "18px",
                      marginTop: "10px",
                      marginLeft: "110px",
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationMarks;
