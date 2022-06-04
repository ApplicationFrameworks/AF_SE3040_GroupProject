import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { orange, red, blue, green } from '@material-ui/core/colors';
import './ViewResearchSubmissions.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ViewResearchSubmissions() {

  const [document, setDocuments] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    async function getAllDocuments() {
      axios.get(`http://localhost:8070/researchdoc`).then((res) => {
        setDocuments(res.data)
      }).catch((error) => {
        alert("Failed to fetch research document")
      })
    }

    getAllDocuments();
  }, [location])



  function filterContent(data, searchTerm) {
    const result = data.filter((product) =>
      product.group.toLowerCase().includes(searchTerm)
    )
    setDocuments(result)
  }


  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/researchdoc`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch documents")
    })
  }

  function view(id) {
    history.push(`/researchdocView/${id}`)
  }

  function add(id) {
    history.push(`/researchdocAdd`)
  }


  return (
    <div className="container">
        
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Research Documents Submission</h2>
                </div>
            </div>
        
        <br></br>
      <div align='center'>
        <div className="col-5">
        
          
        </div>
        </div>
<br/>
        <span>
        <button className="productBtn" style={{ backgroundColor: orange[400],fontSize:'19px',padding:'7px 30px' ,borderRadius:'10px',border:'2px solid orange',position:'relative',top:'-28px'}} onClick={() => add()}><AddIcon/> Add Submission</button>
      </span>
      <div className="productGrid"  >
        {document.map((Document, key) => (
          <div key={key}>
              <div className="p-3" style={{overflowX:'auto'}}>
                <table>
                  <tbody>
                  <tr>
                <td style={{width:600}}>{Document.topic}</td>
                <td style={{width:260}}>{Document.group}</td>
                <td style={{width:300}}>{Document.leader}</td>
               
                <td style={{width:120}}>

                  <IconButton>
                    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center' }} ></PictureAsPdfIcon>
                  </IconButton>
                </td>
                  <td>
                  <span>
                    <MoreHorizIcon style={{ color: orange[900] ,cursor:'pointer'}} onClick={() => view(Document._id)}/>
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
  )
}

export default ViewResearchSubmissions
