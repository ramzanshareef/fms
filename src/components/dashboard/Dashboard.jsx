import React from "react";
import DonorDashboard from "./DonorDashboard";
import AdminDashboard from "./AdminDashboard";
import AgentDashboard from "./AgentDashboard";

const Dashboard = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");
    const isAdmin = document.cookie.includes("isadmin=true");
    const isAgent = document.cookie.includes("isagent=true");

    return (
        <>
            { (isAuthenticated)
                ?
                <>
                    { (isDonor) ? <> <DonorDashboard /> </> : null }
                    { (isAdmin) ? <> <AdminDashboard /> </> : null }
                    { (isAgent) ? <> <AgentDashboard /> </> : null }
                </> :
                <>
                    <div className="flex items-center justify-center my-5">Please login to view dashboard</div>
                </>
            }
        </>    )
}

export default Dashboard