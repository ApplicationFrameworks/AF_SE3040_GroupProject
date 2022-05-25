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


function App() {
    return (
        <Router>
            <Switch>
            <Route path="/staffRegister" exact component={StaffSignUp} />
            <Route path="/staffLogin" exact component={StaffLogin} />
            <Route path="/staffProfile" exact component={StaffProfile} />
            <Route path="/staff/update/:id" exact component={StaffUpdate}/> 
            <Route path="/staff/all" exact component={DisplayStaff}/> 
            <Route path="/staff/all/:id" exact component={SingleStaff}/>
            <Route path="/tdocAdd" exact component={DocumentSubmission}/>
            <Route path="/tdocView" exact component={ViewSubmissions}/> 
            <Route path="/tdocView/:id" exact component={OneSubmission}/> 
            </Switch>
        </Router>
    );
}

export default App;