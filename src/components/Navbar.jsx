import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { userContext } from "../context/UserState";
import ProfileLogo from "../images/ProfileLogo";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const Navbar = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");
    const isAdmin = document.cookie.includes("isadmin=true");
    const isAgent = document.cookie.includes("isagent=true");
    let location = useLocation();
    const nav = useNavigate();
    const context = useContext(userContext);
    let { getUser } = context;
    let [user, setUser] = useState({});

    useEffect(() => {
        getUser()
            .then((data) => {
                setUser(data);
            })
    }, []);

    const handleLogOut = async (e) => {
        e.preventDefault();
        const response = await fetch(backendURL + "/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            document.cookie.split(";").forEach((cookie) => {
                document.cookie = cookie
                    .replace(/^ +/, "")
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });
            nav("/login");
            window.location.reload();
        } else {
            console.log(jsonData.message);
        }
    }

    return (
        <nav className="sticky top-0 z-10 p-1 bg-gray-800 text-gray-400">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                    <li className="list-none m-2 cursor-pointer text-2xl">
                        <Link to={"/"}>FMS</Link>
                    </li>
                    <li className="list-none m-2 cursor-pointer">
                        <Link to={"/"} className={`${location.pathname === "/" ? "text-white" : ""}`}>Home</Link>
                    </li>
                    {isAuthenticated
                        ? <>
                            <li className="list-none m-2 cursor-pointer">
                                <Link to={"/about"} className={`${location.pathname === "/about" ? "text-white" : ""}`}>About</Link>
                            </li>
                            <li className="list-none m-2 cursor-pointer">
                                <Link to={"/dashboard"} className={`${location.pathname === "/dashboard" ? "text-white" : ""}`}>Dashboard</Link>
                            </li>
                            {isDonor
                                ?
                                <>
                                    <li className="list-none m-2 cursor-pointer">
                                        <Link to={"/donate"} className={`${location.pathname === "/donate" ? "text-white" : ""}`}>Donate</Link>
                                    </li>
                                    <li className="list-none m-2 cursor-pointer">
                                        <Link to={"/donations/pending"} className={`${location.pathname === "/donations/pending" ? "text-white" : ""}`}>Pending Donations</Link>
                                    </li>
                                    <li className="list-none m-2 cursor-pointer">
                                        <Link to={"/donations/previous"} className={`${location.pathname === "/donations/previous" ? "text-white" : ""}`}>Previous Donations</Link>
                                    </li>
                                </>
                                : null
                            }
                        </> : <></>}
                </div>
                <div>
                    {isAuthenticated
                        ? <>
                            <span className="flex w-fit items-center">
                                <Link to="/about" >
                                    <ProfileLogo />
                                </Link>
                                <span className="text-white mx-2">{user.name}</span>
                                <button className="rounded-sm mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500" onClick={handleLogOut}>Logout</button>
                            </span>
                        </>
                        : <>
                            <Link to="/login" className="rounded-sm mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Login</Link>
                            <Link to="/signup" className="rounded-sm mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Signup</Link>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar