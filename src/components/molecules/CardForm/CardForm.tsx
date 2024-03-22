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
                    answers: [{ value: answerInput }], // Using answerInput state variable
                    clues: [{ value: clueInput }], // Using clueInput state variable
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
        <div>
            <label>Card Name:</label>
            <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
            <label>Answer:</label>
            <input
                type="text"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
            />
            <label>Clue:</label>
            <input
                type="text"
                value={clueInput}
                onChange={(e) => setClueInput(e.target.value)}
            />
            <button onClick={handleCardCreation}>Create Card</button>

            <h2>Cards:</h2>
            <ul>
                {cards.map((card) => (
                    <li key={card.id}>
                        {card.name}
                        <ul>
                            {card.answers &&
                                card.answers.map((answer) => (
                                    <li key={answer.id}>{answer.value}</li>
                                ))}
                        </ul>
                        <ul>
                            {card.clues &&
                                card.clues.map((clue) => (
                                    <li key={clue.id}>{clue.value}</li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardForm;
