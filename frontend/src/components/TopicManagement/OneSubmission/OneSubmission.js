import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './OneSubmission.css'
import axios from 'axios'
import { orange, blue, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';



function OneSubmission(props) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [id, setId] = useState("");
    const [topic, setTopic] = useState("");
    const [group, setGroup] = useState("");
    const [leader, setLeader] = useState("");
    const [details, setDetails] = useState("");
    const [url, setUrl] = useState("");
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

        if (localStorage.getItem("staffAuthToken")) {
            setIsAdmin(true)
        }
        async function getDocumentDetails() {
            axios.get(`http://localhost:8070/tdoc/one/${props.match.params.id}`).then((res) => {
                setId(res.data.document._id)
                setTopic(res.data.document.topic)
                setGroup(res.data.document.group)
                setDetails(res.data.document.details)
                setLeader(res.data.document.leader)
                setUrl(res.data.document.url)
            }).catch((err) => {
                alert("Failed to Fetch Details")
            })
        }
        getDocumentDetails();

    }, [props])


    function Pdf(url) {
        window.open(url);
    }


    return (
        <div className="container" align="center">
            <div className="detailProductCard" >
                <div className="detailProduct">
                    <div className="box-detailProduct">
                        <div className="row">
                            <h2>{topic}</h2>
                            <h2>{group}</h2>
                            <h2>{leader}</h2>
                            <h2>{details}</h2>
                            <IconButton onClick={() =>Pdf(`${url}`)}>
                                <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center' }} ></PictureAsPdfIcon>
                            </IconButton>
                        </div>

                    </div>
                </div>
                <table className="singleItemBtn" >
                    <div> <div>
                                <button className="mx-2 productBtn" style={{ backgroundColor: blue[400] }}>
                                    Approval
                                </button>
                            </div>
                    </div>
                </table>
            </div>
            <br></br>

            <div>


            </div>
        </div>
    )
}

export default OneSubmission
