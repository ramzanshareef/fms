import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { LoginError } from "../modals/ErrorModal";

const Login = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const nav = useNavigate();
    const [credentials, setCredentials] = useState({ "email": "", "password": "" });
    const context = useContext(userContext);
    const [showLoginError, setShowLoginError] = useState(false);
    const [error, setError] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    let { login, getUser } = context;
    let [user, setUser] = useState({});

    useEffect(() => {
        getUser()
            .then((data) => {
                setUser(data);
            })
    }, []);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(credentials)
            .then((data) =>{
                if (data.user) {
                    document.cookie = "isAuthenticated=true";
                    document.cookie = "is" + data.user.role + "=true";
                    setShowLoading(true);
                    nav("/");
                    window.location.reload();
                }
                else{
                    setError(data.message);
                    setShowLoginError(true);
                }
            })
    }

    return (
        <>
            { isAuthenticated
                ? <>
                    <div className="flex items-center justify-center my-5">Already logged in as {user.name}!</div>

                </>
                : <>
                    <form className="w-2/5 mx-auto my-5 text-lg flex flex-col items-center space-y-3" onSubmit={handleLogin}>
                        <p>Email</p>
                        <input className="border border-black px-2 py-1" type="email" name="email" value={credentials.email} onChange={onChange} />
                        <p>Password</p>
                        <input className="border border-black px-2 py-1" type="password" name="password" value={credentials.password} onChange={onChange} />
                        <button to="/login" className="rounded-md mx-2 px-2 py-1 w-fit cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Login</button>
                    </form>
                    <LoginError showError={showLoginError} error={error} onClose={()=> setShowLoginError(false)} />
                    {showLoading && <div className="flex items-center justify-center my-5">Loading...</div>}
                </>}
        </>
    )
}

export default Login