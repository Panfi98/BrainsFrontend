import './App.css'
import {Login} from "./Components/Authorization/Login.jsx";
import {AuthProvider} from "./Context/AuthContext.jsx";

function App() {


  return (
    <AuthProvider>
      <Login/>
    </AuthProvider>
  )
}

export default App
