import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import { orange,red,blue,green } from '@material-ui/core/colors';
import './ViewSubmissions.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function ViewSubmissions() {

  const [document, setDocuments] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => { 
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    async function getAllDocuments() {
      axios.get(`http://localhost:8070/tdoc`).then((res) => {
        setDocuments(res.data)  
      }).catch((error) => {
        alert("Failed to fetch document")
      })
    }

      getAllDocuments();
  }, [location])

  
  
  function filterContent(data, searchTerm){
    const result = data.filter((product) => 
        product.group.toLowerCase().includes(searchTerm) 
    )
    setDocuments(result)
  }


  function handleSearchAll(event){
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/tdoc`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch documents")
    })
  }

function view(id) {
  history.push(`/tdocView/${id}`)
}

  
    return (
        <div className="container">
          <div className="row">
              <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                </div>
              </div>
              <div className="col-3">
              </div>
              <div className="col-5">
                <div className="px-3 search" align="right">
                  <input 
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Search" 
                    onChange={handleSearchAll} 
                    required 
                  />
                </div>
          </div>
        </div>
        <div className="productGrid"  > 
          {document.map((Document,key)=>( 
                <div key={key}> 
                    <div className="productCard" >
                        <div className="p-3">
                            <h7>{Document.topic}</h7>
                            <h6>{Document.leader}</h6>
                            <h6>{Document.group}</h6>
                            <div>

<IconButton>
    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center'}} ></PictureAsPdfIcon>
</IconButton>
</div>
                            <div align="right">
                              <span> 
                                  <button className="productBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Document._id)}> View Item </button>
                              </span> 
                            </div>
                        </div>
                    </div>
                </div>
          ))} 
        </div>
      </div>
    )      
}

export default ViewSubmissions
