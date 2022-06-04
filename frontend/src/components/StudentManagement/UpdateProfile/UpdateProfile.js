import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import './UpdateProfile.css';

function UpdateProfile(props) {
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [itNo,setItNo] = useState("");
    const [userImg, setUserImg] = useState("");


    const history = useHistory();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`http://localhost:8070/student/${props.match.params.id}`).then((res)=>{
                setFirstName(res.data.result.firstname)
                setLastName(res.data.result.lastname)
                setEmail(res.data.result.email)
                setPhone(res.data.result.phone)
                setItNo(res.data.result.itNo)
                setUserImg(res.data.result.imgUrl)
            }).catch((error)=>{
                alert("Failed to fetch user data")
            })
        }
        fetchUser()
    },[props]);

    //handling the image uploading
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

    //update the user
    async function Update(event){

        event.preventDefault();

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "student_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const updatedProfile = {firstname,lastname,email,phone,itNo, imgUrl}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("studentAuthToken")}`,
            }
        };

        try {
            await axios.put(`http://localhost:8070/student/updateStudent/${props.match.params.id}`,updatedProfile, config);
                alert("Updated Successfully")
                history.push('/student/profile')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/student/signin')
            } else{
                alert("Updating Failed")
            }
        }    
    }

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11"><br/>
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2 className="profile_text1">Update Profile</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="main_input_filed_21">
                    <div className=""><br/>
                        <div className=""><br/>
                            <div className=""><br/>
                                <div className="div_input_filed3">
                                    <div className="">
                                        <OutlinedInput
                                            className="input_filed1"
                                            type="" id="firstname" placeholder="First Name" required fullWidth
                                            value={firstname}
                                            onChange={(event)=> {setFirstName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>
                                <div className="div_input_filed3">
                                    <div className="">
                                        <OutlinedInput
                                            className="input_filed1"
                                            type="" id="lastname" placeholder="Last Name" required fullWidth
                                            value={lastname}
                                            onChange={(event)=> {setLastName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>
                                <div className="div_input_filed3">
                                    <div className="">
                                        <OutlinedInput
                                            className="input_filed1"
                                            type="tel" id="phone" placeholder="phone" required fullWidth
                                            value={phone}
                                            onChange={(event)=> {setPhone(event.target.value)}}
                                            inputProps={{style: {padding: 12}, pattern: "[0-9]{10}" }}
                                        />
                                    </div>
                                </div><br/>

                                <div className="div_input_filed3">
                                    <div className="">
                                        <OutlinedInput
                                            className="input_filed1"
                                            type=" " id="itNo" placeholder="phone" required fullWidth
                                            value={itNo}
                                            onChange={(event)=> {setItNo(event.target.value)}}
                                            inputProps={{style: {padding: 12}, }}
                                        />
                                    </div>
                                </div><br/>

                                <div className="div_input_filed3">
                                    <div className="">
                                        <OutlinedInput
                                            className="input_filed1"
                                            type="" id="email" placeholder="Email" required fullWidth
                                            value={email}
                                            onChange={(event)=> {setEmail(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>


                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                { previewSource  ?
                                    <img src={previewSource} alt="preview" className="previewImg123"/>
                                : userImg === ""? 
                                    <img src="/images/avatar.jpg" alt="preview" className="previewImg123"/>
                                :
                                    <img src={`${userImg}`} className="previewImg123" alt="profile pic"/>
                                }
                                <div className="">
                                    <label htmlFor="profilepic">
                                        <input

                                            style={{ display: 'none' }}
                                            id="profilepic"
                                            name="profilepic"
                                            type="file"
                                            onChange={handleFileInputChange}
                                            value={fileInputState}
                                        />
<br/><br/>
                                        <Button className="form_btn123" color="primary" variant="contained" component="span">
                                            <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>  <br/><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">

                                <input className="form-submit-btn mb-0 form_btn12" type="submit" value="Update" />

                            </div> 
                        </div>
                    </div> 
                </form>     
            </div>                    
        </div>
    )
}

export default UpdateProfile
