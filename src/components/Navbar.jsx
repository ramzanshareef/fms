import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, Router, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import ProfileLogo from "../images/ProfileLogo";

const Navbar = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");
    const isAdmin = document.cookie.includes("isadmin=true");
    const isAgent = document.cookie.includes("isagent=true");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const nav = useNavigate();
    const context = useContext(userContext);
    const { logout, getUser } = context;
    const [user, setUser] = useState({});
    const navbarRef = useRef(null);


    useEffect(() => { // Get user details
        if (isAuthenticated) {
            getUser().then((data) => {
                setUser(data);
            });
        }
    }, []);

    useEffect(() => { // Close the menu when clicked outside
        const handleOutsideClick = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const handleLogOut = async (e) => { // Logout Function
        e.preventDefault();
        logout()
            .then((data) => {
                if (data.message === "Logout Success!") {
                    document.cookie.split(";").forEach((cookie) => {
                        document.cookie = cookie
                            .replace(/^ +/, "")
                            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
                    });
                    nav("/login");
                    window.location.reload();
                }
            })
    };

    return (
        <nav ref={navbarRef} className="sticky w-full top-0 z-10 p-2 bg-gradient-to-r from-purple-700 to-indigo-500">
            <div className={`justify-between items-center ${isMenuOpen ? "flex flex-col items-center text-center lg:flex lg:flex-row" : "lg:flex lg:flex-row"}`}>
                <div className={`flex flex-row items-center` + isMenuOpen ? "w-full flex flex-row justify-between items-center lg:w-fit" : ""}>
                    <li className="list-none m-2 cursor-pointer text-2xl">
                        <Link to={"/"}>FMS</Link>
                    </li>
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isMenuOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={`lg:flex lg:w-fit ${isMenuOpen ? "block" : "hidden"}`}>
                    {isAuthenticated && (
                        <div className="lg:flex items-center">
                            <li className="list-none m-2 cursor-pointer hover:text-white">
                                <Link
                                    to={"/"}
                                    className={`${location.pathname === "/" ? "text-white" : ""}`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="list-none m-2 cursor-pointer hover:text-white">
                                <Link
                                    to={"/about"}
                                    className={`${location.pathname === "/about" ? "text-white" : ""}`}
                                >
                                    About
                                </Link>
                            </li>
                            <li className="list-none m-2 cursor-pointer hover:text-white">
                                <Link
                                    to={"/dashboard"}
                                    className={`${location.pathname === "/dashboard" ? "text-white" : ""}`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {isDonor && (
                                <>
                                    <li className="list-none m-2 cursor-pointer hover:text-white">
                                        <Link
                                            to={"/donate"}
                                            className={`${location.pathname === "/donate" ? "text-white" : ""}`}
                                        >
                                            Donate
                                        </Link>
                                    </li>
                                    <li className="list-none m-2 cursor-pointer hover:text-white">
                                        <Link
                                            to={"/donations/pending"}
                                            className={`${location.pathname === "/donations/pending" ? "text-white" : ""}`}
                                        >
                                            Pending Donations
                                        </Link>
                                    </li>
                                    <li className="list-none m-2 cursor-pointer hover:text-white">
                                        <Link
                                            to={"/donations/previous"}
                                            className={`${location.pathname === "/donations/previous" ? "text-white" : ""}`}
                                        >
                                            Previous Donations
                                        </Link>
                                    </li>
                                </>
                            )}
                            {isAdmin && (
                                <>
                                    <li className="list-none m-2 cursor-pointer hover:text-white">
                                        <Link
                                            to={"/agents"}
                                            className={`${location.pathname === "/agents" ? "text-white" : ""}`}
                                        >
                                            Agents
                                        </Link>
                                    </li>
                                    <li className="list-none m-2 cursor-pointer hover:text-white">
                                        <Link
                                            to={"/assignAgents"}
                                            className={`${location.pathname === "/assignAgents" ? "text-white" : ""}`}
                                        >
                                            Assign Agents
                                        </Link>
                                    </li>
                                </>
                            )}
                            {isAgent && (
                                <>
                                    <li className="list-none m-2 cursor-pointer hover:text-white">
                                        <Link
                                            to={"/donations"}
                                            className={`${location.pathname === "/donations" ? "text-white" : ""}`}
                                        >
                                            Assigned
                                        </Link>
                                    </li>
                                </>
                            )}
                        </div>
                    )}
                    <div className="lg:hidden flex flex-col items-center">
                        {isAuthenticated ? (
                            <div className="flex items-center">
                                <Link to="/about">
                                    <ProfileLogo />
                                </Link>
                                <span className="text-white mx-2">{user.name}</span>
                                <button
                                    className="rounded-xl mx-2 px-2 py-1 cursor-pointer hover:bg-black text-white bg-gray-700"
                                    onClick={handleLogOut}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <Link
                                    to="/login"
                                    className="rounded-xl mx-2 px-2 py-1 cursor-pointer hover:bg-black text-white bg-gray-700"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="rounded-xl mx-2 px-2 py-1 cursor-pointer hover:bg-black text-white bg-gray-700"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="hidden lg:flex flex-col items-center">
                    {isAuthenticated ? (
                        <div className="flex items-center">
                            <Link to="/about">
                                <ProfileLogo />
                            </Link>
                            <span className="text-white mx-2">{user.name}</span>
                            <button
                                className="rounded-xl mx-2 px-2 py-1 cursor-pointer hover:bg-black text-white bg-gray-700"
                                onClick={handleLogOut}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Link
                                to="/login"
                                className="rounded-xl mx-2 px-2 py-1 cursor-pointer hover:bg-black text-white bg-gray-700"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="rounded-xl mx-2 px-2 py-1 cursor-pointer hover:bg-black text-white bg-gray-700"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
