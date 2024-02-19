"use client"; // This is a client component
import React, { useState } from "react";

const Flashcard: React.FC = () => {
    const [isFlipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!isFlipped);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div
                className={`card w-60 h-80 cursor-pointer  ${
                    isFlipped ? "flipped" : ""
                }`}
            >
                <div className="front absolute w-full h-full flex items-center justify-center shadow-md">
                    <p>Front Side</p>
                </div>
                <div className="back absolute w-full h-full  flex items-center justify-center shadow-md">
                    <p>Back Side</p>
                </div>
            </div>
            <button
                onClick={handleFlip}
                className="mt-4 ms-4 p-2 bg-blue-500 text-white rounded"
            >
                Flip
            </button>
        </div>
    );
};

export default Flashcard;
