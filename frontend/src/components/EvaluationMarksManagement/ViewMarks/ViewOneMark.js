import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { orange, blue, red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Button from "@material-ui/core/Button";
import "./ViewOneMark.css";


function ViewOneMark(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [id, setId] = useState("");
  const [topic, setTopic] = useState("");
  const [group, setGroup] = useState("");
  const [leader, setLeader] = useState("");
  const [details, setDetails] = useState("");
  const [marks, setMarks] = useState("");
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
    async function getMarksDetails() {
      axios
        .get(
          `http://localhost:8070/evaluationMarks/one/${props.match.params.id}`
        )
        .then((res) => {
          setId(res.data.document._id);
          setTopic(res.data.document.topic);
          setGroup(res.data.document.group);
          setDetails(res.data.document.details);
          setLeader(res.data.document.leader);
          setMarks(res.data.document.marks);
          setUrl(res.data.document.url);
        })
        .catch((err) => {
          alert("Failed to Fetch Marks");
        });
    }
    getMarksDetails();
  }, [props]);

  function Pdf(url) {
    window.open(url);
  }

  return (
    <div style={{ width: "1000px", height: "550px" }}>
      <div
        className="container"
        align="center"
        style={{ position: "absolute", left: "20px" }}
      >
        <div className="detailProductCard12">
          <div className="detailProduct">
            <div className="box-detailProduct">
              <div className="row8">
                <div className="box-cover"></div>
                <h2 className="details1">Group Id : </h2>
                <h2 className="detailsdis1"> {group}</h2>
                <h2 className="details1">Topic : </h2>
                <h2 className="detailsdis1"> {topic}</h2>
                <h2 className="details1">Marks : </h2>
                <h2 className="detailsdis1"> {marks}</h2>
                <br />
                <br />
                <div
                  className="vidIcon"
                  style={{
                    position: "relative",
                    left: "800px",
                    top: "-320px",
                    height: "150px",
                    width: "150px",
                  }}
                >
                  <img src={require("./pdf1.png")}></img>
                </div>
                <Button
                  onClick={() => Pdf(`${url}`)}
                  color="primary"
                  variant="contained"
                  component="span"
                  className="dBtn1"
                  style={{
                    padding: "10px 40px",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  View
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

export default ViewOneMark;
