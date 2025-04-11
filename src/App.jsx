import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import {Routes,Route} from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
