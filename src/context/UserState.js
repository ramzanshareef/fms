import React, { createContext } from "react";
import { useState } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const userContext = createContext();

const UserState = (props) => {
    const [user, setUser] = useState([]);
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const role = document.cookie.includes("isdonor=true") ? "donor" : (document.cookie.includes("isadmin=true") ? "admin" : "agent");
    
    const signup = async (user) => {
        const response = await fetch(backendURL + "/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const jsonData = await response.json();
        return jsonData;
    }

    const login = async (user) => {
        const response = await fetch(backendURL + "/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const jsonData = await response.json();
        return jsonData;
    }

    const logout = async () => {
        const response = await fetch(backendURL + "/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const jsonData = await response.json();
        return jsonData;
    }

    const getUser = async () => {
        if (isAuthenticated === true) {
            const response = await fetch(backendURL + "/user/" + role + "/", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonData = await response.json();
            return jsonData[role];
        }
    }

    const dashboardDetails = async () => {
        if (isAuthenticated === true) {
            const response = await fetch(backendURL + "/user/" + role + "/dashboard", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.status === 200){
                const jsonData = await response.json();
                return jsonData;
            }
            return response;
        }
    }

    const editProfile = async (updateFields) => {
        const response = await fetch(backendURL + "/user/" + role + "/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(updateFields)
        });
        const jsonData = await response.json();
        return jsonData;
    }
    

    return (
        <userContext.Provider value={{ signup, login, logout, getUser, user, dashboardDetails, editProfile }}>
            {props.children}
        </userContext.Provider>
    );
}

export { UserState, userContext };