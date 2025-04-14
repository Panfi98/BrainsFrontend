import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import {Routes,Route,useLocation} from 'react-router-dom';
import Dashboard from "./Components/Dashboard.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import FirstPage from "./Components/FirstPage/FirstPage.jsx";
import YourApplications from "./Components/Your Applications/YourApplications.jsx";
import CVmaker from './Components/CVmaker/CVmaker.jsx';


function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <div className="grid-container">
        {(location.pathname !== "/login" && location.pathname !== "/") && <Navbar />}
          <Routes>
            <Route path="/" element={<FirstPage />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/your-applications" element={<YourApplications />}/>
            <Route path="/cv" element={<CVmaker />}/>
          </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
