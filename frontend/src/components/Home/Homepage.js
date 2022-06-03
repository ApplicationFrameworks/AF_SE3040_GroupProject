import React from 'react'
import Intro from './Intro/Intro'
import './Homepage.css'


import { useHistory } from 'react-router-dom';

function Homepage() {

    const history = useHistory()

    
    return (
        <div>

<img className="banner" src={require('../../../public/images/banner.png')} style={{width:1798,height:660,marginTop:-5}}/>
        <div className="container">
            
            
           
            <Intro/>      

            <div className="row my-4">
                <div className="col-5">
                </div>                 
            </div>

            <div className="row">
                <div className="div_slides">
                    <br/> <br/>

                    <div className="slidershow1 middle1">
                        <div className="slides">
                            <input type="radio" name="r" id="r1"/>
                            <input type="radio" name="r" id="r2"/>
                            <input type="radio" name="r" id="r3"/>
                            <input type="radio" name="r" id="r4"/>
                            <input type="radio" name="r" id="r5"/>
                            <div class="slide s1">
                                <div className="container2">
                                    <img
                                        src={require('../../../public/images/system.jpg')}
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text" align="center">BSc (Hons) in Information Technology
Specialising in Information Systems Engineering</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp1.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp2.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp3.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="navigation">
                            <label for="r1" class="bar"></label>
                            <label for="r2" class="bar"></label>
                            <label for="r3" class="bar"></label>
                            <label for="r4" class="bar"></label>
                            <label for="r5" class="bar"></label>
                        </div>
                    </div>


                    <div className="slidershow2 middle2">
                        <div className="slides">
                            <input type="radio" name="r" id="r6" checked/>
                            <input type="radio" name="r" id="r7"/>
                            <input type="radio" name="r" id="r8"/>
                            <input type="radio" name="r" id="r9"/>
                            <input type="radio" name="r" id="r10"/>
                            <div class="slide s1">
                                <div className="container2">
                                    <img
                                        src={require('../../../public/images/net.jpg')}
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">BSc (Hons) in Information Technology
Specialising in Computer Systems & Network Engineering</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="navigation">
                            <label for="r6" class="bar"></label>
                            <label for="r7" class="bar"></label>
                            <label for="r8" class="bar"></label>
                            <label for="r9" class="bar"></label>
                            <label for="r10" class="bar"></label>
                        </div>
                    </div>


                    <div className="slidershow3 middle3">
                        <div className="slides">
                            <input type="radio" name="r" id="r11" checked/>
                            <input type="radio" name="r" id="r12"/>
                            <input type="radio" name="r" id="r13"/>
                            <input type="radio" name="r" id="r14"/>
                            <input type="radio" name="r" id="r15"/>
                            <div class="slide s1">
                                <div className="container2">
                                    <img
                                        src={require('../../../public/images/software.jpg')}
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                        <div className="text">BSc (Hons) in Information Technology
Specialising in Software Engineering</div>
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="slide">
                                <div className="container2">
                                    <img
                                        src="../images/downloadApp.jpg"
                                        alt="Avatar"
                                        className="image"
                                    />
                                    <div className="overlay">
                                       
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="navigation">
                            <label for="r11" class="bar"></label>
                            <label for="r12" class="bar"></label>
                            <label for="r13" class="bar"></label>
                            <label for="r14" class="bar"></label>
                            <label for="r15" class="bar"></label>
                        </div>
                    </div>
                </div>
            </div>

            <p style={{fontSize:20}}>
                            The SLIIT Faculty of Computing is equipped with a range of courses specialising in various arms of the IT sector. Students are able to choose a path that is most in line with their requirements, allowing them to pursue substantial careers in their selected field.

Combined with an in-house lecturer panel, expansive computer laboratories and hands-on learning, SLIIT provides its Faculty of Computing students with the ideal environment to develop their computing skills.

Our computing degrees are awarded by SLIIT as approved by the University Grants Commission. Our computing degrees are awarded by SLIIT as approved by the University Grants Commission. The institute is also a Member of the Association of Commonwealth Universities and International Association of Universities (IAU).

Students have the option of studying the Curtin University Offshore programmers in Sri Lanka right here at SLIIT. Students can also complete their degree at one of SLIIT’s partner universities in UK, USA, Canada and Australia.
                            </p>
        </div>
        </div>
    )
}

export default Homepage