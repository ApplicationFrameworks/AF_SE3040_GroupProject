import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './SignUp.css';

function SignUp() {
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [itNo,setITno] = useState();
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const history = useHistory();
    const [showMessage, setShowMessage] = useState(false)

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    function passwordOnFocus(){
        setShowMessage(true)
    }

    function passwordOnBlur(){
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

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

    //header
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    //add new item
    async function register(event){
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

        if(password === confirmpassword){

            const newStudent = {firstname,lastname,email,phone,itNo,password,imgUrl}

            try {
                await axios.post("http://localhost:8070/student/signup", newStudent , config)
                    alert("Registration Successful")
                    history.push('/student/signin')
            } catch (error) {
                if(error.response.status === 409){
                    alert(error.response.data.message)
                }
                else{
                    alert("User Registration failed")
                } 
            }
        }else{
            alert("Passwords don't match");
        }        
    }

    return (
            <div className="flex-container11">
                <div  className="" align="center">
                    <div className="row">
                        <div className="col-1">
                        </div>
                        <div className="col-11">
                            <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                                <h2>Sign Up</h2>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
    )
}

export default SignUp
