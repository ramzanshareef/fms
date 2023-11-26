import React, { useContext, useState } from "react";
import CloseButton from "../images/CloseButton";
import { LoginError } from "../modals/ErrorModal";
import { SuccessModal } from "./SuccesModal";
import { userContext } from "../context/UserState";

const backendURL = process.env.REACT_APP_BACKEND_URL;
const frontendURL = process.env.REACT_APP_FRONTEND_URL;

const EditProfile = ({ isOpen, onClose, user }) => {
    const { editProfile } = useContext(userContext);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState([]);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();
    const [phoneNo, setphoneNo] = useState();
    const role = user.role;
    const updateFields = {}
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (gender) updateFields.gender = gender;
    if (address) updateFields.address = address;
    if (phoneNo) updateFields.phoneNo = phoneNo;
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        await editProfile(updateFields)
            .then((data)=>{
                setShowSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 1000);
                document.location.href = frontendURL + "/about";
            })
    };
    return (
        <>
            {(isOpen === true)
                ?
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
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
                            <textarea id="address" className="border p-2 rounded-md w-full" value={address || user.address} onChange={(e) => setAddress(e.target.value)} />
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
                        <div className="flex flex-row justify-between">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleSaveProfile}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                    <LoginError showError={showError} error={error} onClose={() => setShowError(false)} />
                    <SuccessModal showSuccess={showSuccess} message="Profile Updated Successfully!" onClose={() => setShowSuccess(false)} />
                </div>
                :
                <></>
            }
        </>
    );
};

export default EditProfile;