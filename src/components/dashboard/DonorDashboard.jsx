import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../context/UserState";
import { Error } from "../../modals/ErrorModal";
const backendURL = process.env.REACT_APP_BACKEND_URL;

const DonorDashboard = () => {
    const context = useContext(userContext);
    let { getUser, dashboardDetails } = context;
    let [user, setUser] = useState({});
    let [donationStats, setDonationStats] = useState({});
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState([]);

    useEffect(() => {
        document.title = "Donor Dashboard | FMS";
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
            <p className="w-fit my-4 mx-auto">Donor Dashboard of {user.name}</p>
            <div className="w-4/5 mx-auto text-center">
                <div className="bg-blue-400 p-4 rounded-t-lg">
                    <h2 className="text-white text-xl font-semibold">Donation Statistics</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border border-t-0 border-blue-400 rounded-b-lg">
                    <div className="flex flex-col justify-center items-center bg-yellow-400 p-4 rounded mb-4 sm:mb-0">
                        <p className="text-lg font-semibold">Pending Donations</p>
                        <p className="text-2xl">{donationStats.numPendingDonations || "Nil"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-yellow-500 p-4 rounded mb-4 sm:mb-0">
                        <p className="text-lg font-semibold">Assigned Donations</p>
                        <p className="text-2xl">{donationStats.numAssignedDonations || "Nil"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-green-500 p-4 rounded mb-4 sm:mb-0">
                        <p className="text-lg font-semibold">Accepted Donations</p>
                        <p className="text-2xl">{donationStats.numAcceptedDonations || "Nil"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-red-400 p-4 rounded mb-4 sm:mb-0">
                        <p className="text-lg font-semibold">Rejected Donations</p>
                        <p className="text-2xl">{donationStats.numRejectedDonations || "Nil"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-green-600 p-4 rounded mb-4 sm:mb-0">
                        <p className="text-lg font-semibold">Collected Donations</p>
                        <p className="text-2xl">{donationStats.numCollectedDonations || "Nil"}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-teal-700 p-4 rounded">
                        <p className="text-lg font-semibold">Total Donations</p>
                        <p className="text-2xl">{donationStats.totalDonations || "Nil"}</p>
                    </div>
                </div>
            </div>


            <Error showError={showError} error={error} onClose={() => setShowError(false)} />
        </div>
    );
};

export default DonorDashboard;