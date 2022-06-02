import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DisplayStaff from "./src/components/StaffManagement/DisplayStaff/DisplayStaff";
import SingleStaff from "./src/components/StaffManagement/SingleStaff/SingleStaff";
import StaffLogin from "./src/components/StaffManagement/StaffLogin/StaffLogin";
import StaffProfile from "./src/components/StaffManagement/StaffProfile/StaffProfile";
import StaffSignUp from "./src/components/StaffManagement/StaffSignUp/StaffSignUp";
import StaffUpdate from "./src/components/StaffManagement/StaffUpdate/StaffUpdate";
import DocumentSubmission from "./src/components/TopicManagement/DocumentSubmission/DocumentSubmission";
import OneSubmission from "./src/components/TopicManagement/OneSubmission/OneSubmission";
import ViewSubmissions from "./src/components/TopicManagement/ViewSubmissions/ViewSubmissions";
import Homepage from './src/components/Home/Homepage';
import Header from './src/components/Header/Header';
import Footer from './src/components/Footer/Footer';
import AdminSignIn from './src/components/AdminManagement/AdminLogin';
import StudentSignIn from './src/components/StudentManagement/SignIn/SignIn';
import StudentSignUp from './src/components/StudentManagement/SignUp/SignUp';
import AddRequest from "./src/components/RequestManagement/AddRequest";
import DisplayRequest from "./src/components/RequestManagement/DisplayRequest";
import AddTopics from "./src/components/TopicManagement/AddTopics/AddTopics";
import ViewTopics from "./src/components/TopicManagement/ViewTopics/VIewTopics";
import Modulepage from "./src/components/ModulePage/ModulePage";


function App() {
    return (
        <Router>
            <Header/>
            <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/module" exact component={Modulepage} />
            <Route path="/student/signin" exact component={StudentSignIn} />
            <Route path="/student/signup" exact component={StudentSignUp} />
            <Route path="/staff/register" exact component={StaffSignUp} />
            <Route path="/staff/login" exact component={StaffLogin} />
            <Route path="/staff/profile" exact component={StaffProfile} />
            <Route path="/staff/update/:id" exact component={StaffUpdate}/> 
            <Route path="/staff/all" exact component={DisplayStaff}/> 
            <Route path="/staff/all/:id" exact component={SingleStaff}/>
            <Route path="/topic/add" exact component={AddTopics}/>
            <Route path="/topic/view" exact component={ViewTopics}/>
            <Route path="/tdocAdd" exact component={DocumentSubmission}/>
            <Route path="/tdocView" exact component={ViewSubmissions}/> 
            <Route path="/tdocView/:id" exact component={OneSubmission}/> 
            <Route path="/admin/signin" exact component={AdminSignIn} />
            <Route path="/student/request/:id" exact component={AddRequest}/>
            <Route path="/request/:id" exact component={DisplayRequest}/>
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;