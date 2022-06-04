import React, { useEffect, useState } from 'react'
import ForumIcon from '@mui/icons-material/Forum';
import { useHistory } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import './ModulePage.css'
import axios from 'axios'

function Modulepage() {

    const history = useHistory()
    const [isAdmin, setIsAdmin] = useState(false)
    const [document, setDocuments] = useState([])
    const location = useLocation();
    const [user, setUser] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
          setUser(JSON.parse(localStorage.getItem("user")));
        }

        if (localStorage.getItem("adminAuthToken")) {
            setIsAdmin(true)
        }
    
        async function getSubmissionType() {
          axios
            .get(`http://localhost:8070/submissionType`)
            .then((res) => {
              setDocuments(res.data);
            })
            .catch((error) => {
              alert("Failed to fetch Submission Type");
            });
        }
    
        getSubmissionType();
      }, [location,isAdmin]);

      function filterContent(data, searchTerm) {
        const result = data.filter((product) =>
          product.group.toLowerCase().includes(searchTerm)
        );
        setDocuments(result);
      }

      function handleSearchAll(event) {
        const searchTerm = event.currentTarget.value;
        axios
          .get(`http://localhost:8070/submissionType`)
          .then((res) => {
            filterContent(res.data, searchTerm.toLowerCase());
          })
          .catch((error) => {
            alert("Failed to fetch Submission Type");
          });
      }

console.log(Document.weekName)

    return (
        <div className="container">

            <div className='large'>
                <ForumIcon style={{ width: 30, height: 30, color: "rgb(50, 146, 211)" }} /><h6 style={{ fontSize: 17, position: 'relative', top: 10, left: 30 }}>Social Forum</h6>
                <br /><br />
                <h2>Welcome to Research Project SE4040!</h2><br />
                <h4 >LIC : Mr. Thusithanjana Thilakarathna</h4>
                <h4 className='mail'>Email - thusithanjana.t@sliit.lk</h4>
                <h4>Visiting Lecturer: Mr. Kushira Godellawatta</h4>
                <h4 className='mail'>Email - kushira@gmail.com</h4>

            </div>
            <aside className='aside' style={{ top: 390, position: 'relative', left: 250, width: 380, height: 800 }}>
                <div class="vertical-menu" align="center" style={{ width: 260 }}>
                    <a href="#" class="active">Research Criterias</a>
                    <a href="#"></a>
                    <a href="#">Distributed & Parallel Computing</a>
                    <a href="#">ICT for Development</a>
                    <a href="#">Data Communucation & Networking</a>
                    <a href="#">Robotics & Intelligent Systems</a>
                    <a href="#">Assistive Tecnology</a>
                    <a href="#">Human Computer Interaction</a>
                    <a href="#">Elearning and Education</a>
                    <a href="#">Computational Linguistics</a>
                    <a href="#">Visual Computing</a>
                    <a href="#">Digital Lab</a>
                    <a href="#">Software Engineering</a>
                    <a href="#">Artificial Intelligence</a>
                    <a href="#">Internet Security</a>
                </div>

            </aside>
            <div style={{ height: 2000 }}>
                <div className='week1'>
                    <h4 className='weekT1'>Student Group Registration</h4>
                    <div className='inside'>
                        <a className='linkModule' href="/group/add"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Project - Group Registration</h5></a>
                        <p className='para'>

                            Please note that the deadline for the group registration is 24th April 2023 (Sunday). </p>
                        <img className="link" src={require('../../../public/images/pdf.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                        <h5 className='mid'>Research Project - Registered Groups List</h5>
                    </div>
                </div>

                <div className='week2'>
                    <h4 className='weekT2'>Research Topic Registration</h4>
                    <div className='inside'>
                        <a className='linkModule' href="/topic/add"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Project - Research Topic Registration</h5></a>
                        <p className='para'>

                            The deadline for the topic registration is 30th April 2023 (late submissions will not be accepted). </p>
                        <a className='linkModule' href="/topic/view"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Topics - Progress of your Topics</h5></a>
                    </div>
                </div>

                <div className='week3'>
                    <h4 className='weekT3'>Topic Documents Submission</h4>
                    <div className='inside'>
                        <a className='linkModule' href="/topic/view"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Project - Topic Document Submission</h5></a>
                        <p className='para'>

                            Please check your eligibility to submit your documents. The deadline is 13th May 2023</p>
                        <a className='linkModule' href="/tdocView"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Project - Topic Documents Evaluation Progress</h5></a>
                    </div>
                </div>

                <div className='week4'>
                    <h4 className='weekT4'>Request Supervisor / Co-Supervisor</h4>
                    <div className='inside'>
                        <a className='linkModule' href="/staff/all"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Project - Request Supervisors / Co-Supervisors</h5></a>
                        <p className='para'>

                            Please note that the deadline for the supervisors / co-supervisors requests is 24th May 2023. </p>
                        <a className='linkModule' href="/request/view"><img className="link" src={require('../../../public/images/internet.png')} style={{ width: 30, height: 30, marginTop: -5 }} />
                            <h5 className='mid'>Research Project - Requests Progress</h5></a>
                    </div>
                </div>


                <div className='week5'>
                <h4 className='weekT4'>Documentations / Presentations Evaluation</h4>
                <div>
                                            {isAdmin &&
                                                <div style={{width:180}}>
                                                    <button
                                                        onClick={() => add()}
                                                    >
                                                        &nbsp;Add
                                                    </button>
                                                </div>

                                            }</div>
                <div className='inside'>
                {document.map((Document, key) => (
                    <div key={key}>
                        <div className="p-3" style={{ overflowX: 'auto', width: 1500,marginLeft:-50 }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ width: 260 }}>{Document.subName}</td>
                                        <td style={{ width: 400 }}>{Document.details}</td>
                                        

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
</div>
</div>
        </div>
        </div>
    )
}

export default Modulepage