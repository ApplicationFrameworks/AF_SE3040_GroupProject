import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {OutlinedInput} from "@material-ui/core";
import axios from 'axios';

function ViewOneChat(props) {

    const [id, setId] = useState("");
    const[group,setGroup]=useState("");
    const[topic,setTopic]=useState("");
    const[leader,setLeader]=useState(""); 
    const[message,setMessage]=useState("");
    const[reply,setReply]=useState(""); 
    const history = useHistory();
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

        if (localStorage.getItem("staffAuthToken")) {
            setIsAdmin(true)
        }

        async function fetchChat() {
            axios.get(`http://localhost:8070/chatmsg/onechat/${props.match.params.id}`).then((res) => {
                setId(res.data.chat._id)    
                setGroup(res.data.chat.group)
                setTopic(res.data.chat.topic)
                setLeader(res.data.chat.leader)
                setMessage(res.data.chat.message)
                setReply(res.data.chat.reply)
            }).catch((error) => {
                alert("Failed to fetch data")
            })
        }
        fetchChat();
    }, [props]);

    // function update(id){
    //     history.push(`/chatmsg/updateChat/${id}`);
    //   }

    return (
        <div>
        <div style={{ width: '1000px', height: '900px' }}>
            <div className="container" align="left" >
            <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Reply to Chat</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_sub">
            <form >
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <br /><br />
                            <div>
                                
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="group" id="group" value={group} placeholder="Group ID" required fullWidth
                                            onChange={(e)=>setGroup(e.target.value)}
                                            inputProps={{ style: { padding: 12 } }}
                                        />
                                    </div>
                                </div>

                                
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput
                                            type="topic" id="topic" value={topic} placeholder="Your Topic" required fullWidth
                                            onChange={(e)=>setTopic(e.target.value)}
                                            inputProps={{style: { padding: 12 } }} 
                                        />
                                    </div>
                                </div>

                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="leader" id="leader" value={leader} placeholder="Group Leader" required fullWidth
                                            onChange={(e)=>setLeader(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="textarea" id="message" value={message} placeholder="Enter Message" required fullWidth
                                            onChange={(e)=>setMessage(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                
                    
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                    
                                    <button className="btn btn-primary">
                                       <a href={`/updateChat/${id}`}>
                                    Rply
                                     </a>
                </button>
                                    </div>
                                </div>
                            </div>
                                  
                           
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

export default ViewOneChat