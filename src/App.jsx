import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import {Routes,Route,useLocation} from 'react-router-dom';
import Dashboard from "./Components/Dashboard.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import FirstPage from "./Components/FirstPage/FirstPage.jsx";
import YourApplications from "./Components/Your Applications/YourApplications.jsx";
import StagePersonInfo from './Components/CVmaker/StagePersonInfo.jsx';
import StageEducationInfo from './Components/CVmaker/StageEducationInfo.jsx';
import StageProjectInfo from './Components/CVmaker/StageProjectInfo.jsx';
import StageSkillsInfo from './Components/CVmaker/StageSkillsInfo.jsx';
import StageExperienceInfo from './Components/CVmaker/StageExperienceInfo.jsx';
import StageCertificationInfo from './Components/CVmaker/StageCertificationInfo.jsx';
import Profile from './Components/ProfilePage/Profile.jsx';
import {SignUp} from "./Components/Authorization/SignUp.jsx";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="grid-container">
        {(location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/signup") && <Navbar />}
          <Routes>
            <Route path="/" element={<FirstPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/your-applications" element={<YourApplications />}/>
            <Route path="/stage-person-info" element={<StagePersonInfo />}/>
            <Route path="/stage-education-info" element={<StageEducationInfo />}/>
            <Route path="/stage-projects-info" element={<StageProjectInfo />}/>
            <Route path="/stage-skills-info" element={<StageSkillsInfo />}/>
            <Route path="/stage-experience-info" element={<StageExperienceInfo />}/>
            <Route path="/stage-certification-info" element={<StageCertificationInfo />}/>
          </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
