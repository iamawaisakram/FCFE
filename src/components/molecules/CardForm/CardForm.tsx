import React, { useState, useEffect } from "react";
import axios from "axios";

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
            <ul>
                {cards.map((card) => (
                    <li key={card.id} className="mb-4">
                        <div>{card.name}</div>
                        <h3 className="font-semibold">Clues:</h3>
                        <ul className="list-disc pl-8">
                            {card.clues &&
                                card.clues.map((clue) => (
                                    <li key={clue.id}>{clue.value}</li>
                                ))}
                        </ul>
                        <h3 className="font-semibold">Answers:</h3>
                        <ul className="list-disc pl-8">
                            {card.answers &&
                                card.answers.map((answer) => (
                                    <li key={answer.id}>{answer.value}</li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardForm;
