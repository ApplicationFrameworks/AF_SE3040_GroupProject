import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
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
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [itNo, setITno] = useState();
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const history = useHistory();
    const [showMessage, setShowMessage] = useState(false)

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    function passwordOnFocus() {
        setShowMessage(true)
    }

    function passwordOnBlur() {
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword() {
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
    async function register(event) {
        event.preventDefault();

        let imgUrl

        if (previewSource) {
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "student_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) => {
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        if (password === confirmpassword) {

            const newStudent = {firstname, lastname, email, phone, itNo, password, imgUrl}

            try {
                await axios.post("http://localhost:8070/student/signup", newStudent, config)
                alert("Registration Successful")
                history.push('/student/signin')
            } catch (error) {
                if (error.response.status === 409) {
                    alert(error.response.data.message)
                } else {
                    alert("User Registration failed")
                }
            }
        } else {
            alert("Passwords don't match");
        }
    }

    return (
        <div className="main_input_filed">
            <div className="flex-container11">
                <div className="" align="center">
                    <div className="row">
                        <div className="col-1">
                        </div>
                        <div className="col-11">
                            <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                                <h2 className="signup_text">Sign Up</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-container12">

                <form onSubmit={register} className="main_input_filed_2">
                    <div className="">
                        <div className="">
                            <div className=""><br/>
                                <h6>First Name </h6>
                                <div className="div_input_filed">
                                    <div>

                                        <OutlinedInput
                                            className="input_filed"
                                            type="text" id="firstname"
                                            required fullWidth
                                            onChange={(event) => {
                                                setFirstName(event.target.value)
                                            }}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>
                                <h6>Last Name </h6>
                                <div className="div_input_filed">
                                    <div className="">

                                        <OutlinedInput
                                            className="input_filed"
                                            type="text" id="lastname"
                                            required fullWidth
                                            onChange={(event) => {
                                                setLastName(event.target.value)
                                            }}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>
                                <h6>Course </h6>
                                <div className="div_input_filed">
                                    <div className="">

                                        <OutlinedInput
                                            className="input_filed"
                                            type="text" id="it"
                                            required fullWidth
                                            onChange={(event) => {
                                                setITno(event.target.value)
                                            }}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>
                                <h6>Email </h6>
                                <div className="div_input_filed">
                                    <div className="">

                                        <OutlinedInput
                                            className="input_filed"
                                            type="email" id="email"
                                            required fullWidth
                                            onChange={(event) => {
                                                setEmail(event.target.value)
                                            }}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div><br/>
                                <h6>Phone Number </h6>
                                <div className="div_input_filed">
                                    <div className="">

                                        <OutlinedInput
                                            className="input_filed"
                                            type="tel" id="phone" required fullWidth
                                            onChange={(event) => {
                                                setPhone(event.target.value)
                                            }}
                                            inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                        />
                                    </div>
                                </div><br/>
                                <h6>Password </h6>
                                <div className="div_input_filed">
                                    <div className="">

                                        <OutlinedInput
                                            className="input_filed"
                                            type={showPassword ? "text" : "password"}
                                            id="password" name="password"  required fullWidth
                                            onChange={(event) => {
                                                setPassword(event.target.value)
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                            onFocus={passwordOnFocus}
                                            onBlur={passwordOnBlur}
                                        />
                                    </div>
                                </div><br/>
                                <h6>Confirm Password</h6>
                                <div className="div_input_filed">
                                    <div className="">

                                        <OutlinedInput
                                            className="input_filed"
                                            type={showPassword ? "text" : "password"}
                                            id="confirmpassword" name="confirmpassword"
                                          required fullWidth
                                            onChange={(event) => {
                                                setConfirmPassword(event.target.value)
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                            onFocus={passwordOnFocus}
                                            onBlur={passwordOnBlur}
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-12 mb-4">
                                    {showMessage &&
                                        <div className="PWmessage">
                                            <p>Password must contain lowercase letters, uppercase letters, numbers
                                                and should consist minimum of 8 characters</p>
                                        </div>
                                    }
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input id="terms" type="checkbox" required/>
                                        <label htmlFor="terms">&nbsp;I agree to the <Link to="/terms">Terms and
                                            Conditions</Link>.</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                {previewSource ?
                                    <img src={previewSource} alt="preview" className="previewImg"/>
                                    :
                                    <img src="/images/avatar.jpg" className="previewImg" alt="profile pic"/>
                                }
                                <div className="form-group">
                                    <label htmlFor="profilepic">
                                        <input
                                            style={{display: 'none'}}
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
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn" type="submit" value="Sign Up"/>
                            </div>
                        </div>
                    </div>

                    <p>Already have an account? <Link to="/student/signin">Sign In</Link></p>
<br/>
                </form>
            </div>


        </div>
    )
}

export default SignUp
