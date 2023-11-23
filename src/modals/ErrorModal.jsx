import React from "react";
import CloseButton from "../images/CloseButton";
import ErrorLogo from "../images/ErrorLogo";

const SingupError = ({ showError, errors, onClose }) => {
    return (
        <>
            {showError === true ?
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            {<ErrorLogo />}
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <span className="font-medium text-lg">😞 SignUp Form Error!</span>
                                            {errors.map((error, index) => (
                                                <li key={index} className="ml-2 text-red-500">{error.msg}</li>
                                            ))}
                                        </div>
                                        <button className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                                            {<CloseButton />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>}
        </>
    );
};

const LoginError = ({ showError, error, onClose }) => {
    return (
        <>
            {showError === true ?
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            {<ErrorLogo />}
                                        </div>
                                        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left self-center">
                                            <span className="font-medium text-lg">😞 {error.message}</span>
                                        </div>
                                    </div>
                                    <button className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                                        {<CloseButton />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>}
        </>
    );
};


export { SingupError, LoginError };