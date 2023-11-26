import React, { createContext } from "react";
import { useState } from "react";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const donorContext = createContext();

const DonorState = (props) => {
    const [user, setUser] = useState([]);
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");

    const addDonation = async (donation) => {
        if (isAuthenticated && isDonor) {
            const response = await fetch(backendURL + "/user/donor/donation", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donation)
            });
            if (response.status === 200){
                const jsonData = await response.json();
                return jsonData;
            }
            return response;
        }
    }

    const getDonations = async () => {
        if (isAuthenticated && isDonor) {
            const response = await fetch(backendURL + "/user/donor/donations", {
                method: "POST",
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

    return (
        <donorContext.Provider value={{ addDonation, getDonations }}>
            {props.children}
        </donorContext.Provider>
    );
}

export { donorContext, DonorState };