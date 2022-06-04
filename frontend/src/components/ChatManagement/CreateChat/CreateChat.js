import React, {useState} from "react";
import {OutlinedInput} from "@material-ui/core";

//import './CreateChat.css';
import axios from "axios";


function CreateChat() {

    const[group,setGroup]=useState("");
    const[topic,setTopic]=useState("");
    const[leader,setLeader]=useState(""); 
    const[message,setMessage]=useState("");
    const[reply,setReply]=useState(""); 


    async function add(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };

        const newchat = {
           group,
           topic,
           leader,
           message,
           reply

        }

        try {

            await axios.post("http://localhost:8070/chatmsg/addchat", newchat, config);
            alert("Chat created successfully")
            event.target.reset();
        } catch (error) {
            alert("failed to create chat!");

        }

    }

    return (
    <div align="center">
        <div style={{ width: '1000px', height: '900px' }}>
            <div className="container" align="left" >
            <br /><br />
            <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                
                    <h2>&nbsp;Chat with groups | Create your chat</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_sub">
            <form onSubmit={add} className="addDoc">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <br /><br />
                            <div>
                                <label className='label1'>Group ID</label><br /><br />
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="group" id="group" placeholder="Group ID" required fullWidth
                                            onChange={(e)=>setGroup(e.target.value)}
                                            inputProps={{ style: { padding: 12 } }}
                                        />
                                    </div>
                                </div>

                                <label className='label1'>Research Topic</label><br /><br />
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput
                                            type="topic" id="topic" placeholder="Your Topic" required fullWidth
                                            onChange={(e)=>setTopic(e.target.value)}
                                            inputProps={{style: { padding: 12 } }} 
                                        />
                                    </div>
                                </div>

                                <label className='label1'>Group Leader</label><br /><br />
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="leader" id="leader" placeholder="Group Leader" required fullWidth
                                            onChange={(e)=>setLeader(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <label className='label1'>Message</label><br /><br />
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="textarea" id="leader" placeholder="Enter Message" required fullWidth
                                            onChange={(e)=>setMessage(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                
                            </div>
                                  
                           
                        </div>

                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group" align="center">
                            <input className="btn btn-primary" type="submit" value="Create" />
                        </div>
                    </div>
                </div>
            </form>            
        </div>                    
    </div>
    </div>
</div>
        
    )
}

export default CreateChat