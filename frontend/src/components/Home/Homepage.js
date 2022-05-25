import React from 'react'
import Intro from './Intro/Intro'


import { useHistory } from 'react-router-dom';

function Homepage() {

    const history = useHistory()

    
    return (
        <div className="container">
            <Intro/>      

            <div className="row my-4">
                <div className="col-5">
                </div>
                <div className="col-7">                  
                    <img src="../images/PharmacyHome.png" width="750px" alt="appImage" style={{ borderRadius: 400/25, paddingLeft:"10px"}}/>                    
                </div>                    
            </div>

            <div className="row">
                <div className="col-8 my-5">                    
                    <img src="../images/appStore.png" alt="download from store" width="200px" style={{position:'absolute', marginTop:'175px', marginLeft:'50px'}}/>
                    <img src="../images/downloadApp.png" width="800px" alt="appImage" style={{ borderRadius: 400/25, paddingLeft:"10px"}}/>
                </div>
                <div className="col-4 my-5">
                </div>                    
            </div>
        </div>
    )
}

export default Homepage