import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {OutlinedInput} from "@material-ui/core";
import axios from 'axios';

function UpdateChat(props) {

    const[group,setGroup]=useState("");
    const[topic,setTopic]=useState("");
    const[leader,setLeader]=useState(""); 
    const[message,setMessage]=useState("");
    const[reply,setReply]=useState(""); 
    const history = useHistory();

    useEffect(() => {
        async function fetchChat() {
            await axios.get(`http://localhost:8070/chatmsg/onechat/${props.match.params.id}`).then((res) => {
                setGroup(res.data.chat.group)
                setTopic(res.data.chat.topic)
                setLeader(res.data.chat.leader)
                setMessage(res.data.chat.message)
                setReply(res.data.chat.reply)
            }).catch((error) => {
                alert("Failed to fetch data")
            })
        }

        fetchChat()
    }, [props]);

    async function update(event) {
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json",
            }
        };

        const updatedChat = {
            group,
            topic,
            leader,
            message,
            reply
        }

        try {
            await axios.put(`http://localhost:8070/chatmsg/updatechat/${props.match.params.id}`, updatedChat, config);
            alert("Reply Sent Successfully")
            //history.push('/chat/chats')
        } catch (error) {
            alert("Reply Sent Unsuccess!")
        }
    }

    return (
        <div align="center">
               <br></br>   <br></br>   <br></br>
        <div style={{ width: '1000px', height: '900px' }}>
            <div className="container" align="left" >
            <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Reply to Message</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_sub">
            <form onSubmit={update} className="addDoc">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <br /><br />
                            <div>
                                
                            <label className='label1'>Message from: </label>
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="group" id="group" value={group} placeholder="Group ID" required fullWidth disabled
                                            onChange={(e)=>setGroup(e.target.value)}
                                            inputProps={{ style: { padding: 12 } }}
                                        />
                                    </div>
                                </div>

                                
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput
                                            type="topic" id="topic" value={topic} placeholder="Your Topic" required fullWidth disabled
                                            onChange={(e)=>setTopic(e.target.value)}
                                            inputProps={{style: { padding: 12 } }} 
                                        />
                                    </div>
                                </div>

                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="leader" id="leader" value={leader} placeholder="Group Leader" required fullWidth disabled
                                            onChange={(e)=>setLeader(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <label className='label1'>Message : </label>
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="textarea" id="message" value={message} placeholder="Enter Message" required fullWidth disabled
                                            onChange={(e)=>setMessage(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <label className='label1'>Reply : </label>
                                <div className="col-md-10 mb-4">
                                    <div className="form-group3">
                                        <OutlinedInput 
                                            type="textarea" id="reply" value={reply} placeholder="Enter Rply" fullWidth
                                            onChange={(e)=>setReply(e.target.value)}
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
                            <input className="btn btn-info" type="submit" value="Send" />
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

export default UpdateChat