import React, { useState, useContext, useEffect } from "react";
import { adminContext } from "../../context/AdminState";
import { Error } from "../../modals/ErrorModal";
import AssignAgent from "../../modals/AssignAgent";

const AssignAgents = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isAdmin = document.cookie.includes("isadmin=true");
    const context = useContext(adminContext);
    const { showAgents, showDonations } = context;
    const [agents, setAgents] = useState([]);
    const [showError, setShowError] = useState(false);
    const [donations, setDonations] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState("");
    const [assignAgent, setAssignAgent] = useState({"isOpen":false, "donation":{}});

    useEffect(() => {
        if (isAuthenticated && isAdmin) {
            showAgents().then((data) => {
                setAgents(data.agents);
            });
            showDonations().then((data) => {
                setDonations(data.donations);
            });
        } else {
            setShowError(true);
        }
    }, []);

    const handleAssignAgent = (donation) => {
        setAssignAgent({"isOpen":true, "donation":donation});
    };

    return (
        <>
            {isAuthenticated && isAdmin ? (
                <div className="m-4 p-4 overflow-auto">
                    <table className="mx-auto overflow-auto border-2 border-black">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="border-2 border-black p-3">Food Name</th>
                                <th className="border-2 border-black p-3">Food Quantity</th>
                                <th className="border-2 border-black p-3">Address</th>
                                <th className="border-2 border-black p-3">Status</th>
                                <th className="border-2 border-black p-3">Assign Agent</th>
                                <th className="border-2 border-black p-3">Message from Donor</th>
                                <th className="border-2 border-black p-3">Message to Agent</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {donations.length === 0 && (
                                <tr className="bg-gray-300">
                                    <td className="border border-black text-center p-3" colSpan="9">No Pending Donations</td>
                                </tr>
                            )}
                            {donations.map((donation, index) => (
                                <tr key={index} className={` ${index % 2 == 0 ? "bg-gray-300" : "bg-white"} `}>
                                    <td className="border border-black text-center p-3">{donation.foodName}</td>
                                    <td className="border border-black text-center p-3">{donation.foodQuantity} KG</td>
                                    <td className="border border-black text-center p-3">{donation.address}</td>
                                    <td className="border border-black text-center p-3">{donation.status}</td>
                                    <td className="border border-black text-center p-3">
                                        {donation.agent ? (
                                            <p className="text-green-500">Assigned</p>
                                        ) : (
                                            <>
                                                {/* <select
                                                    name="agent"
                                                    className="border-2 border-black rounded-md"
                                                    onChange={(e) => setSelectedAgent(e.target.value)}
                                                >
                                                    <option selected disabled className="bg-gray-500 text-white">
                                                        Select Agent
                                                    </option>
                                                    {agents.map((agent, index) => (
                                                        <option key={index} value={agent._id}>
                                                            {agent.name}
                                                        </option>
                                                    ))}
                                                </select> */}
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
                                                    onClick={() => {
                                                        handleAssignAgent(donation);
                                                    }}
                                                >
                                                    Assign
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="border border-black text-center p-3">{donation.donorToAdminMsg || "Nil"}</td>
                                    <td className="border border-black text-center p-3">{donation.adminToAgentMsg || "Nil"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <AssignAgent isOpen={assignAgent.isOpen} donation={assignAgent.donation} agents={agents} onClose={()=> setAssignAgent(false)} />
                </div>
            ) : (
                <Error showError={showError} error={{ message: "Login as Admin to continue" }} onClose={() => setShowError(false)} />
            )}
        </>
    );
};

export default AssignAgents;
