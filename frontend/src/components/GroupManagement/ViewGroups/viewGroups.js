import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import './viewGroups.css'
import axios from 'axios'
import { red, blue } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';



function DisplayGroups() {

    const [isAdmin, setIsAdmin] = useState(false)
    const [groups, setGroups] = useState([])
    const history = useHistory()
    const location = useLocation()
    const [user, setUser] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        if (localStorage.getItem("adminAuthToken")) {
            setIsAdmin(true)
        }

        async function getAllGroups() {
            axios.get(`http://localhost:8070/groups`).then((res) => {
                setGroups(res.data)
            }).catch((error) => {
                alert("Failed to fetch the groups")
            })
        }

        getAllGroups()
    }, [location, isAdmin])


    function filterContent(data, searchTerm) {
        const result = data.filter((group) =>
            group.leaderItNo.toLowerCase().includes(searchTerm)
        )
        setGroups(result)
    }

    function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value
        axios.get(`http://localhost:8070/groups`).then((res) => {
            filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
            alert("Admin Failed to fetch groups")
        })
    }


    return (
        <div className="container  display_movies"><br /><br />
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 className='h1_displayMovies'>Student Groups List</h2>
                    </div>
                </div>
                <div className="col-5">
                    {isAdmin === true ?
                        <div className="px-3 search search1" align="right">
                            <input style={{ color: 'black' }} className="search1"
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search"
                                onChange={handleSearchAll}
                                required
                            />
                        </div>
                        :
                        <div className="px-3 search search1" align="right">
                        </div>
                    }
                </div>
            </div>
            <div className="productGrid"  >
                {/* {isAdmin &&
                    // <Button className="productBtn " style={{ color: 'black', backgroundColor: '#0000008a', width: 400 }} onClick={() => addMovie()}>
                    //     <strong>Add Movie</strong> <AddIcon />
                    // </Button>
                } */}
                       {groups.map((Group, key) => (
          <div key={key}>
              <div className="p-3" style={{overflowX:'auto'}}>
                <table>
                  <tbody>
                  <tr>
                <td style={{width:600}}>{Group.leaderItNo}</td>
               
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

export default DisplayGroups
