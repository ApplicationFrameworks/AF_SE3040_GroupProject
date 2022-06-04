import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import { orange, blue, red } from '@material-ui/core/colors';
import './SingleStaff.css';


function SingleStaff(props) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [interest, setInterest] = useState([]);
    const [phoneno, setPhone] = useState("");
    const [qualification, setQualification] = useState("");
    const [faculty, setFaculty] = useState([]);
    const [about, setAbout] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const history = useHistory()
    const [user, setUser] = useState("");

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
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


    function Request() {
        history.push(`/student/request/${id}`)
    }

    function Send() {
        history.push(`/staff/send`)
    }


    return (
        <div className="container" align="center">
            <div className="detailstaffCard" >
                <div className="detailstaff">
                    <img src={`${imgUrl}`} alt="staffDetails" style={{width:"400px",height:"250px"}} />
                    <div className="box-detailstaff">
                        <div className="row">
                            <h2>{title}   {name}</h2>
                            <h4 style={{color:"lightskyblue"}}>{speciality}</h4>
                            <h5 className='htag1'>{faculty}</h5>
                        </div>
<div className='about'>
    <h6 className='career'>&nbsp;&nbsp;&nbsp;&nbsp;Career Summery</h6>
    <h6 className='htag'><br/>{about}</h6></div>
    <div className='qualify'>
                        <h6 className='career'>&nbsp;&nbsp;&nbsp;&nbsp;Qualifications</h6>
                        <h6 className='htag'><br/>{qualification}</h6>
                        </div>
<div className='interest'>
<h6 className='career'>&nbsp;&nbsp;&nbsp;&nbsp;Research Interests</h6>
    <h6 className='htag'><br/>{interest}</h6></div>                 
                        

                        <div className='contact'>
                            <div className='phone'><h6 className='htag'><br/>Phone : {phoneno}</h6></div>
                            <div className='phone'><h6 className='htag'>Email :{email}<br/></h6></div>
                        </div>

                    </div>
                </div>
                <table className="singleItemBtn" >
                    <div>


                        <div>

                            <button className="mx-2 staffBtn" style={{ backgroundColor: orange[500] }}
                                onClick={() => Request()}>
                                Make a Request
                            </button>
                            <button className="mx-2 staffBtn" style={{ backgroundColor: orange[500] }}
                                onClick={() => Send()}>
                                Send Topics
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
