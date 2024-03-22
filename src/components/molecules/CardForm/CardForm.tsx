import React, { useState, useEffect } from "react";
import axios from "axios";
import { Flashcard } from "@/components/atoms";

interface Card {
    id: number;
    name: string;
    answers: Answer[];
    clues: Clue[];
}

interface Answer {
    id: number;
    value: string;
}

interface Clue {
    id: number;
    value: string;
}

interface CardFormProps {
    deckId: number;
    spaceId: number;
}

const CardForm: React.FC<CardFormProps> = ({ deckId, spaceId }) => {
    const [cardName, setCardName] = useState<string>("");
    const [answerInput, setAnswerInput] = useState<string>("");
    const [clueInput, setClueInput] = useState<string>("");
    const [cards, setCards] = useState<Card[]>([]);

    const fetchCards = async () => {
        try {
            const authToken = localStorage.getItem("token");
            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            const response = await axios.get<Card[]>(
                `http://localhost:3000/cards/${deckId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setCards(response.data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };

    useEffect(() => {
        fetchCards();
    }, [deckId]);

    const handleCardCreation = async () => {
        try {
            const authToken = localStorage.getItem("token");
            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            console.log("Creating card with spaceId:", spaceId);

            const response = await axios.post(
                `http://localhost:3000/cards/${deckId}`,
                {
                    name: cardName,
                    space: { id: spaceId },
                    answers: [{ value: answerInput }],
                    clues: [{ value: clueInput }],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.data) {
                setCardName("");
                setAnswerInput("");
                setClueInput("");
                fetchCards();
            } else {
                console.error("Error creating card:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-4">
                <label className="block mb-2">Card Name:</label>
                <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Answer:</label>
                <input
                    type="text"
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Clue:</label>
                <input
                    type="text"
                    value={clueInput}
                    onChange={(e) => setClueInput(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
            </div>
            <button
                onClick={handleCardCreation}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Create Card
            </button>

            <h2 className="mt-8 mb-4 text-lg font-bold">Cards:</h2>
            {/* Display created cards */}
            <div className="flex flex-wrap">
                {cards.map((card) => (
                    <div key={card.id} className="w-1/3 p-4">
                        {card.clues[0] && card.answers[0] && (
                            <Flashcard
                                clue={card.clues[0].value}
                                answer={card.answers[0].value}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardForm;
