import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context/UserState";
import { Link } from "react-router-dom";

const Home = () => {
    const context = useContext(userContext);
    let { getUser } = context;
    let [user, setUser] = useState({});
    useEffect(() => {
        getUser()
            .then((data) => {
                setUser(data);
            })
    }, []);

    return (
        <>
            {document.cookie.includes("isAuthenticated=true")
                ?
                <div className="w-4/5 mx-auto my-2 p-2">
                    <p>This is your authenticated website of {user.name} </p>
                </div>
                :
                <div className="flex justify-center items-center h-screen">
                    <p>You are not authenticated</p>
                    <Link to="/login" className="rounded-md mx-2 p-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Login</Link>
                </div>
            }
        </>
    )
}

export default Home