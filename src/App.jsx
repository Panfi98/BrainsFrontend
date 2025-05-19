import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {SignUp} from "./Components/Authorization/SignUp.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import { ResumeProvider } from './Context/ResumeContext.jsx';
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
import StageReferenceInfo from './Components/CVmaker/StageReferenceInfo.jsx';
import CvPage from "./Components/CvPage/CvPage.jsx"
import Profile from './Components/ProfilePage/Profile.jsx';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <ResumeProvider>
        <div className="main-container">
          {(location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/signup") && <Navbar />}
            <Routes>
              <Route path="/" element={<FirstPage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/your-applications" element={<YourApplications />}/>
              <Route path="/cv" element={<StagePersonInfo />}/>
              <Route path="/cv/:id/education" element={<StageEducationInfo />}/>
              <Route path="/cv/:id/projects" element={<StageProjectInfo />}/>
              <Route path="/cv/:id/skills" element={<StageSkillsInfo />}/>
              <Route path="/cv/:id/experience" element={<StageExperienceInfo />}/>
              <Route path="/cv/:id/certification" element={<StageCertificationInfo />}/>
              <Route path="/cv/:id/reference" element={<StageReferenceInfo />}/>
              <Route path="/cv/:id/my-cv" element={<CvPage/>}/>
          </Routes>
        </div>
      </ResumeProvider>
    </AuthProvider>
  )
}

export default App