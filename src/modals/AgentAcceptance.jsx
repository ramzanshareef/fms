import React, { useContext, useState } from "react";
import CloseButton from "../images/CloseButton";
import { SuccessModal } from "./SuccesModal";
import { Error } from "./ErrorModal";
import { agentContext } from "../context/AgentState";

const AgentAcceptance = ({ isOpen, onClose, donation }) => {
    const context = useContext(agentContext);
    const { assignStatus } = context;
    const [showSuccess, setShowSuccess] = useState(false);
    const [status, setStatus] = useState();
    const [statusAssigned, setStatusAssigned] = useState(false);
    const [error, setError] = useState({});
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState();

    const handleAgentAcceptance = async (e) => {
        e.preventDefault();
        if (statusAssigned === false) {
            setError({ message: "Please Set a status" });
            setShowError(true);
        }
        else {
            await assignStatus(donation._id, status)
                .then((data)=>{
                    setMessage(data.message);
                    setShowSuccess(true);
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                    window.location.reload();
                })
                .catch((err)=>{
                    setError(err.message);
                    setShowError(true);
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
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Donor
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    id="name"
                                    value={donation.donor.name + " (" + donation.donor.email + ")"}
                                    disabled
                                />
                            </div>
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
                                    Status
                                </label>
                                <select
                                    name="status"
                                    className="w-fit border rounded-md py-2 px-3"
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                        setStatusAssigned(true)
                                    }}
                                    required={true}
                                >
                                    <option selected disabled className="bg-gray-500 text-white">
                                        Accept/Reject
                                    </option>
                                    <option value="accepted" className="bg-green-400">Accept</option>
                                    <option value="rejected" className="bg-red-400">Reject</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Message From Admin
                                </label>
                                <input
                                    className="w-full border rounded-md py-2 px-3"
                                    type="text"
                                    value={donation.adminToAgentMsg}
                                    disabled
                                />
                            </div>
                            <div className="flex flex-row justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={handleAgentAcceptance}
                                >
                                    Done
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
                    <SuccessModal showSuccess={showSuccess} message={message} onClose={() => setShowSuccess(false)} />
                    <Error showError={showError} error={error} onClose={() => setShowError(false)} />
                </div>
                :
                <></>
            }
        </>
    );
};

export default AgentAcceptance;