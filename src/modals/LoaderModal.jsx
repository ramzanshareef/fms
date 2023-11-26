import React from "react"

const Loader = ({showLoader}) => {
    return (
        <>
            {showLoader===true ?
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
                : 
                <></>
            }

        </>
    )
}

export { Loader }