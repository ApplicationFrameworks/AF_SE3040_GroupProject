import React from 'react'
import Aos from "aos";
import "aos/dist/aos.css"

function Intro() {

    Aos.init({duration:2000})

    return (
            <div className="">
                <div className="row introCard">
                    <div className="col-7 px-5 pt-5">
                        <div data-aos="fade-up" style={{left:-70,position:'relative',top:70}}>
                            <h1>Welcome to the faculty of computing</h1>
                        </div>
                        <br/>
                        <div data-aos="fade" className="px-6 pt-3 text-muted" style={{left:-40,position:'relative',top:100}}>
                            <p style={{fontSize:20}}>
                            The SLIIT Faculty of Computing is equipped with a range of courses specialising in various arms of the IT sector. Students are able to choose a path that is most in line with their requirements, allowing them to pursue substantial careers in their selected field.

Combined with an in-house lecturer panel, expansive computer laboratories and hands-on learning, SLIIT provides its Faculty of Computing students with the ideal environment to develop their computing skills.

Our computing degrees are awarded by SLIIT as approved by the University Grants Commission. Students have the option of studying the Curtin University Offshore programmers in Sri Lanka right here at SLIIT.
                            </p>
                        </div>
                    </div>
                    <br/><br/>
                    <div className="col-5 pb-5" style={{top:120,position:'relative'}}>
                        <img src={require('../../../../public/images/intro.png')}  alt="download from store" width="600px" />
                    </div>
                </div>
            </div>
    )
}

export default Intro
