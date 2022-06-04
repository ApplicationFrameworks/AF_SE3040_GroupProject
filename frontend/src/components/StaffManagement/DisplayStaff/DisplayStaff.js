import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import { orange,red,blue,green, lightBlue } from '@material-ui/core/colors';
import './DisplayStaff.css'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';


function DisplayStaff() {

  const [staff, setStaff] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => { 
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    async function getAllStaff() {
      axios.get(`http://localhost:8070/staff/all`).then((res) => {
        setStaff(res.data)  
      }).catch((error) => {
        alert("Failed to fetch staff details")
      })
    }
      getAllStaff();
  }, [location])
  
  function filterContent(data, searchTerm){
    const result = data.filter((staff) => 
        staff.speciality.toLowerCase().includes(searchTerm) 
    )
    setStaff(result)
  }


  function handleSearchAll(event){
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/staff/all`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch details")
    })
  }

  function view(id){
    history.push(`/staff/all/${id}`)
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
                <div className=""  style={{top:'50px',position:'relative',right:'340px'}}>
                  <input style={{color:"black",fontWeight:"500",borderRadius:"8px",border:"2px solid grey",padding:'6px 123px'}}
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Search" 
                    onChange={handleSearchAll} 
                    required 
                  /><div style={{position:'relative',right:'225px',top:'-35px'}}><SearchIcon/></div>
                </div>
              
          </div>
        </div>
        <br/><br/><br/>
        <div className="staffGrid"  > 
          {staff.map((Staff,key)=>( 
                <div key={key}> 
                    <div className="staffCard" >
                        <div className="imgBx">
                            <img  src={`${Staff.imgUrl}`} alt="staff" className="itemstaff"/>
                        </div>
                        <div className="p-3">
                            <h7>{Staff.name}</h7>
                            <h6>{Staff.speciality}</h6>
                            <div align="right">
                              <span>
                                  <button className="staffBtn1" style={{backgroundColor:orange[400],color:"white",fontWeight:"500",borderRadius:"8px",border:"5px solid orange",padding:'3px 13px'}} onClick={()=>view(Staff._id)}> View Proflie </button>
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

export default DisplayStaff