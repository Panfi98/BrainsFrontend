import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";
import {BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
