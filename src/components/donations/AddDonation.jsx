import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserState";

const AddDonation = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");

    const [data, setData] = useState({ "foodName": "", "foodQuantity": 0, "cookingTime": "", "address": "", "donorToAdminMsg": "" });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const context = useContext(userContext);
    const { addDonation } = context;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        addDonation(data)
            .then((res) => {
                console.log(res);
                alert("Donation added successfully");
            })
            .catch((err) => {
                console.log(err);
                alert("Donation not added");
            });
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
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="donorToAdminMsg" className="block text-gray-700 text-sm font-bold mb-2">
                        Donor to Admin Message
                    </label>
                    <input
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
        </>
    );
};

export default AddDonation;
