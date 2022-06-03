import { useState } from "react";
import axios from "axios";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function SubmissionType() {
  const [weekName, setWeekName] = useState("");
  const [subName, setSubName] = useState("");
  const [details, setDetails] = useState("");

  const [previewSource, setPreviewSource] = useState();

  //Handling the pdf uploading
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(event.target.value);
  };

  async function add(event) {
    event.preventDefault();
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const newsubmissionType = { weekName, subName, details };

    try {
      await axios.post(
        "http://localhost:8070/submissionType/add",
        newsubmissionType,
        config
      );
      alert("SubmissionType Added Successfully");
      event.target.reset();
    } catch (error) {
      alert("SubmissionType can't be Added");
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
              marginLeft: "640px",
            }}
          >
            ADD SUBMISSION TYPES
          </h2>
          <div className="row">
            <div className="col-12">
              <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between"></div>
            </div>
          </div>
          <br></br>
          <div className="create_pdf">
            <form
              onSubmit={add}
              className="addsubType"
              style={{
                width: "120%",
                height: "520px",
                background: "#fff",
                boxShadow: "0px 24px 48px 0 rgba(0, 0, 0, 0.4)",
                position: "realative",
                borderLeft: "10px solid orange",
                marginLeft: "290px",
                marginTop: "50px",
              }}
            >
              <div className="box-cover12">
                <div className="pdfIcon">
                  <img
                    src={require("./Submission.png")}
                    style={{
                      height: "150px",
                      marginTop: "130px",
                      marginLeft: "230px",
                      position: "absolute"
                    }}
                  ></img>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <br />

                    {/* <div className="col-8 d-flex justify-content-center">
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
                    </div> */}

                    <div>
                      <label
                        className="label18"
                        style={{
                          left: "-200px",
                          top: "80px",
                        }}
                      >
                        Week :
                      </label>
                      <br />
                      <div className="col-md-7 mb-4">
                        <div
                          className="form-group18"
                          style={{
                            position: "relative",
                            left: "30px",
                            top: "100px",
                          }}
                        >
                          <OutlinedInput
                            type="group"
                            id="weekName"
                            placeholder="Week"
                            required
                            fullWidth
                            onChange={(e) => setWeekName(e.target.value)}
                            inputProps={{ style: { padding: 13 } }}
                          />
                        </div>
                      </div>

                      <label className="label18"
                      style={{
                        left: "-150px",
                        top: "80px",
                      }}>Submission Name :</label>
                      <br />
                      <div className="col-md-7 mb-4">
                        <div className="form-group18"
                        style={{
                            position: "relative",
                            left: "30px",
                            top: "100px",
                          }}>
                          <OutlinedInput
                            type="subName"
                            id="subName"
                            placeholder="submission Name"
                            required
                            fullWidth
                            onChange={(e) => setSubName(e.target.value)}
                            inputProps={{ style: { padding: 13 } }}
                          />
                        </div>
                      </div>

                      <label className="label18" 
                      style={{
                        left: "-190px",
                        top: "80px",
                      }}>Details :</label>
                      <br />
                      <div className="col-md-7 mb-4">
                        <div className="form-group18"
                        style={{
                            position: "relative",
                            left: "30px",
                            top: "100px",
                          }}>
                          <OutlinedInput
                            type="details"
                            id="details"
                            placeholder="Details"
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
                      marginTop: "-10px",
                      marginLeft: "-120px",
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

export default SubmissionType;
