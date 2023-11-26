import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { SingupError } from "../modals/ErrorModal";
import { SuccessModal } from "../modals/SuccesModal";
import { Loader } from "../modals/LoaderModal";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const nav = useNavigate();
    const [credentials, setCredentials] = useState({ "name": "", "email": "", "password": "", "role": "" });
    const context = useContext(userContext);
    const [showSingupError, setShowSingupError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    let [user, setUser] = useState({});
    let { signup, getUser } = context;

    useEffect(() => {
        if (isAuthenticated) {
            getUser()
                .then((data) => {
                    setUser(data);
                })
        }
    }, []);

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        await signup(credentials)
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                    setCredentials({ "name": "", "email": "", "password": "", "role": "" });
                    setShowSingupError(true);
                }
                else if (data.user) {
                    setErrors([{ "msg": "This email is already registered" }]);
                    setCredentials({ "name": "", "email": "", "password": "", "role": "" });
                    setShowSingupError(true);
                }
                else {
                    setCredentials({ "name": "", "email": "", "password": "", "role": "" });

                    setShowLoader(true);
                    setTimeout(()=>{
                        setShowLoader(false);
                        setShowSuccess(true);
                        setTimeout(()=>{
                            nav("/login");
                        }, 500)
                    }, 500)
                }
            })
            .catch((err) => {
                setErrors([{ "msg": err.message }]);
                setShowSingupError(true);
            })
    }

    return (
        <>
            {isAuthenticated
                ?
                <>
                    <div className="flex items-center justify-center my-5">Already signed up as {user.name}</div>
                </> :
                <>
                    <form className="w-2/5 mx-auto my-5 text-lg flex flex-col items-center space-y-3" id="signupForm" onSubmit={handleSignup}>
                        <p>Name</p>
                        <input className="border border-black px-2 py-1 rounded-md" type="text" name="name" value={credentials.name} onChange={handleOnChange} />
                        <p>Email</p>
                        <input className="border border-black px-2 py-1 rounded-md" type="email" name="email" value={credentials.email} onChange={handleOnChange} />
                        <p>Password</p>
                        <input className="border border-black px-2 py-1 rounded-md" type="password" name="password" value={credentials.password} onChange={handleOnChange} />
                        <p>Role</p>
                        <select className="border border-black px-2 py-1 rounded-md" name="role" value={credentials.role} onChange={handleOnChange}>
                            <option value="" disabled>Select a Role</option>
                            <option value="donor">Donor</option>
                            <option value="admin">Admin</option>
                            <option value="agent">Agent</option>
                        </select>
                        <button to="/login" className="rounded-md mx-2 px-2 py-1 w-fit cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Signup</button>
                    </form>
                    <SingupError errors={errors} onClose={() => setShowSingupError(false)} showError={showSingupError} />
                    <SuccessModal showSuccess={showSuccess} message="Signup Successful" onClose={() => setShowSuccess(false)} />
                    <Loader showLoader={showLoader} />
                </>
            }
        </>
    )
}

export default Signup