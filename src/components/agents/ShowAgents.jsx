import React, { useState, useContext, useEffect } from "react";
import { adminContext } from "../../context/AdminState";
import { Error } from "../../modals/ErrorModal";


const ShowAgents = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isAdmin = document.cookie.includes("isadmin=true");
    const context = useContext(adminContext);
    const { showAgents } = context;
    const [agents, setAgents] = useState([]);
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            showAgents()
                .then((data) =>{
                    setAgents(data.agents)
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error, Check console for more details");
                });
        }
        else {
            setShowError(true);
        }
    }, [])
    
    return (
        <>
        {isAuthenticated && isAdmin ? (
        <div>
            <h1 className="text-2xl text-center m-4">Agents</h1>
            <table className="w-2/5 mx-auto border-2 border-black">
                <thead>
                    <tr className="bg-gray-400">
                        <th className="border-2 border-black p-3">Agent Name</th>
                        <th className="border-2 border-black p-3">Agent Email</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.length === 0 && (
                        <tr className="bg-gray-300">
                            <td className="border border-black text-center p-3" colSpan="2">No Agents</td>
                        </tr>
                    )}
                    {agents.map((agent, index) => (
                        <tr key={index} className={` ${index % 2 == 0 ? "bg-gray-300" : "bg-white"} `}>
                            <td className="border border-black text-center p-3">{agent.name}</td>
                            <td className="border border-black text-center p-3">{agent.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        ) : (
            <Error showError={showError} error={{ message: "Login as Admin to continue" }} onClose={() => setShowError(false)} />
            )}
        </>
    );
};

export default ShowAgents;