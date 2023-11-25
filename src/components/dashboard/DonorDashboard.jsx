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

    const donationBoxes = [
        { label: 'Pending Donations', statKey: 'numPendingDonations', color: 'yellow-400' },
        { label: 'Assigned Donations', statKey: 'numAssignedDonations', color: 'yellow-500' },
        { label: 'Accepted Donations', statKey: 'numAcceptedDonations', color: 'green-500' },
        { label: 'Rejected Donations', statKey: 'numRejectedDonations', color: 'red-400' },
        { label: 'Collected Donations', statKey: 'numCollectedDonations', color: 'green-600' },
        { label: 'Total Donations', statKey: 'totalDonations', color: 'teal-700' },
    ];


    return (
        <div>
            <div className="mx-auto text-center w-4/5 p-4 rounded-lg">
                <div className="bg-blue-400 p-4 rounded-t-lg">
                    <h2 className="text-white text-xl font-semibold">Donation Statistics</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 p-4 border border-t-0 shadow-md border-blue-400 rounded-b-lg lg:grid-cols-3 xl:grid-cols-2 gap-4">
                    {donationBoxes.map((box, index) => (
                        <div
                            key={index}
                            className={`flex flex-col justify-center items-center p-4 rounded bg-${box.color} shadow-md`}
                        >
                            <p className="text-lg font-semibold">{box.label}</p>
                            <p className="text-2xl">{donationStats[box.statKey] || "Nil"}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Error showError={showError} error={error} onClose={() => setShowError(false)} />
        </div>
    );
};

export default DonorDashboard;