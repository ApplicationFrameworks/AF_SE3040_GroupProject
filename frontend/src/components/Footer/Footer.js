import React from 'react'
import './Footer.css'
import { blue} from '@material-ui/core/colors';
import {Link,useHistory } from 'react-router-dom'; 
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RateReviewIcon from '@material-ui/icons/RateReview';
import GoogleMap from '../GoogleMap/GoogleMap';

function Footer() {
    const history=useHistory();
    function RateUs(){
        history.push("/student/review")
    }
    return (
        <footer className="px-5">
            <div className="">
                <div className="row">
                    <div className="col-xl-1" align="center">
                        <br/>
                        <img src={require('../../../public/images/Logo.png')} className="logoFooter" alt="logo"/>
                    </div>
                    <div className="col-xl-3"style={{ paddingLeft: 70 }}>
                        <br/>
                        <p>
                            This website is mainly focused on the current pandemic  situation of our country.
                            We hope to monitor the current situation of the country by making awareness     
                        </p>
                    </div>
                    <div className="col-xl-2" align="center">
                        <h3>Links</h3>
                        <ul className="list-group">
                            <li><Link to="/" style={{ color: '#FFF' }}>Home</Link></li>
                            <li><Link to="/module"  style={{ color: '#FFF' }}>Module</Link></li>
                            <li><Link to=""  style={{ color: '#FFF' }}>About Us</Link></li>
                            <li><Link to=""  style={{ color: '#FFF' }}>Contacts</Link></li>
                            <li><Link to="/admin/signin"  style={{ color: '#FFF' }}>Admin</Link></li>
                        </ul>
                    </div>
                    <div className="col-xl-3" >
                        <h3>&nbsp;Reach Us On </h3>
                        <br/>
                        <p><LocationOnIcon fontSize="small"/>&nbsp;No 14, New Kandy Road, Malabe</p>
                        <p><EmailIcon fontSize="small"/>&nbsp; info.researchcamp@gmail.com</p>
                        <p><PhoneIcon fontSize="small"/>&nbsp;011 - 277203999</p>
                    </div>
                    <div className="col-xl-3"align="center">
                        <h5> We value your feedback</h5>    
                        <Rating name="size-large" defaultValue={5} size="large"  />
                        <br/><br/>
                        <Button variant="contained" style={{backgroundColor:blue[500],color:'white'}} endIcon={<RateReviewIcon/>}
                                onClick={RateUs} >
                            Rate US 
                        </Button> 
                        <br/> <br/>
                        <span>
                            <img src="https://img.icons8.com/color/48/000000/facebook-circled--v4.png" alt="facebook"/>
                            <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="instagram"/>
                            <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png" alt="twitter"/>
                        </span>
<br/>
                        <div className="col-xl-12 text-center" style={{right:620,position:'relative'}}> 
                    <p className ="mb-0"> SLIIT Research Camp ?? 2022 - All Rights Reserved</p>
                </div>
                        
                        <div className="map" style={{width:1856,height:200,position:'relative',left:-1400,top:30}}>
                        <div>
                            <GoogleMap />
                        </div>
                    </div>
               
                    </div>
                </div>
                
            </div>
        </footer>
    )
}

export default Footer
