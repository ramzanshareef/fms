import React, { useEffect, useState } from "react";
import AddDonation from "./AddDonation";
import { Error } from "../../modals/ErrorModal";

const Donation = () => {
    const isAuthenticated = document.cookie.includes("isAuthenticated=true");
    const isDonor = document.cookie.includes("isdonor=true");
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if (!isAuthenticated || !isDonor) {
            setShowError(true);
        }
    }, [isAuthenticated, isDonor])
    return (
        <>
            {isAuthenticated && isDonor
                ?
                <>
                    < AddDonation />
                </>
                :
                <>
                    <Error showError={showError} error={{ message: "Login as Donor to Continue" }} onClose={() => setShowError(false)} />
                </>
            }
        </>
    )
}

export default Donation;