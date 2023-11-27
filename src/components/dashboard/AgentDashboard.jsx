import React, { useState, useEffect, useContext } from "react";
import { userContext } from "../../context/UserState";
import { Error } from "../../modals/ErrorModal";

const AgentDashboard = () => {
    const context = useContext(userContext);
    let { getUser, dashboardDetails } = context;
    let [user, setUser] = useState({});
    let [donationStats, setDonationStats] = useState({});
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState([]);

    useEffect(() => {
        document.title = "Agent Dashboard | FMS";
        getUser()
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                setError(err);
                setShowError(true);
            });
        dashboardDetails()
            .then((data) => {
                setDonationStats(data);
            })
            .catch((err) => {
                setError(err);
                setShowError(true);
            });
    }, []);

    return (
        <div>
            <div className="mx-auto text-center w-4/5 p-4 rounded-lg">
                <div className="bg-blue-400 p-4 rounded-t-lg">
                    <h2 className="text-white text-xl font-semibold">Agent Dashboard</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 border border-t-0 shadow-md border-blue-400 rounded-b-lg lg:grid-cols-3 xl:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center items-center p-4 rounded bg-yellow-500 shadow-md">
                        <p className="text-lg font-semibold">Assigned Donations</p>
                        <p className="text-2xl">{donationStats.numAssignedDonations || "0"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4 rounded bg-green-500 shadow-md">
                        <p className="text-lg font-semibold">Accepted Donations</p>
                        <p className="text-2xl">{donationStats.numAcceptedDonations || "0"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4 rounded bg-red-400 shadow-md">
                        <p className="text-lg font-semibold">Rejected Donations</p>
                        <p className="text-2xl">{donationStats.numRejectedDonations || "0"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-4 rounded bg-green-600 shadow-md">
                        <p className="text-lg font-semibold">Collected Donations</p>
                        <p className="text-2xl">{donationStats.numCollectedDonations || "0"}</p>
                    </div>
                </div>
            </div>
            <Error showError={showError} error={error} onClose={() => setShowError(false)} />
        </div>
    );
}

export default AgentDashboard;