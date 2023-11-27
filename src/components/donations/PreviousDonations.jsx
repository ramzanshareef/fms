import React, { useContext, useEffect, useState } from "react";
import { Error } from "../../modals/ErrorModal";
import { donorContext } from "../../context/DonorState";
import { useNavigate } from "react-router-dom";

const PreviousDoantions = () => {
    const nav = useNavigate();
    const { getDonations } = useContext(donorContext);
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");
    const [showError, setShowError] = useState(false);

    const [previousDonations, setpreviousDonations] = useState([]);

    useEffect(() => {
        if (isAuthenticated && isDonor) {
            getDonations()
                .then((data) => {
                    setpreviousDonations(data.donations);
                })
        }
        else {
            setShowError(true);
            nav("/login");
        }
    }, [])


    return (
        <>
            {isAuthenticated && isDonor ? (
                <div className="m-4 overflow-auto">
                    <table className="w-4/5 mx-auto border-2 border-black">
                        <caption>
                            <h1 className="text-center text-2xl font-bold m-4">Previous Donations</h1>
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
                            {previousDonations.length === 0 && (
                                <tr className="bg-gray-300">
                                    <td className="border border-black text-center p-3" colSpan="8">No Previous Donations</td>
                                </tr>
                            )}
                            {previousDonations.map((data, index) => (
                                <tr key={index} className={` ${index % 2 == 0 ? "bg-gray-300" : "bg-white"} `}  >
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
                <Error showError={showError} error={{ message: "Login as Donor to Continue" }} onClose={() => setShowError(false)} />
            )}
        </>
    );
};

export default PreviousDoantions;