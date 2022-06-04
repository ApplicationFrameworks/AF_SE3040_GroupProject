import React, {useEffect, useState} from 'react';
import {useHistory, Link, useLocation} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CircleIcon from '@material-ui/icons/FiberManualRecord';
import HeartIcon from '@material-ui/icons/FavoriteOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Button} from '@material-ui/core';
import {orange, green, red, blue} from '@material-ui/core/colors';
import axios from 'axios';
import './Profile.css';

function Profile() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const history = useHistory();
    const location = useLocation();

    //getting user data
    useEffect(() => {
        async function fetchUser() {
            await axios.get(`http://localhost:8070/student/${user._id}`).then((res) => {
                //setting user
                localStorage.setItem("user", JSON.stringify(res.data.result))

                setUser(JSON.parse(localStorage.getItem('user')))

            }).catch((error) => {
                alert("Failed to fetch item data")
            })
        }

        fetchUser()

    }, [user._id, location])

    //redirecting to update page
    function editCardData() {
        history.push(`/student/updateprofile/${user._id}`)
    }

    //redirecting to generate report page
    function GenerateReport() {
        history.push(`/student/report`)
    }

    //reset password
    async function ResetPassword() {
        let email = user.email
        try {
            await axios.post("http://localhost:8070/student/forgotpassword", {email});

            alert(`We have sent a password reset link to ${email}`);
        } catch (error) {
            if (error.response.status === 404) {
                alert("Please enter the email you use for registering")
            } else {
                alert("Something went wrong")
            }
        }
    }

    //delete account
    async function deleteAccount() {
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("studentAuthToken")}`,
            },
        };

        if (window.confirm('Are you sure?\nThis action cannot be undone')) {
            await axios.delete(`http://localhost:8070/student/deleteStudent/${user._id}`, config).then(() => {
                alert("Account deleted successfully")
                localStorage.clear()
                history.push('/student/signin')
            }).catch((error) => {
                alert(`Failed to delete the Account`)
            })
        }
    }

    //logout
    async function logout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12"><br/><br/>
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 className="profile_text">My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="row profile_div">
                <div className="col-xl-3">
                    <div className="white-card ">
                        <div className="profile_img11">
                            {user.imgUrl === "" ?
                                <img src={require('../../../../public/images/avatar.jpg')} className="rounded-circle"
                                     alt="profile pic"/>
                                :
                                <img src={`${user.imgUrl}`} className="" alt="profile pic"/>
                            }
                        </div>

                    </div>
                </div>


                <div className="col-xl-3 px-4  ">
                    <br/><br/>
                    <h4 className="middle_div">{user.firstname + ` ` + user.lastname}</h4><br/>
                    <h6 className="middle_div">Email : {user.email}</h6><br/>
                    <h6 className="middle_div">Index Number : {user.itNo}</h6><br/>
                    <h6 className="middle_div">Phone Number : {user.phone}</h6><br/>

                    <Link style={{border: "none", fontWeight: "bold"}} className="btn btn-sm btn-primary middle_div1"
                          to={`/student/updateProfile/${user._id}`}>Edit Profile</Link>

                </div>

                <div className="col-xl-3 px-4 ">
                    <br/><br/>
                    <center>
                        <Button color="primary" variant="contained" className="mb-4 mt-4 middle_div2" fullWidth
                                disableElevation size="large"
                                style={{backgroundColor: blue[500], color: 'white'}} onClick={logout}
                                endIcon={<ExitToAppIcon/>}>
                            Log Out
                        </Button>
<br/><br/>
                        <Button color="primary" variant="contained" className="mb-4 middle_div2" fullWidth
                                disableElevation size="large"
                                style={{backgroundColor: blue[500], color: 'white'}} onClick={ResetPassword}
                                endIcon={<LockIcon/>}>
                            Reset Password
                        </Button><br/><br/>
                        <Button className="mb-4 middle_div2" color="secondary" variant="contained" fullWidth
                                disableElevation size="large" style={{backgroundColor: "red"}}
                                onClick={deleteAccount} endIcon={<DeleteIcon/>}>
                            Delete Account
                        </Button>
                    </center>
                </div>

            </div>

        </div>
    )
}

export default Profile
