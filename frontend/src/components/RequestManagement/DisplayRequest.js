import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { blue, red, orange } from '@mui/material/colors'
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

    function view(id) {
        history.push(`/request/update/${id}`)
    }

    function filterContent(data, searchTerm) {
        const result = data.filter((Request) =>
            Request.supervisour.toLowerCase().includes(searchTerm) ||
            Request.group.toLowerCase().includes(searchTerm)
        )
        setRequests(result)
    }

    function handleSearch(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/request/show`).then((res) => {
            filterContent(res.data.result, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Request fetching failed")
        })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                </div>
            </div>
            <div className="col-5">
                <div className="requestGrid"  >
                    <div className="px-3 search">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search appointments"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                    {requests.map((Request, key) => (
                        <div key={key}>
                            <div className='RequestCard'>
                                <div className='p-3' style={{overflowX:'auto',width:1500}}>
                                    <table >
                                        <tbody>
                                            <tr>
                                                <td><h6 style={{ color: red[300], fontSize: 17 }}>{Request.group}</h6></td>
                                                <td> <h6 style={{ color: red[300], fontSize: 17 }}>{Request.supervisour}</h6></td>
                                                <td> <h6 style={{ color: red[300], fontSize: 17 }}>{Request.subject}</h6></td>
                                                <td> <h6 style={{ color: blue[500], fontSize: 17 }}>{Request.msg}</h6></td>



                                                <div align="center">
                                                    <div>
                                                        {isStaff === true ?
                                                            <div>
                                                                <button className='cancelBtn' style={{ backgroundColor: '#2f89fc' }} onClick={() => view(Request._id)}> Edit </button>
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