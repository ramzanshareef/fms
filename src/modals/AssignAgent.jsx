import React, { useContext, useState } from "react";
import CloseButton from "../images/CloseButton";
import { SuccessModal } from "./SuccesModal";
import { Error } from "./ErrorModal";
import { adminContext } from "../context/AdminState";

const AssignAgent = ({ isOpen, onClose, donation, agents }) => {
    const context = useContext(adminContext);
    const { assignAgent } = context;
    const [showSuccess, setShowSuccess] = useState(false);
    const [agent, setAgent] = useState();
    const [agentAssigned, setAgentAssigned] = useState(false);
    const [error, setError] = useState({});
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState();

    const handleAssignAgent = async (e) => {
        e.preventDefault();
        if (agentAssigned === false) {
            setError({ message: "Please select an agent" })
            setShowError(true)
        }
        else {
            await assignAgent(donation._id, agent, message)
                .then((data) => {
                    console.log(data)
                    setShowSuccess(true);
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                    window.location.reload();
                })
                .catch((err) => {
                    setError(err.message)
                    setShowError(true)
                })
        }
    };


    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 mt-10 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-4">Assign Agent
                            <button className="relative float-right m-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                                {<CloseButton />}
                            </button>
                        </h2>
                        <form >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Food Name
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.foodName}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Food Quantity
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.foodQuantity}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Address
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.address}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Cooking Time
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.cookingTime}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Donor
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.donor.name}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Donor Phone Number
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.phoneNo}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Agent
                                </label>
                                <select
                                    name="agent"
                                    className="w-full border rounded-md py-2 px-3"
                                    onChange={(e) => {
                                        setAgent(e.target.value)
                                        setAgentAssigned(true)
                                    }}
                                    required={true}
                                >
                                    <option selected disabled className="bg-gray-500 text-white">
                                        Select Agent
                                    </option>
                                    {agents.map((agent, index) => (
                                        <option key={index} value={agent._id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Message to Agent
                                </label>
                                <textarea
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={message || donation.adminToAgentMsg}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-row justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={handleAssignAgent}
                                >
                                    Assign
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                            </div>
                        </form>
                    </div>
                    <SuccessModal showSuccess={showSuccess} message="Agent Assigned Successfully!" onClose={() => setShowSuccess(false)} />
                    <Error showError={showError} error={error} onClose={() => setShowError(false)} />
                </div>
                :
                <></>
            }
        </>
    );
};

export default AssignAgent;