import React,{useState} from "react";
import { useHistory} from 'react-router-dom';
import { OutlinedInput } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import './StaffSignUp.css';
import axios from "axios";


function StaffSignUp(){

    
    const [password, setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [title,setTitle]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [speciality,setSpeciality]=useState("");
    const [interest,setInterest]=useState([]);
    const [phoneno,setPhone]=useState("");
    const [qualification,setQualification]=useState("");
    const [faculty,setFaculty] = useState([]);
    const [reg,setReg] = useState("");
    const [about,setAbout] = useState("");
    const [previewSource, setPreviewSource] = useState();
    const history =useHistory();

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a view of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    
    async function add(event){
        event.preventDefault();
        const config={
             headers:{
                "content-Type":"application/json"
            }
        };

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "staff_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

      

        if(password===confirmPassword){
            const newStaff= {name,reg,phoneno,password,title,email,speciality,about,interest, qualification, faculty, imgUrl }
            
            try{
            
                await axios.post("http://localhost:8070/staff/signup",newStaff,config);
                alert("user added successfully")
                history.push(`/staff/login`)
            } catch(error){
                alert("Register failed!");
                
            }
        }else{
            alert("Password mismatch!");
        }
       
    }

   
    const interests =[
        'Software Engineering','Design Lab','Visual Computing','Mobile Computing','Robotics','Machine Learning','Image Processing','Artificial Intelligence'
    ]

    const faculties = [
        'FACULTY OF COMPUTING | INFORMATION TECHNOLOGY', 'FACULTY OF COMPUTING | COMPUTER SCIENCE & SOFTWARE ENGINEERING', 'FACULTY OF COMPUTING | COMPUTER SYSTEMS ENGINEERING'
    ]

    

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
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between" style={{position:'relative',top:70}} >
                        <h2>Sign Up</h2>
                    </div>
                </div>
            </div>
            <form  onSubmit={add} className="staffSignUp" style={{position:'relative',top:80,width:1400}} >
                <div className="row"> 
                    
                    <div className="col-8">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                <label>Title</label> &nbsp;
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="dr" value="Dr." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="dr">Dr.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="mr" value="Mr." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="mr">Mr.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="ms" value="Ms." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="prof">Ms.</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input 
                                        className="form-check-input" type="radio" name="title" id="prof" value="Prof." required
                                        onChange={(event)=> {setTitle(event.target.value)}}
                                    />
                                    <label className="form-check-label" for="mr">Prof.</label>
                                </div>
                            </div>

                            <br/>
                    
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="name"
                            name="fullname"
                            id="fullname"
                            placeholder="Full Name"
                            onChange={(e) => setName (e.target.value)}
                            required fullWidth
                            inputProps={{style: {padding: 12}}}
                         />
                    </div><br/><br/><br/>
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail" 
                            onChange={(e) => setEmail(e.target.value)}
                            required fullWidth
                            inputProps={{style: {padding: 12} } }
                        />
                    </div>
                
                            <br/>

                        
                            <br/>
                   
                            <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="speciality"
                                    name="speciality"
                                    id="speciality"
                                    placeholder="Speciality"
                                    onChange={(e) => setSpeciality(e.target.value)}
                                    required fullWidth
                                    inputProps={{style: {padding: 12}}}
                                />
                            </div><br/><br/><br/>
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
                        type="tel"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Phone Number"
                        onChange={(e) => setPhone(e.target.value)}
                        required fullWidth
                        maxLength="10"
                        inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                    />
                </div>
                            <div className="col-xl-6 mb-3">
                    <OutlinedInput
                        type="qualification"
                        name="qualification"
                        id="qualification"
                        placeholder="Qualification"
                        onChange={(e) => setQualification(e.target.value)}
                        required fullWidth
                        inputProps={{style: {padding: 12}}}
                    />
                </div>
           
                            <br/>
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
                            <br/>
                
                            <div className="col-xl-6 mb-3">  
                                <OutlinedInput
                                    type="reg"
                                    name="reg"
                                    id="reg"
                                    placeholder="Registration Number"
                                    onChange={(e) => setReg(e.target.value)}
                                    required fullWidth
                                    maxLength="5"
                                    inputProps={{style: {padding: 12}}}
                                />
                            </div>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group"> 
                                    <OutlinedInput
                                        type="about"
                                        name="about"
                                        id="about"
                                        placeholder="Career Summery"
                                        onChange={(e) => setAbout(e.target.value)}
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                    
                            <br/><br/><br/>
                
                            <div className="col-xl-6 mb-3">  
                                <div  className="form-group">
                                    <OutlinedInput
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        value={password}
                                        id="password"
                                        placeholder="Password"
                                        inputProps={{style: {padding: 12}}}
                                        required fullWidth
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 mb-3">  
                                <div className="form-group">
                                    <OutlinedInput
                                        value={confirmPassword}
                                        type="password"
                                        name="con-password"
                                        id="con-password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="confirm Password"
                                        required fullWidth
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                    
                            <br/>
                
                
                            <br/>
 
                            <br/>
                
              
                 
                        </div>
                    </div>
                    <div className="col-4" style={{position:'relative',left:100}}>

                            {previewSource ? 
                                <img src={previewSource} alt="preview" className="previewImg" />
                            :
                                <img src={require('../../../../public/images/avatar.jpg')} className="previewImg" alt="profile pic"/>
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
        
                        </div><br/><br/><br/>
                    <div className="col-xl-12">
                        <input type="submit" className="form-submit-btn" style={{backgroundColor:'orange',color:'white',padding:'8px 35px',borderRadius:'10px',border:'3px solid orange',fontWeight:500,fontSize:17}} value="Register"  /> 
                    </div>
               </div> 
            </form>
        </div>

    );
}; 
export default StaffSignUp;