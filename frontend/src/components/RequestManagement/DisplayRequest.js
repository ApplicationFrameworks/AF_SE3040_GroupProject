import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { blue, red, orange ,black} from '@mui/material/colors'
import SearchIcon from '@mui/icons-material/Search';
import './Request.css'


function ViewRequest() {

    const [requests, setRequests] = useState([])
    const history = useHistory()
    const location = useLocation()

    const [isStaff, setIsStaff] = useState(false)
    const [user, setUser] = useState("");


    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {

        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("staffAuthToken")) {
            setIsStaff(true)
        }



        async function getViewRequests() {
            axios.get('http://localhost:8070/request/show').then((res) => {
                setRequests(res.data)
            }).catch((error) => {
                alert("Failed to fetch Requests")
            })
        }
        getViewRequests()
    }, [location])

    async function deleteRequest(id) {
        await axios.delete(`http://localhost:8070/request/delete/${id}`, config).then(() => {
            alert("Cancel Request")
            history.push('/request/allrequest/')
        }).catch((error) => {
            alert(`Cancellation Failed\n${error.message}`)
        })
    }

  

    

    

    
  function filterContent(data, searchTerm) {
    const result = data.filter((request) =>
      request.group.toLowerCase().includes(searchTerm)||
      request.supervisour.toLowerCase().includes(searchTerm)
    )
    setRequests(result)
  }


  function handleSearchAll(event) {
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/request/show`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch documents")
    })
  }

  const setData = async (rstatus, id) => {

    const value = {
        rstatus,
    };

    await axios
        .put(`http://localhost:8070/request/show/${id}`, value)
        .then(() => {
            alert(`Topic is ${rstatus}ed`);
            window.location.reload(false);
        })
        .catch((err) => {
            alert(`Something went to wrong !!!`);
        });
};

const setEvaluate = async (rstatus, id) => {

    const value = {
        rstatus,
    };

    await axios
        .put(`http://localhost:8070/request/show/${id}`, value)
        .then(() => {
            alert(`Topic is ${rstatus}ed`);
            window.location.reload(false);
        })
        .catch((err) => {
            alert(`Something went to wrong !!!`);
        });
};

   
    
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                </div>
            </div>
            <div className="col-5">
                <div className="requestGrid"  >
                    <div className="px-3 search" align="right" style={{top:'50px',position:'relative',right:'-170px'}}>
                        <input style={{color:"black",fontWeight:"500",borderRadius:"8px",border:"2px solid grey",padding:'6px 123px'}}
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search appointments"
                            onChange={handleSearchAll}
                            required
                        /><div style={{position:'relative',right:'520px',top:'-32px'}}><SearchIcon/></div>
                    </div>
                    {requests.map((Request, key) => (
                        <div key={key}>
                            <div>
                            <div className='RequestCard' style={{width:1550,height:'auto',left:-120,position:'relative',top:60}}>
                                <div className='p-3' style={{overflowX:'auto',width:1550}}>
                                    <table >
                                        <tbody>
                                            <tr>
                                                <td><h6 style={{ color: black, fontSize: 17,width:180}}>{Request.group}</h6></td>
                                                <td> <h6 style={{ color: black, fontSize: 17,width:190 }}>{Request.supervisour}</h6></td>
                                                <td> <h6 style={{ color: black, fontSize: 17,width:380}}>{Request.subject}</h6></td>
                                                <td> <h6 style={{ color: blue, fontSize: 17 ,width:400,fontWeight:480}}>{Request.msg}</h6></td>
                                                <td> <h6 style={{ color: black, fontSize: 17,width:150 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Request.rstatus}</h6></td>


                                                <div align="center">
                                                    <div style={{width:200,marginTop:40}}>
                                                        {isStaff === true ?
                                                            <div>
                                                                <button
                                                        className="btn btn-success"
                                                        disabled={
                                                            Request.rstatus === "Approved" 
                                                        }
                                                        onClick={() => setData("Approved", Request._id)}
                                                    >
                                                        &nbsp;Approve
                                                    </button>

                                                    &nbsp;&nbsp;&nbsp;
                                                    <button
                                                        class="btn btn-info"
                                                        disabled={
                                                            Request.rstatus === "Rejected" 
                                                        }
                                                        onClick={() => setEvaluate("Rejected", Request._id)}
                                                    >
                                                        &nbsp;Reject
                                                    </button>
                                                            </div>
                                                            :
                                                            <div>
                                                                <button className='cancelBtn' style={{ backgroundColor: orange[500] }} onClick={() => deleteRequest(Request._id)}> Cancel </button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div></div>
            </div>
            <br></br>
        </div>
    )
}

export default ViewRequest