import React, { createContext } from "react";
import { useState } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const adminContext = createContext();

const AdminState = (props) => {
    const [user, setUser] = useState([]);
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isAdmin = document.cookie.includes("isadmin=true");

    const showAgents = async () => {
        if (isAuthenticated && isAdmin) {
            const response = await fetch(backendURL + "/user/admin/agents", {
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

    const showDonations = async () => {
        if (isAuthenticated && isAdmin) {
            const response = await fetch(backendURL + "/user/admin/donations", {
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

    const assignAgent = async (donationID, agentID, adminToAgentMsg) => {
        if (isAuthenticated && isAdmin) {
            const response = await fetch(backendURL + "/user/admin/assign", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ donationID, agentID, adminToAgentMsg })
            });
            if (response.status === 200){
                const jsonData = await response.json();
                return jsonData;
            }
            return response;
        }
    }

    return (
        <adminContext.Provider value={{ showAgents, showDonations, assignAgent }}>
            {props.children}
        </adminContext.Provider>
    );
}

export { adminContext, AdminState };