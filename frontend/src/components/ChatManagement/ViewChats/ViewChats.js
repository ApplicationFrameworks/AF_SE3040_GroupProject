import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { orange, red, blue, green } from '@material-ui/core/colors';
//import './ViewResearchSubmissions.css'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ViewChats() {

    // const[group,setGroup]=useState("");
    // const[topic,setTopic]=useState("");
    // const[leader,setLeader]=useState(""); 
    // const[message,setMessage]=useState("");
    // const[reply,setReply]=useState(""); 
    const [chat, setChats] = useState([])
    const history = useHistory()
    const location = useLocation()

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    async function getAllChats() {
      axios.get(`http://localhost:8070/chatmsg/getchats`).then((res) => {
        setChats(res.data)
      }).catch((error) => {
        alert("Failed to fetch data")
      })
    }

    getAllChats();
  }, [location])



  function filterContent(data, searchTerm) {
    const result = data.filter((chat) =>
    chat.group.toLowerCase().includes(searchTerm)
    )
    setChats(result)
  }


  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/researchdoc/getchats`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch data")
    })
  }

  function view(id) {
    history.push(`/onechat/${id}`)
  }

//   function add(id) {
//     history.push(`/createchat`)
//   }


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
          <div className="px-3 search" align="right" style={{top:'40px',position:'relative'}}>
            <input style={{color:"black",fontWeight:"500",borderRadius:"8px",border:"2px solid grey",padding:'6px 83px'}}
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              onChange={handleSearchAll}
              required
            /><div style={{position:'relative',right:'25px',top:'-35px'}}><SearchIcon/></div>
          </div>
        </div>
      </div>

      <div className="productGrid"  >
        {chat.map((Chat, key) => (
          <div key={key}>
              <div className="p-3" style={{overflowX:'auto'}}>
                <table>
                  <tbody>
                  <tr>
                <td style={{width:600}}>{Chat.topic}</td>
                <td style={{width:260}}>{Chat.group}</td>
                <td style={{width:300}}>{Chat.leader}</td>
                <td style={{width:300}}>{Chat.message}</td>
                <td style={{width:300}}>{Chat.reply}</td>
                <td><button className="btn btn-primary" onClick={() => view(Chat._id)}>View Message</button>&nbsp;&nbsp;</td>
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

export default ViewChats