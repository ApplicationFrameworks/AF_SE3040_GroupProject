import { useState } from 'react';
import axios from 'axios';
import './ResearchDocSubmission.css'
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";

//research documents submitting function
function ResearchDocumentSubmission() {

    const[group,setGroup]=useState("");
    const[topic,setTopic]=useState("");
    const[leader,setLeader]=useState(""); 
    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

    //handling the file uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded file
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    

    async function add(event){
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        let url
        

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "research_doc")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) =>{
                    url = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newDocument = { group,topic,leader,url }
        
        try {
            await axios.post("http://localhost:8070/researchdoc/add", newDocument , config)
            alert("Research Document Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Document can't be Added");
        }
    }
    
    return (
<div>
<div style={{ width: '1000px', height: '900px' }}>
    <div className="container" align="left" >
        <div className="row">
            <div className="col-12">
            <br></br>  <br></br>
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2 style={{marginLeft:400}}>&nbsp;Research Documents Submission</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_sub" style={{marginLeft:400}}>
            <form onSubmit={add} className="addDoc01">
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
                            </div>
                                  
                           
                        </div>

                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <div>
                            {previewSource ? 
                                 <img className="previewImgsub" />
                                 :
                                 <img className="previewImgsub"  />
                             }
                            
                            <div className="form-group04">
                            <label className='label2'>Upload Your Research Documents</label>
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />

                                    <Button color="primary" variant="contained" component="span" className='upBtn'>
                                        <AddAPhotoIcon/> &nbsp; &nbsp; Upload Document
                                    </Button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Submit" />
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

export default ResearchDocumentSubmission