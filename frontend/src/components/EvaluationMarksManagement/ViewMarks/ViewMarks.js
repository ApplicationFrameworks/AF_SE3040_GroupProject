import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { orange, red, blue, green } from "@material-ui/core/colors";
import "./ViewMarks.css";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

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
        <div className="col-5">
          {/* Search function disabled*/}
          {/* <div className="px-3 search" align="right" style={{top:'40px',position:'relative',right:'460px'}}>
            <input style={{color:"black",fontWeight:"500",borderRadius:"8px",border:"2px solid grey",padding:'6px 123px'}}
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              onChange={handleSearchAll}
              required
            /><div style={{position:'relative',right:'510px',top:'-35px'}}><SearchIcon/></div>
          </div> */}
        </div>
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
                    <td className="tableData" style={{ width: 1100 }}>
                      {Document.topic}
                    </td>
                    <td className="tableData" style={{ width: 200 }}>
                      {Document.marks} Marks
                    </td>

                    <td style={{ width: 150 }}>
                      <PictureAsPdfIcon
                        style={{
                          color: red[800],
                          backgroundPosition: "center",
                        }}
                      ></PictureAsPdfIcon>
                    </td>
                    <td>
                      <span>
                        <IconButton>
                          <h5
                            style={{ cursor: "pointer" }}
                            onClick={() => view(Document._id)}
                          >
                            view
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
