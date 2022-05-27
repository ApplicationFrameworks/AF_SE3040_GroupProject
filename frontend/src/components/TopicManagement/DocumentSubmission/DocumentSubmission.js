import { useState } from 'react';
import axios from 'axios';
import './DocumentSubmission.css'
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";


function DocumentSubmission() {

    const[group,setGroup]=useState("");
    const[topic,setTopic]=useState("");
    const[leader,setLeader]=useState(""); 
    const[details,setDetails]=useState("");

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded image
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
            formData.append("upload_preset", "topic_doc")

           
            try {
                await axios.post("https://api.cloudinary.com/v1_1/movie-reservation/image/upload", formData).then((res) =>{
                    url = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newDocument = {group,topic,leader,details,url}
        
        try {
            await axios.post("http://localhost:8070/tdoc/add", newDocument , config)
            alert("Document Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Document can't be Added");
        }
    }
    
    return (
    <div className="container" align="center" >
        <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;topic Documents Submission</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_product">
            <form onSubmit={add} className="addProduct">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-md-8 mb-4">
                            <div className="col-md-8 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="group" id="group" placeholder="Group ID" required fullWidth
                                            onChange={(e)=>setGroup(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 mb-4">
                                <div className="form-group">
                                    <OutlinedInput
                                        type="topic" id="topic" placeholder="Your Topic" 
                                        required fullWidth
                                        onChange={(e)=>setTopic(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                                </div>

                                <div className="col-md-8 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="leader" id="leader" placeholder="Group Leader" required fullWidth
                                            onChange={(e)=>setLeader(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div> 
                                <div className="col-md-8 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="details" id="details" placeholder="Group Details" required fullWidth
                                            onChange={(e)=>setDetails(e.target.value)}
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
                                <img src={previewSource} alt="preview" className="previewImgProduct"/>
                            :
                                <img src="/images/product.png" className="previewImgProduct" alt="product pic"/>
                            }
                            <div className="form-group">
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

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload document
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


        
    )
}

export default DocumentSubmission