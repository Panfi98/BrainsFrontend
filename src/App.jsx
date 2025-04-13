import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import {Routes,Route} from 'react-router-dom';
import Dashboard from "./Components/Dashboard.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";


function App() {
  return (
    <AuthProvider>
      <div className="grid-container">
        {location.pathname !== "/" && <Navbar />}
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
