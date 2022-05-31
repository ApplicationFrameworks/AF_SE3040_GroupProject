import { useState } from "react";
import axios from "axios";
import "./MarkingScheme.css";
import Button from "@material-ui/core/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function MarkingScheme() {
  const [details, setDetails] = useState("");

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
      formData.append("upload_preset", "markingScheme");

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

    const newMarkingScheme = { details, url };

    try {
      await axios.post(
        "http://localhost:8070/markingScheme/add",
        newMarkingScheme,
        config
      );
      alert("MarkingScheme Added Successfully");
      event.target.reset();
    } catch (error) {
      alert("MarkingScheme can't be Added");
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
              marginLeft: "620px"
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MARKING SCHEMA
          </h2>
          <div className="row">
            <div className="col-12">
              <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between"></div>
            </div>
          </div>
          <br></br>
          <div className="create_pdf">
            <form onSubmit={add} className="addpdf">
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <br />

                    <div className="col-8 d-flex justify-content-center">
                      <div>
                          <div className="previewImgsub1">
                              &nbsp;
                          </div>
                        {previewSource ? (
                          <img className="previewImgsub" />
                        ) : (
                          <img className="previewImgsub" />
                        )}
                        <div className="form-group4">
                          <label className="label2">
                            Upload Marking Scheme
                          </label>
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
                      <label className="label1">More Detail :</label>
                      <br />
                      <div className="col-md-10 mb-4">
                        <div className="form-group3">
                          <OutlinedInput
                            type="details"
                            id="details"
                            placeholder="More Details"
                            style={{
                                height:"100px"
                              }}
                            required
                            fullWidth
                            onChange={(e) => setDetails(e.target.value)}
                            inputProps={{ style: { padding: 13 } }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group5">
                  <input
                    className="btn"
                    type="submit"
                    value="Submit"
                    style={{
                      padding: "10px 50px",
                      borderRadius: "10px",
                      background: "orange",
                      border: "2px solid orangered",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "18px",
                      marginTop:"100px",
                      marginLeft:"220px"
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

export default MarkingScheme;
