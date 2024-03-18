"use client"; // This is a client component
import React, { useState } from "react";

interface FlashcardProps {
  clue: string;
  answer: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ clue, answer }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center">
      <div className={`card w-60 h-80 cursor-pointer  ${isFlipped ? "flipped" : ""}`}>
        <div className="front absolute w-full h-full flex items-center justify-center shadow-md">
          <p>{clue}</p>
        </div>
        <div className="back absolute w-full h-full  flex items-center justify-center shadow-md">
          <p>{answer}</p>
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
