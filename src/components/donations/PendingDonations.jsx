import React, { useContext, useEffect, useState } from "react";
import { Error } from "../../modals/ErrorModal";
import { donorContext } from "../../context/DonorState";

const PendingDonations = () => {
    const { getDonations } = useContext(donorContext);
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");
    const [showError, setShowError] = useState(false);

    const [pendingDonations, setPendingDonations] = useState([]);

    useEffect(() => {
        if (isAuthenticated && isDonor) {
            getDonations()
                .then((data) => {
                    setPendingDonations(data.donations.filter((donation) => donation.status === "pending"));
                })
        }
        else {
            setShowError(true);
        }
    }, [getDonations])


    return (
        <>
            {isAuthenticated && isDonor ? (
                <div className="m-4 overflow-auto">
                    <table className="w-4/5 mx-auto border-2 border-black">
                        <caption>
                            <h1 className="text-center text-2xl font-bold m-4">Pending Donations</h1>
                        </caption>
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="border-2 border-black p-3">S. No.</th>
                                <th className="border-2 border-black p-3">Food Name</th>
                                <th className="border-2 border-black p-3">Quantity</th>
                                <th className="border-2 border-black p-3">Address Given</th>
                                <th className="border-2 border-black p-3">Phone Given</th>
                                <th className="border-2 border-black p-3">Time of Cooking</th>
                                <th className="border-2 border-black p-3">Status</th>
                                <th className="border-2 border-black p-3">Message to Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingDonations.length === 0 && (
                                <tr className="bg-gray-300">
                                    <td className="border border-black text-center p-3" colSpan="8">No Pending Donations</td>
                                </tr>
                            )}
                            {pendingDonations.map((data, index) => (
                                <tr key={index} className={` ${index % 2 == 0 ? "bg-gray-300" : "bg-white"} `}>
                                    <td className="border border-black text-center p-3">{index + 1}</td>
                                    <td className="border border-black text-center p-3">{data.foodName}</td>
                                    <td className="border border-black text-center p-3">{data.foodQuantity}</td>
                                    <td className="border border-black text-center p-3">{data.address}</td>
                                    <td className="border border-black text-center p-3">{data.phoneNo}</td>
                                    <td className="border border-black text-center p-3">{data.cookingTime}</td>
                                    <td className={`border border-black text-center p-3 ${` ${data.status === "pending" ? "bg-yellow-400" : data.status === "collected" ? "bg-green-700" : data.status === "rejected" ? "bg-red-500" : "bg-green-400"}`}`}>
                                        {data.status}
                                    </td>
                                    <td className="border border-black text-center p-3">{data.donorToAdminMsg}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            ) : (
                <Error showError={showError} error={{ message: "Login as Donor to donate" }} onClose={() => setShowError(false)} />
            )}
        </>
    );
};

export default PendingDonations;