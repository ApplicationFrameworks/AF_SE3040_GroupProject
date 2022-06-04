import React, { useState,useEffect } from 'react';
import { useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { green,blue,red,yellow} from '@material-ui/core/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
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
                    // alert("Failed to fetch item data")
                    
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
                    <div className="pb-2 px-3" style={{position:'relative',top:70}}>
                        <h2 >My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-9">
                    <div className="row staff-card align-items-center" style={{position:'relative',top:90}}>
                        <div className="col-xl-3">
                            <div className="staffProfile_img" style={{position:'relative',top:-70}}>
                                {staff.imgUrl === "" ?
                                    <img src="/images/user-img.png" className="rounded-circle" alt="profile pic"/>
                                :
                                    <img src={`${staff.imgUrl}`}
                                    className="rounded-circle" alt="profile pic"/>
                                }
                                <div ><GitHubIcon style={{position:'relative',top:10,fontSize:30,left:70}}/><LinkedInIcon style={{position:'relative',top:10,fontSize:30,left:115}}/><TwitterIcon style={{position:'relative',top:10,fontSize:30,left:160}}/></div>
                                
                            </div>

                            <div style={{width:230,height:30,backgroundColor:'black',position:'relative',left:50}}>
                            <h6 style={{fontWeight:500,fontSize:17,color:'white',position:'relative',top:4,left:20}}>Phone &nbsp;: &nbsp;+94{staff.phoneno}</h6><br/>
                            </div>
                        </div>
                        <div className="col-xl-4" style={{position:'relative',top:40,left:150,width:500}}>
                            <h4>{staff.title} &nbsp;{staff.name}</h4>
                            <h6 style={{fontWeight:500,color:'lightskyblue'}}>{staff.faculty}</h6>
                            <h6 style={{fontWeight:500,fontSize:20}}>{staff.speciality}</h6><br/><br/>
                            <h6 style={{fontWeight:500,fontSize:17}}> Registration Number &nbsp;: &nbsp;{staff.reg}</h6><br/>   
                            <h6 style={{fontWeight:500,fontSize:17}}> Research Interests &nbsp;: &nbsp; {staff.interest}</h6><br/>
                            <div style={{width:450,height:40,backgroundColor:'rgba(0, 153, 255, 0.733)',position:'relative',top:20}}>
                            <h6 style={{fontWeight:500,fontSize:20,color:'white',position:'relative',top:9,left:20}}>Career Summery</h6><br/>
                            </div><br/><br/>
                            <h6 style={{fontWeight:500,fontSize:17}}>{staff.qualification}</h6><br/>
                            <h6 style={{fontWeight:500,fontSize:17}}>{staff.about}</h6><br/>
                            
      
                            <div style={{height:100}}>

                            </div>
                        </div>            
                    </div>    
                </div>
                <div className="col-xl-3 px-5" align="center" style={{position:'relative',top:80}}>                   
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
