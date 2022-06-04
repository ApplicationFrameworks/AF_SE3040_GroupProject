import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from 'axios';
import './Request.css';


function AddRequest(props) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [staffID, setStaffID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [msg, setMsg] = useState("");
  const [subject, setSubject] = useState("");
  const [group, setGroup] = useState("");
  const [supervisour, setSupervisour] = useState("");
  const history = useHistory()

  const config = {
    headers: {
      "content-Type": "application/json"
    }
  };

  useEffect(() => {
    async function getStaffDetails() {
      axios.get(`http://localhost:8070/staff/all/${props.match.params.id}`, config).then((res) => {
        setStaffID(res.data._id)
        setStudentID(user._id)
      }).catch((error) => {
        console.log(error)
        alert("Failed to fetch details")
      })
    }
    getStaffDetails();

  }, [props])

  function sendData(e) {
    e.preventDefault();
    const newRequest = {
      staffID,
      studentID,
      subject,
      group,
      supervisour,
      msg
    }

    localStorage.setItem("request", JSON.stringify(newRequest))
        
        axios.post("http://localhost:8070/request/add", newRequest).then(() => {
            alert ("Successful Request")
            localStorage.removeItem("request")
            history.push(`/`)
        }).catch((error) => {
            alert(error)
        })

  }
  console.log(staffID)

  return (
    <div className="container" align="center">
      <div className="row">
        <div className="col-1">
        </div>
        <div className="col-11">
          <div className="pb-2 px-5 d-flex align-items-center justify-content-between">

            <h2 style={{ fontSize: '25px', position: 'relative', top: '70px', left: '170px' }}>Make a Request</h2>
          </div>
        </div>
      </div>
      <br /><br /><br />
      <div className="boxUpdate px-5" style={{ border: '3px solid rgba(73, 73, 73, 0.445)', borderRadius: '15px', width: '800px', position: 'relative', left: '-250px', background: 'rgba(192, 192, 192, 0.342)' }}>
        <div className="row">
          <form onSubmit={sendData} className="col-6 mt-5">
            <div className="row">
              <label className='label4'>Your Name</label>
              <div className="col-md-8 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Student Name" readOnly fullWidth
                    value={user.firstname + ' ' + user.lastname}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <label className='label4'>Registration Number</label>
              <div className="col-md-8 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Registration Number" readOnly fullWidth
                    value={user.itNo}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>
              <label className='label4'>Your Email</label>
              <div className="col-md-8 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Email Address" readOnly fullWidth
                    value={user.email}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>

              <label className='label4'>Supervisour's Name</label>
              <div className="col-md-10 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Enter the Supervisor's Name" required fullWidth
                    onChange={(e) => setSupervisour(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>

              <label className='label4'>Group ID</label>
              <div className="col-md-10 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Enter the Group ID" required fullWidth
                    onChange={(e) => setGroup(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>

              <label className='label4'>Subject</label>
              <div className="col-md-10 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Enter the Subject" required fullWidth
                    onChange={(e) => setSubject(e.target.value)}
                    inputProps={{ style: { padding: 12 } }}
                  />
                </div>
              </div>

              <label className='label4'>Your Message</label>
              <div className="col-md-10 mb-4 mx-3">
                <div className="form-group10">
                  <OutlinedInput
                    type="student" id="student" placeholder="Enter Your Message    ........" required fullWidth
                    onChange={(e) => setMsg(e.target.value)}
                    inputProps={{ style: { padding: 62 } }}
                  />
                </div>
              </div>

              


              <div className="col-12">
                <div className="form-group11">
                  <input className="submit-btn mb-0" type="submit" value="Send" style={{ padding: '5px 65px', borderRadius: '10px', background: 'orange', border: '2px solid orange', color: 'white', fontSize: '18px' }} /><div style={{ left: '60px', position: 'relative', top: '-33px' }}><SendOutlinedIcon style={{ color: 'white' }} /></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <img style={{ width: '500px', height: '420px', position: 'relative', left: '500px', top: '-840px' }} src={require('../../../public/images/contact.jpg')} />
      </div>
    </div>
  )

}

export default AddRequest
