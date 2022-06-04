import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
import VideoSubmission from "./src/components/VideoManagement/VideoSubmission/VideoSubmission";
import MarkingScheme from "./src/components/MarkingSchemeManagement/MarkingSchemeSubmission/MarkingScheme";
import ViewMarkingSchemes from "./src/components/MarkingSchemeManagement/ViewMarkingScheme/ViewMarkingSchemes";
import ViewOneMarkingScheme from "./src/components/MarkingSchemeManagement/ViewMarkingScheme/ViewOneMarkingScheme";
import ViewVideoSubmissions from "./src/components/VideoManagement/ViewVideoSubmission/ViewVideoSubmission";
import ViewOneVideoSubmission from "./src/components/VideoManagement/ViewVideoSubmission/ViewOneVideoSubmission";
import ViewMarks from "./src/components/EvaluationMarksManagement/ViewMarks/ViewMarks";
import ViewOneMark from "./src/components/EvaluationMarksManagement/ViewMarks/ViewOneMark";
import SubmissionType from "./src/components/SubmissionTypesManagement/SubmissionType";
import Profile from "./src/components/StudentManagement/Profile/Profile.js";
import UpdateProfile from "./src/components/StudentManagement/UpdateProfile/UpdateProfile.js";
import DisplayGroups from "./src/components/GroupManagement/ViewGroups/viewGroups";
import AddGroups from "./src/components/GroupManagement/AddGroups/addGroups";

function App() {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact component={Homepage}/>
                <Route path="/module" exact component={Modulepage}/>
                <Route path="/student/signin" exact component={StudentSignIn}/>
                <Route path="/student/signup" exact component={StudentSignUp}/>
                <Route path="/staff/register" exact component={StaffSignUp}/>
                <Route path="/staff/login" exact component={StaffLogin}/>
                <Route path="/staff/profile" exact component={StaffProfile}/>
                <Route path="/staff/update/:id" exact component={StaffUpdate}/>
                <Route path="/staff/all" exact component={DisplayStaff}/>
                <Route path="/staff/all/:id" exact component={SingleStaff}/>
                <Route path="/topic/add" exact component={AddTopics}/>
                <Route path="/topic/view" exact component={ViewTopics}/>
                <Route path="/tdocAdd" exact component={DocumentSubmission}/>
                <Route path="/tdocView" exact component={ViewSubmissions}/>
                <Route path="/tdocView/:id" exact component={OneSubmission}/>
                <Route path="/admin/signin" exact component={AdminSignIn}/>
                <Route path="/student/request/:id" exact component={AddRequest}/>
                <Route path="/request/:id" exact component={DisplayRequest}/>
                <Route path="/videoSubmissionAdd" exact component={VideoSubmission}/>
                <Route path="/videoSubmissionView" exact component={ViewVideoSubmissions}/>
                <Route path="/videoSubmissionView/:id" exact component={ViewOneVideoSubmission}/>
                <Route path="/markingSchemaAdd" exact component={MarkingScheme}/>
                <Route path="/markingSchemaView" exact component={ViewMarkingSchemes}/>
                <Route path="/markingSchemaView/:id" exact component={ViewOneMarkingScheme}/>
                <Route path="/evaluationMarksView" exact component={ViewMarks}/>
                <Route path="/evaluationMarksView/:id" exact component={ViewOneMark}/>
                <Route path="/submissionTypeAdd" exact component={SubmissionType}/>
                <Route path="/student/profile" exact component={Profile}/>
                <Route path="/student/updateProfile/:id" exact component={UpdateProfile}/>
                <Route path="/group/view" exact component={DisplayGroups}/>
                <Route path="/group/add" exact component={AddGroups}/>

            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;