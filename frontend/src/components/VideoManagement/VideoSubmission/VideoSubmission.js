import { useState } from "react";
import axios from "axios";
import "./VideoSubmission.css";
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function VideoSubmission() {
  const [group, setGroup] = useState("");
  const [topic, setTopic] = useState("");
  const [leader, setLeader] = useState("");
  const [details, setDetails] = useState("");

  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState("");

  //Handling the video uploading
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  //Display a preview of uploaded Video
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
      formData.append("upload_preset", "submissionVideo");

      try {
        await axios
          .post(
            "https://api.cloudinary.com/v1_1/movie-reservation/video/upload",
            formData
          )
          .then((res) => {
            url = res.data.secure_url;
          });
      } catch (error) {
        alert(error);
      }
    }

    const newVideo = { group, topic, leader, details, url };

    try {
      await axios.post(
        "http://localhost:8070/submissionVideo/add",
        newVideo,
        config
      );
      alert("Video Added Successfully");
      event.target.reset();
    } catch (error) {
      alert("Video can't be Added");
    }
  }

  return (
    <div>
      <div style={{ width: "1000px", height: "600px" }}>
        <div className="container" align="center">
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "orange",
              marginTop: "120px",
              marginLeft: "600px",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VIDEO
            SUBMISSION
          </h2>
          <div className="row">
            <div className="col-12">
              <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between"></div>
            </div>
          </div>
          <br></br>
          <div className="create_sub">
            <form onSubmit={add} className="addvid">
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <br />
                    <div>
                      <label className="label10">Group ID</label>
                      <br />
                      <div className="col-md-10 mb-4">
                        <div className="form-group13">
                          <OutlinedInput
                            type="group"
                            id="group"
                            placeholder="Group ID"
                            required
                            fullWidth
                            onChange={(e) => setGroup(e.target.value)}
                            inputProps={{ style: { padding: 12 } }}
                          />
                        </div>
                      </div>

                      <label className="label10">Research Topic</label>
                      <br />
                      <div className="col-md-10 mb-4">
                        <div className="form-group13">
                          <OutlinedInput
                            type="topic"
                            id="topic"
                            placeholder="Your Topic"
                            required
                            fullWidth
                            onChange={(e) => setTopic(e.target.value)}
                            inputProps={{ style: { padding: 12 } }}
                          />
                        </div>
                      </div>

                      <label className="label10">Group Leader</label>
                      <br />
                      <div className="col-md-10 mb-4">
                        <div className="form-group13">
                          <OutlinedInput
                            type="group"
                            id="leader"
                            placeholder="Group Leader"
                            required
                            fullWidth
                            onChange={(e) => setLeader(e.target.value)}
                            inputProps={{ style: { padding: 12 } }}
                          />
                        </div>
                      </div>

                      <label className="label10">Group Details</label>
                      <br />
                      <div className="col-md-10 mb-4">
                        <div className="form-group13">
                          <OutlinedInput
                            type="details"
                            id="details"
                            placeholder="Group Details"
                            required
                            fullWidth
                            onChange={(e) => setDetails(e.target.value)}
                            inputProps={{ style: { padding: 12 } }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-4 d-flex justify-content-center">
                  <div>
                    <div className="previewImgsub2">&nbsp;</div>
                    {previewSource ? (
                      <img className="previewImgsub" />
                    ) : (
                      <img className="previewImgsub" />
                    )}
                    <div className="form-group14">
                      <label className="label12">Upload Video</label>
                      <label htmlFor="profilepic">
                        <input
                          style={{ display: "none" }}
                          id="profilepic"
                          name="profilepic"
                          type="file"
                          accept=".mp4"
                          onChange={handleFileInputChange}
                          value={fileInputState}
                        />
                        <Button
                          color="primary"
                          variant="contained"
                          component="span"
                          className="uploadBtn2"
                          style={{
                            padding: "10px 20px",
                            fontWeight: "600",
                            fontSize: "15px",
                          }}
                        >
                          <FileUploadOutlinedIcon /> &nbsp; Upload Video
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group15">
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
                      marginLeft: "-20px",
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

export default VideoSubmission;
