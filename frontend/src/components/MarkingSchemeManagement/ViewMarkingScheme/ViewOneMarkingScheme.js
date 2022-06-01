import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { orange, blue, red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@material-ui/core/Button";
import "./ViewOneMarkingScheme.css";

function ViewOneMarkingScheme(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [id, setId] = useState("");
  const [topic, setTopic] = useState("");
  const [group, setGroup] = useState("");
  const [leader, setLeader] = useState("");
  const [details, setDetails] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();
  const [user, setUser] = useState("");
  const [reply, setReply] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    if (localStorage.getItem("staffAuthToken")) {
      setIsAdmin(true);
    }
    async function getDocumentDetails() {
      axios
        .get(`http://localhost:8070/markingScheme/one/${props.match.params.id}`)
        .then((res) => {
          setId(res.data.document._id);
          setDetails(res.data.document.details);
          setUrl(res.data.document.url);
        })
        .catch((err) => {
          alert("Failed to Fetch Details");
        });
    }
    getDocumentDetails();
  }, [props]);

  function Pdf(url) {
    window.open(url);
  }

  return (
    <div style={{ width: "1000px", height: "560px" }}>
      <div
        className="container"
        align="center"
        style={{ position: "absolute", left: "20px" }}
      >
        <div className="detailProductCard11">
          <div className="detailProduct">
            <div className="box-detailProduct">
              <div className="row8">
                <h2 className="details">Details : </h2>
                <h2 className="detailsdis"> {details}</h2>
                <br />
                <br />
                <IconButton
                  style={{
                    position: "relative",
                    left: "800px",
                    top: "-200px",
                    height: "150px",
                    width: "150px",
                  }}
                >
                  <PictureAsPdfIcon
                    style={{
                      color: red[600],
                      backgroundPosition: "center",
                      height: "150px",
                      width: "150px",
                    }}
                  ></PictureAsPdfIcon>
                </IconButton>
                <Button
                  onClick={() => Pdf(`${url}`)}
                  color="primary"
                  variant="contained"
                  component="span"
                  className="dBtn"
                  style={{
                    padding: "10px 40px",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ViewOneMarkingScheme;
