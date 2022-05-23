import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { OutlinedInput } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './StaffUpdate.css';

function StaffUpdate(props){

       
    const [name,setName]=useState("");
    const [speciality,setSpeciality]=useState("");
    const [interest,setInterest]=useState([]);
    const [qualification,setQualification]=useState("");
    const [faculty,setFaculty] = useState([]);
    const [about,setAbout] = useState("");
    const [userImg, setUserImg] = useState("");
    const [fileInputState, setFileInputState] = useState('');
    const  setSelectedFile = useState();
    const [previewSource, setPreviewSource] = useState();
    const history = useHistory(); 


    const interests =[
        'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
    ]

    const faculties = [
        'Sinhala', 'English', 'Tamil'
    ]


    useEffect(() => {
        async function fetchUser(){
            await axios.get(`http://localhost:8070/staff/${props.match.params.id}`).then((res)=>{
                setName(res.data.name)
                setSpeciality(res.data.speciality)
                setInterest(res.data.interest)
                setQualification(res.data.qualification)
                setFaculty(res.data.faculty)
                setAbout(res.data.about)
                setUserImg(res.data.imgUrl)
            }).catch((error) =>{
                alert("Failed to fetch user data")
            })
        } 
        fetchUser()
    },[props]);


    async function update(event){

        event.preventDefault();

        const updatedStaff = {name, speciality,interest,qualification, faculty, about }

        const config ={
            headers:{
                "content-Type":"application/json",
                Authorization : `${localStorage.getItem ("staffAuthToken")}`,
            }
        };

        try{
            await axios.put(`http://localhost:8070/staff/update/${props.match.params.id}`,updatedStaff,config);
            alert("Updated Successfully")
            history.push('/staffProfile')
        } catch (error){
            if(error.response.status === 401){
                alert("Authentication failed. please sign in again")
                history.push('/staffLogin')
            } else{
                alert("Updating failed")
            }
        }
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };


    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleInterestChange = (event) => {
        setInterest(event.target.value);
    };

    const handleChange = (event) => {
        setFaculty(event.target.value);
      };

    return(
        <div className="container" align="center">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Update Profile</h2>
                    </div>
                </div>
            </div>
            <form onSubmit={update} encType="multipart/form-data" className="docUpdate" align="center">
               <div className="row">
               <div className="col-8">
                        <div className="row">

                            <br/>
                    
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="text"
                            name="fullname"
                            id="fullname"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName (e.target.value)}
                            required fullWidth
                            inputProps={{style: {padding: 12}}}
                         />
                    </div>
                
                            <br/>

                        
                            <br/>
                   
                            <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="text"
                                    name="speciality"
                                    id="speciality"
                                    placeholder="Speciality"
                                    value={speciality}
                                    onChange={(e) => setSpeciality(e.target.value)}
                                    required fullWidth
                                    inputProps={{style: {padding: 12}}}
                                />
                            </div>
                            <div className="col-xl-6 mb-3">
                                <InputLabel id="demo-mutiple-chip-label">Research Interests</InputLabel>
                                    <Select
                                        id="demo-mutiple-chip"
                                        multiple fullWidth
                                        value={interest}
                                        onChange={handleInterestChange}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={(selected) => (
                                            <div >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}  />
                                                ))}
                                            </div>
                                        )}
                                    >
                                    {interests.map((interests) => (
                                        <MenuItem key={interests} value={interests} >
                                            {interests}
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </div>

                            <br/>
        
                            <div className="col-xl-6 mb-3">
                    <OutlinedInput
                        type="text"
                        name="qualification"
                        id="qualification"
                        placeholder="Qualification"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        required fullWidth
                        inputProps={{style: {padding: 12}}}
                    />
                </div>
           
                            <br/>
                
            
                            <br/>
                
                            <div className="col-xl-12 mb-3">
                        <InputLabel id="demo-mutiple-chip-label">Faculty</InputLabel>
                            <Select
                                id="demo-mutiple-chip"
                                multiple fullWidth
                                value={faculty}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip"/>}
                                renderValue={(selected) => (
                                    <div >
                                        {selected.map((value) => (
                                            <Chip key={value} label={value}  />
                                        ))}
                                    </div>
                                 )}
                            >
                            {faculties.map((faculties) => (
                                <MenuItem key={faculties} value={faculties} >
                                    {faculties}
                                </MenuItem>
                            ))}
                            </Select>
                        </div>
                  
                            <br/>
   
                            <br/>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group"> 
                                    <OutlinedInput
                                        type="text"
                                        name="about"
                                        id="about"
                                        placeholder="Career Summery"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                 
                        </div>
                    </div>
                    <div className="col-6">
                    <div align="center">
                        { previewSource  ?
                            <img src={previewSource} alt="preview" className="previewImg"/>
                            : userImg === ""? 
                                <img src="/images/avatar.jpg" alt="preview" className="previewImg"/>
                            :
                                <img src={`${userImg}`} className="previewImg" alt="profile pic"/>
                            }
                            <div className="form-group">
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                    </Button>
                                </label>
                                
                            </div>
                        </div>
                    </div>
                </div>
              
                <input type="submit" className="form-submit-btn" value="Update"/> 
        </form>
    </div>
   )
}

export default StaffUpdate