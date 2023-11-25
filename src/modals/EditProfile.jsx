import React, { useState } from "react";
import CloseButton from "../images/CloseButton";
import { LoginError } from "../modals/ErrorModal";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const EditProfile = ({ isOpen, onClose, user }) => {
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState([]);
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [gender, setGender] = useState();
    let [address, setAddress] = useState();
    let [phoneNo, setphoneNo] = useState();
    let role = user.role;
    const updateFields = {}
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (gender) updateFields.gender = gender;
    if (address) updateFields.address = address;
    if (phoneNo) updateFields.phoneNo = phoneNo;
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        const response = await fetch(backendURL + "/user/" + role + "/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(updateFields)
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            onClose();
            alert("Profile Updated Successfully!");
            window.location.reload();
        }
        else {
            setError(jsonData);
            setShowError(true);
        }
    };
    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile
                            <button className="relative float-right m-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                                {<CloseButton />}
                            </button>
                        </h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full border rounded-md py-2 px-3"
                                type="text"
                                id="name"
                                value={name || user.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full border rounded-md py-2 px-3"
                                type="email"
                                id="email"
                                value={email || user.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                className="w-full border rounded-md py-2 px-3"
                                id="gender"
                                value={gender || user.gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option disabled selected>Select your Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Address
                            </label>
                            <textarea id="address" cols="50" rows="5" className="border p-2 rounded-md" value={address || user.address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNo">
                                Phone Number
                            </label>
                            <input
                                className="w-full border rounded-md py-2 px-3"
                                type="number"
                                id="phoneNo"
                                value={phoneNo || user.phoneNo}
                                onChange={(e) => setphoneNo(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleSaveProfile}
                        >
                            Update
                        </button>
                    </div>
                    <LoginError showError={showError} error={error} onClose={()=> setShowError(false)} />
                </div>
                :
                <></>
            }
        </>
    );
};

export default EditProfile;