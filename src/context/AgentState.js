import React, { createContext } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const agentContext = createContext();

const AgentState = (props) => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isAgent = document.cookie.includes("isagent=true");

    const showDonations = async () => {
        if (isAuthenticated && isAgent) {
            const response = await fetch(backendURL + "/user/agent/donations", {
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

    const assignStatus = async (donationID, status) => {
        if (isAuthenticated && isAgent) {
            const response = await fetch(backendURL + "/user/agent/donation", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ donationID, status })
            });
            if (response.status === 200){
                const jsonData = await response.json();
                return jsonData;
            }
            return response;
        }
    }

    return (
        <agentContext.Provider value={{ showDonations, assignStatus }}>
            {props.children}
        </agentContext.Provider>
    );
}

export { agentContext, AgentState };