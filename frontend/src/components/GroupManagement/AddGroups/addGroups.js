import { useState } from 'react';
import axios from 'axios';
import './addGroups.css'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';


function AddGroups() {

    const [leaderName, setLeaderName] = useState("");
    const [leaderItNo, setLeaderItNo] = useState("");
    const [leaderEmail, setLeaderEmail] = useState("");
    const [firstMemberName, setFirstMemberName] = useState("");
    const [firstMemberItNo, setFirstMemberItNo] = useState("");
    const [firstMemberEmail, setFirstMemberEmail] = useState("");
    const [secondMemberName, setSecondMemberName] = useState("");
    const [secondMemberItNo, setSecondMemberItNo] = useState("");
    const [secondMemberEmail, setSecondMemberEmail] = useState("");
    const [thirdMemberName, setThirdMemberName] = useState("");
    const [thirdMemberItNo, setThirdMemberItNo] = useState("");
    const [thirdMemberEmail, setThirdMemberEmail] = useState("");
    

    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        const newGroup = { leaderName,
            leaderItNo,
            leaderEmail,
            firstMemberName,
            firstMemberItNo,
            firstMemberEmail,
            secondMemberName,
            secondMemberItNo,
            secondMemberEmail,
            thirdMemberName,
            thirdMemberItNo,
            thirdMemberEmail}

        try {
            await axios.post("http://localhost:8070/groups/addG", newGroup, config)
            alert("Group Registration Successfull")
            event.target.reset();
        } catch (error) {
            alert("Group registration Failed");
        }
    }

    return (
        <div style={{width:'100%'}}>
        
        <div className="container main_div_group" align="left" style={{width:'600px'}}>
            <div className="row" >
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2 style={{ fontSize: '26px',fontWeight:800,marginLeft:-170 }}> <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<nobr>Group Registration</nobr></h2>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="create_group" style={{border:'3px solid orange',borderRadius:15}}>
                <form onSubmit={add} className="addgroup">
                    <br/>
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <br /><br />
                                <div>
                                    <label className='label11'>Leader Name</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Enter your name" required fullWidth
                                                onChange={(e) => setLeaderName(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>Leader IT Number</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Enter your IT number" required fullWidth
                                                onChange={(e) => setLeaderItNo(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label11'>Leader Email</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Your Email"
                                                required fullWidth
                                                onChange={(e) => setLeaderEmail(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>Member 1 Name</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Enter your name" required fullWidth
                                                onChange={(e) => setFirstMemberName(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>IT Number 1</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Enter your IT number" required fullWidth
                                                onChange={(e) => setFirstMemberItNo(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label11'>Email 1</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Your Email"
                                                required fullWidth
                                                onChange={(e) => setFirstMemberEmail(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>Member 2 Name</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Enter your name" required fullWidth
                                                onChange={(e) => setSecondMemberName(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>IT Number 2</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Enter your IT number" required fullWidth
                                                onChange={(e) => setSecondMemberItNo(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label11'>Email 2</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Your Email"
                                                required fullWidth
                                                onChange={(e) => setSecondMemberEmail(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>Member 3 Name</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="group" id="group" placeholder="Enter your name" required fullWidth
                                                onChange={(e) => setThirdMemberName(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>

                                    <label className='label11'>IT Number 3</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="details" id="details" placeholder="Enter your IT number" required fullWidth
                                                onChange={(e) => setThirdMemberItNo(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    <label className='label11'>Email 3</label><br />
                                    <div className="col-md-10 mb-4">
                                        <div className="form-group30">
                                            <OutlinedInput
                                                type="topic" id="topic" placeholder="Your Email"
                                                required fullWidth
                                                onChange={(e) => setThirdMemberEmail(e.target.value)}
                                                inputProps={{ style: { padding: 12 } }}
                                            />
                                        </div>
                                    </div>
                                    
                                    
                                </div>

                                
                            </div>


                           
                        </div>
                        <div className="form-group50">
                        <input className="btn" type="submit" value="Submit" style={{ padding: '5px 20px', borderRadius: '10px', background: 'orange', color: 'white',fontSize:'18px',position:'absolute',left:'-75%',top:'10%' }}/>
                    </div>
                    </div>


                   
                </form>
            </div>
        </div>

        
</div>



    )
}

export default AddGroups