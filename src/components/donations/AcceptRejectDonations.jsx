import React, { useContext, useEffect, useState } from "react";
import { agentContext } from "../../context/AgentState";
import { Error } from "../../modals/ErrorModal";
import AgentAcceptance from "../../modals/AgentAcceptance";

const AcceptRejectDonations = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isAgent = document.cookie.includes("isagent=true");
    const context = useContext(agentContext);
    const { showDonations } = context;
    const [donations, setDonations] = useState([]);
    const [showError, setShowError] = useState(false);
    const [assignStatus, setAssignStatus] = useState({ "isOpen": false, "donation": {} });
    const [statusFilter, setStatusFilter] = useState("all");
    const [filteredDonations, setFilteredDonations] = useState(donations);
    const handleAgentAcceptance = (donation) => {
        setAssignStatus({ "isOpen": true, "donation": donation });
    }


    useEffect(() => {
        if (isAuthenticated && isAgent) {
            showDonations()
                .then((res) => {
                    setDonations(res.donations);
                })
        }
        else {
            setShowError(true);
        }
    }, [])

    useEffect(() => {
        if (statusFilter === "all") {
            setFilteredDonations(donations);
        } else {
            const filtered = donations.filter(donation => donation.status === statusFilter);
            setFilteredDonations(filtered);
        }
    }, [statusFilter, donations]);

    return (
        <>
            {isAuthenticated && isAgent ? (
                <div className="m-4 overflow-auto">
                    <table className="w-4/5 mx-auto border-2 border-black">
                        <caption>
                            <h1 className="text-center text-2xl font-bold m-4">Assigned Donations</h1>
                        </caption>
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="border-2 border-black p-3">S. No.</th>
                                <th className="border-2 border-black p-3">Donor (email)</th>
                                <th className="border-2 border-black p-3">Food Name</th>
                                <th className="border-2 border-black p-3">Quantity</th>
                                <th className="border-2 border-black p-3">Address Given</th>
                                <th className="border-2 border-black p-3">Phone Given</th>
                                <th className="border-2 border-black p-3">Time of Cooking</th>
                                <th className="border-2 border-black p-3">Message From Admin</th>
                                <th className="border-2 border-black p-3">
                                    Status <br />
                                    <select
                                        className="m-0 border border-black rounded-md bg-gray-400"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option className="m-0" value="all">All</option>
                                        <option className="m-0" value="accepted">Accepted</option>
                                        <option className="m-0" value="rejected">Rejected</option>
                                        <option className="m-0" value="collected">Collected</option>
                                    </select>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDonations.length === 0 && (
                                <tr className="bg-gray-300">
                                    <td className="border border-black text-center p-3" colSpan="9">No Assigned Donations</td>
                                </tr>
                            )}
                            {filteredDonations.map((donation, index) => (
                                <tr key={index} className={` ${index % 2 === 0 ? "bg-gray-300" : "bg-white"} 
                                `}>
                                    <td className="border border-black text-center p-3">{index + 1}</td>
                                    <td className="border border-black text-center p-3">{donation.donor.name} <br /> ({donation.donor.email})</td>
                                    <td className="border border-black text-center p-3">{donation.foodName}</td>
                                    <td className="border border-black text-center p-3">{donation.foodQuantity} kg</td>
                                    <td className="border border-black text-center p-3">{donation.address}</td>
                                    <td className="border border-black text-center p-3">{donation.phoneNo}</td>
                                    <td className="border border-black text-center p-3">
                                        {donation.cookingTime.substr(0, 8)} <br /> {donation.cookingTime.substr(8)}
                                    </td>
                                    <td className="border border-black text-center p-3">{donation.adminToAgentMsg || "Nil"}</td>
                                    <td className={`border border-black text-center p-3 
                                    ${donation.status === "accepted"? "bg-green-400" : donation.status === "rejected" ? "bg-red-400" : "" }`}>
                                        {donation.status !== "assigned" ? (
                                            <p>{donation.status}</p>
                                        )
                                            : (
                                                <p className="text-yellow-800">
                                                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded" onClick={() => handleAgentAcceptance(donation)}>Check</button>
                                                </p>
                                            )
                                        }

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <AgentAcceptance isOpen={assignStatus.isOpen} donation={assignStatus.donation} onClose={() => setAssignStatus({ "isOpen": false })} />
                </div>
            ) : (
                <Error showError={showError} error={{ message: "Login as Agent to Continue" }} onClose={() => setShowError(false)} />
            )}
        </>
    )
}

export default AcceptRejectDonations