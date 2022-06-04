import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { orange, red, blue, green } from "@material-ui/core/colors";
import "./ViewMarks.css";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function ViewMarks() {
  const [document, setDocuments] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }

    async function getAllMarks() {
      axios
        .get(`http://localhost:8070/evaluationMarks`)
        .then((res) => {
          setDocuments(res.data);
        })
        .catch((error) => {
          alert("Failed to fetch marks");
        });
    }

    getAllMarks();
  }, [location]);

  function filterContent(data, searchTerm) {
    const result = data.filter((product) =>
      product.group.toLowerCase().includes(searchTerm)
    );
    setDocuments(result);
  }

  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value;
    axios
      .get(`http://localhost:8070/evaluationMarks`)
      .then((res) => {
        filterContent(res.data, searchTerm.toLowerCase());
      })
      .catch((error) => {
        alert("Failed to fetch video");
      });
  }

  function view(id) {
    history.push(`/evaluationMarksView/${id}`);
  }

  return (
    <div className="container5">
      <h2 className="textMarks">Marks</h2>
      <div className="row">
        <div className="col-4">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between"></div>
        </div>
        <div className="col-3"></div>
        <div className="col-5"></div>
      </div>

      <div className="productGrid">
        {document.map((Document, key) => (
          <div key={key}>
            <div className="p-3" style={{ overflowX: "auto" }}>
              <table>
                <tbody>
                  <tr className="tableRow">
                    <td className="tableData" style={{ width: 400 }}>
                      {Document.group}
                    </td>
                    <td className="tableData" style={{ width: 900 }}>
                      {Document.topic}
                    </td>
                    <td>
                      <span>
                        <IconButton>
                          <h5
                            style={{
                              cursor: "pointer",
                              color: "red",
                              width: 150,
                            }}
                            onClick={() => view(Document._id)}
                          >
                            View Marks
                          </h5>
                        </IconButton>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMarks;
