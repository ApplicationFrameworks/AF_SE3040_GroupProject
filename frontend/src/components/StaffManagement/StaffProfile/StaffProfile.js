import React, { useState,useEffect } from 'react';
import { useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green,blue,red,yellow} from '@material-ui/core/colors';
import './StaffProfile.css';


function StaffProfile() {
    const [staff,setStaff] = useState(JSON.parse(localStorage.getItem('user')));
    const history =useHistory();
    const location =useLocation();
    
    useEffect(() => {

         async function fetchUser(){
              await axios.get(`http://localhost:8070/staff/${staff._id}`).then((res)=>{
                    localStorage.setItem("user",JSON.stringify(res.data))
                    setStaff(JSON.parse(localStorage.getItem('user')))
                }).catch((error)=>{
                    alert("Failed to fetch item data")
                    
                })
            }
            fetchUser()
     
    },[staff._id,location])

        async function deleteStaff(id){

            const config={
                headers:{
                    "content-Type":"application/json"
                }
            }

            await axios.delete(`http://localhost:8070/staff/delete/${id}`,config).then(() =>{
                alert("Your Profile has been Deleted")
                localStorage.clear()
                history.push('/staff/staffLogin')
            }).catch((error)=>{
                alert("Remove Failed!");
            })
        }
    
    const logout = () => {
        localStorage.clear();
        history.push(`/`)
    };
        
     const update =() =>{
         history.push(`/staff/update/${staff._id}`)
     }

    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3">
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-9">
                    <div className="row doc-card align-items-center">
                        <div className="col-xl-3">
                            <div className="docProfile_img">
                                {staff.imgUrl === "" ?
                                    <img src="/images/user-img.png" className="rounded-circle" alt="profile pic"/>
                                :
                                    <img src={`${staff.imgUrl}`}
                                    className="rounded-circle" alt="profile pic"/>
                                }
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <h4>{staff.title} {staff.name}</h4>
                            <h5>{staff.speciality}</h5>
                            <h5>{staff.qualification}</h5>
                            <h5>{staff.about}</h5>
                        </div>
                        <div className="col-xl-5">
                            <h5> {staff.reg}</h5>
                            <h5>{staff.faculty}</h5>
                            <h5> {staff.interest}</h5>
      
                            
                        </div>              
                    </div>    
                </div>
                <div className="col-xl-3 px-5" align="center">                   
                    <Button
                        className="mb-4 mt-4"
                        variant="contained"
                        color="primary"
                        endIcon={<UpdateIcon />}
                        onClick={update}
                        disableElevation
                        fullWidth
                    >
                        Update Profile
                    </Button>  
                    <br/>                                             
                    <br/>
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        endIcon={<DeleteIcon />}
                        fullWidth
                        disableElevation
                        onClick={() => deleteStaff(doctor._id)}
                        
                    >
                        Delete Profile
                    </Button>  
                        <br/>   
                    <Button
                        className="mb-4"
                        variant="contained"
                        color="secondary"
                        endIcon={<ExitToAppIcon />}
                        style={{ backgroundColor: blue[500], color: 'white'}}
                        fullWidth  
                        disableElevation   
                        onClick={logout}
                    >
                        Logout 
                    </Button>                           
                </div>
            </div>       
        </div>
        )
}

export default StaffProfile
