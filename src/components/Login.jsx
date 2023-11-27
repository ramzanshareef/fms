import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { LoginError } from "../modals/ErrorModal";
import { Loader } from "../modals/LoaderModal";

const Login = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const nav = useNavigate();
    const [credentials, setCredentials] = useState({ "email": "", "password": "" });
    const context = useContext(userContext);
    const [showLoginError, setShowLoginError] = useState(false);
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    let { login, getUser } = context;
    let [user, setUser] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            getUser()
                .then((data) => {
                    setUser(data);
                    setShowLoader(false);
                })
        }
    }, []);

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        await login(credentials)
            .then((data) => {
                if (data.user) {
                    document.cookie = "isAuthenticated=true";
                    document.cookie = "is" + data.user.role + "=true";
                    document.location.href = process.env.REACT_APP_FRONTEND_URL;
                }
                else {
                    setError(data);
                    setShowLoginError(true);
                    setShowLoader(false);
                }
            })
    }

    return (
        <>
            {isAuthenticated
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
                    <LoginError showError={showLoginError} error={error} onClose={() => setShowLoginError(false)} />
                    <Loader showLoader={showLoader} />
                </>}
        </>
    )
}

export default Login