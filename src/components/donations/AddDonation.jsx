import React, { useContext, useState } from "react";
import { donorContext } from "../../context/DonorState";
import { SuccessModal } from "../../modals/SuccesModal";

const AddDonation = () => {
    const context = useContext(donorContext);
    const { addDonation } = context;
    const [data, setData] = useState({ "foodName": "", "foodQuantity": 0, "phoneNo": 0, "cookingTime": "", "address": "", "donorToAdminMsg": undefined });
    const [showSuccess, setShowSuccess] = useState(false);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addDonation(data)
            .then(() => {
                setShowSuccess(true);
            })
            .catch((err) => {
                console.log(err);
                alert("Error, Check console for more details");
            });
        setData({ "foodName": "", "foodQuantity": 0, "phoneNo": 0, "cookingTime": "", "address": "", "donorToAdminMsg": "" });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-blue-500 m-5 p-4">
                <div className="mb-4">
                    <label htmlFor="foodName" className="block text-gray-700 text-sm font-bold mb-2">
                        Food Name
                    </label>
                    <input
                        type="text"
                        name="foodName"
                        value={data.foodName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter food name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="foodQuantity" className="block text-gray-700 text-sm font-bold mb-2">
                        Food Quantity (in KGs)
                    </label>
                    <input
                        type="number"
                        name="foodQuantity"
                        value={data.foodQuantity}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter food quantity"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cookingTime" className="block text-gray-700 text-sm font-bold mb-2">
                        Cooking Time
                    </label>
                    <input
                        type="datetime-local"
                        name="cookingTime"
                        value={data.cookingTime}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter cooking time"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNo" className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input
                        type="number"
                        name="phoneNo"
                        value={data.phoneNo}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter Phone Number"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter address"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="donorToAdminMsg" className="block text-gray-700 text-sm font-bold mb-2">
                        Donor to Admin Message
                    </label>
                    <textarea
                        type="text"
                        name="donorToAdminMsg"
                        value={data.donorToAdminMsg}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter donor to admin message"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Donation
                    </button>
                </div>
            </form>
            <SuccessModal showSuccess={showSuccess} message={"Donation Added Successfully!"} onClose={()=> setShowSuccess(false)} />
        </>
    );
};

export default AddDonation;
