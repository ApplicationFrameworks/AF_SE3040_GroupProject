import React, {useEffect, useState} from 'react';
import { useHistory, useLocation,Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@mui/icons-material/People';
import onClickOutside from "react-onclickoutside";
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import axios from 'axios';
import './Header.css';
import './Sidebar.css';

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState("");
    const [URL, setURL] = useState("/student");
    const history = useHistory();
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);

    const SidebarItem = [
        {
          title: 'Home',
          path: '/',
          icon: <HomeIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Profile',
           path: `${URL}/profile`,
          icon: <PersonIcon/>,
          cName: 'nav-text'
        },
        {
            title: 'Supervisours',
            path: '/staff/all',
            icon: <PeopleIcon/>,
            cName: 'nav-text'
        },
        {
          title: 'Research Topic',
          path: `/tdocView`,
          icon: <AssignmentIcon/>,
          cName: 'nav-text'
        },
        {
            title: 'Research Documents',
            path: `/researchdocView`,
            icon: <AssignmentIcon/>,
            cName: 'nav-text'
        },
        {
            title: 'Chat With Groups',
            path: '/chatView',
            icon: <PeopleIcon/>,
            cName: 'nav-text'
        },
        {
          title: 'Prescriptions',
          path: `/prescription/history/${user._id}`,
          icon: <AssignmentIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Cart',
          path: `/cart/${user._id}/shopping`,
          icon: <ShoppingCartIcon />,
          cName: 'nav-text'
        },
        {
            title: 'Payment',
            path: `/patient/payment/${user._id}`,
            icon: <MonetizationOnIcon />,
            cName: 'nav-text'
        },
        {
            title: 'Feedback',
            path: `/patient/review/${user._id}`,
            icon: <FeedbackIcon />,
            cName: 'nav-text'
        }
    ];

    useEffect(() => {
        //check whether user has signed in
        if(localStorage.getItem("studentAuthToken") || localStorage.getItem("staffAuthToken") || localStorage.getItem("adminAuthToken") ){
            setIsSignedIn(true)

            //get user data
            if(localStorage.getItem("user")){
                setUser(JSON.parse(localStorage.getItem('user')))
            }
            

            if(localStorage.getItem("studentAuthToken")){
                setURL(`/student`)
            }

            if(localStorage.getItem("staffAuthToken")){
                setURL(`/staff`)
            }
        }else{
            setIsSignedIn(false)
        }
    }, [user._id,location])

    function profile() {
        history.push(`${URL}/profile/`)
    }


    function signin() {
        history.push('/student/signin')
    }

    function signup() {
        history.push('/student/signup')
    }
    
    //logout
    async function logout(){
        localStorage.clear();
        history.push('/')
    }

    const showSidebar = () => setSidebar(!sidebar);

    Header.handleClickOutside = () => setSidebar(false);

    function home(){
        history.push('/')
    }
    
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-expand-lg navbar-light fixed-top header-bg">
                    <div className="container-fluid ">
                        <ul>
                            {sidebar ? <IconButton><DehazeIcon fontSize="large" style={{ color: blue[0] }}/></IconButton> :
                            <IconButton onClick={showSidebar}>
                                <DehazeIcon fontSize="large"/>
                            </IconButton>
                            }      
                        </ul>
                        <div className="header-title">
                            <h3 onClick={home}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SLIIT &nbsp; Research &nbsp; Camp</h3>
                        </div>
                        <ul className="mx-3">
                            {isSignedIn ?
                                <div>
                                    <IconButton onClick={profile}>
                                        <Avatar alt="user" src={`${user.imgUrl}`} />
                                    </IconButton> 
                                </div>
                                :
                                <div>
                                    <button className="btn btn-outline-primary mx-2" onClick={signin}>
                                        Sign In
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={signup}>
                                        Sign Up
                                    </button>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='mb-4 mt-3' align="center">
                            <img src="/images/Logo.png" width="150px" alt="logo"/>
                        </li>
                        {SidebarItem.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className="nav-span">{item.title}</span>
                                </Link>
                            </li>
                        );
                        })}
                        {isSignedIn &&
                            <div className="sidebar-bottom" align="center">
                                <Button variant="contained" color="secondary" disableElevation size="small" onClick={logout}
                                endIcon={<ExitToAppIcon/>}>
                                    Log Out  
                                </Button>
                            </div>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Header.handleClickOutside
};

export default onClickOutside(Header, clickOutsideConfig);