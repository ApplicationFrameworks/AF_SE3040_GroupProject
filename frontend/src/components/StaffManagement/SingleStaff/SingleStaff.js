import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import {orange,blue,red } from '@material-ui/core/colors';


function SingleStaff(props) {
    const[id,setId]=useState("");
    const [title,setTitle]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [speciality,setSpeciality]=useState("");
    const [interest,setInterest]=useState([]);
    const [phoneno,setPhone]=useState("");
    const [qualification,setQualification]=useState("");
    const [faculty,setFaculty] = useState([]);
    const [about,setAbout] = useState("");
    const[imgUrl,setImgUrl]=useState("");
    const history=useHistory()
    const [user, setUser] = useState("");

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
      async function getStaffDetails() {
        axios.get(`http://localhost:8070/staff/all/${props.match.params.id}`).then((res) => {
          setId(res.data._id)  
          setName(res.data.name)
          setTitle(res.data.title)
          setEmail(res.data.email)
          setFaculty(res.data.faculty)
          setAbout(res.data.about)
          setInterest(res.data.interest)
          setPhone(res.data.phoneno)
          setQualification(res.data.qualification)
          setSpeciality(res.data.speciality)
          setImgUrl(res.data.imgUrl)
        }).catch((err) => {
          alert("Failed to Fetch Details")
        })
      }
      getStaffDetails();

    }, [props])

  
    function Request(){
        history.push(`/staff/request`)
    }
    
   
    return (
        <div className = "container" align="center">
            <div className="detailProductCard" >     
                <div className="detailProduct">
                                <img src={`${imgUrl}`} alt="productDetails" />
                    <div className="box-detailProduct">
                            <div className="row">
                                <h2>{title}   {name}</h2>
                            </div>
                            <h5>{speciality}</h5>
                            <h5>{about}</h5>
                            <h5>{interest}</h5>
                            <h5>{phoneno}</h5>
                            <h5>{email}</h5>
                            <h5>{faculty}</h5>
                            <p className="text-muted">{qualification}</p>
                    </div>           
                </div> 
                <table className="singleItemBtn" >  
                            <div> 
                           
                                    
                                    <div>
            
                                        <button className="mx-2 productBtn" style={{backgroundColor:red[500]}} 
                                            onClick={()=>Request()}>
                                            Make a Request
                                        </button> 
                                    </div>  
                            
                            </div>
                        </table>               
            </div>
            <br></br>
    
        </div>          
    )
}

export default SingleStaff
