import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { SingupError } from "../modals/ErrorModal";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
    const nav = useNavigate();
    const [credentials, setCredentials] = useState({ "name": "", "email": "", "password": "", "role": "" });
    const context = useContext(userContext);
    const [showSingupError, setShowSingupError] = useState(false);
    const [errors, setErrors] = useState([]);
    let [user, setUser] = useState({});
    let { getUser } = context;
    useEffect(() => {
        getUser()
            .then((data) => {
                setUser(data);
            })
    }, []);
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch(backendURL + "/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, role: credentials.role })
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            nav("/login");
            window.location.reload();
        }
        else {
            if (jsonData.errors) {
                setErrors(jsonData.errors);
                setShowSingupError(true);
            }
            else {
                console.log(jsonData.message);
            }
        }
    }
    const closeModal = () => {
        setShowSingupError(false);
    };
    return (
        <>
            { !(document.cookie.includes("isAuthenticated=true"))
            ? <>
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
                <SingupError errors={errors} onClose={closeModal} showError={showSingupError} />
            </> : <>
                <div className="flex items-center justify-center my-5">Already signed up as {user.name}</div>
            </>}
        </>
    )
}

export default Signup