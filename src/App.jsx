import { useState } from "react";
import { Login } from "./Components/Authorization/Login.jsx";
import { User } from "./User/MainUser.jsx";

function App() {
    const [authToken, setAuthToken] = useState("");  // Для хранения токена

    return (
        <>
            <Login setAuthToken={setAuthToken} authToken={authToken} />  {/* Передаем setAuthToken как пропс */}
            <User authToken={authToken} />  {/* Передаем токен в компонент User */}
        </>
    );
}

export default App;
