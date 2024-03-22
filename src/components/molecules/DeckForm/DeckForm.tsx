import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Deck {
    id: number;
    name: string;
}

interface DeckFormProps {
    spaceId: number;
}

const DeckForm: React.FC<DeckFormProps> = ({ spaceId }) => {
    const [deckName, setDeckName] = useState<string>("");
    const [decks, setDecks] = useState<Deck[]>([]);
    const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
    const [editedDeckName, setEditedDeckName] = useState<string>("");
    const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [deleteDeckId, setDeleteDeckId] = useState<number | null>(null);

    const fetchDecks = async () => {
        try {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            const response = await axios.get<Deck[]>(
                `http://localhost:3000/decks/space/${spaceId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setDecks(response.data);
        } catch (error) {
            console.error("Error fetching decks:", error);
        }
    };

    useEffect(() => {
        fetchDecks();
    }, [spaceId]);

    const handleDeckCreation = async () => {
        try {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            const response = await axios.post(
                `http://localhost:3000/decks`,
                {
                    name: deckName,
                    space: { id: spaceId },
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.data) {
                setDeckName("");
                fetchDecks();
            } else {
                console.error("Error creating deck:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating deck:", error);
        }
    };

    const handleDeckEdit = (deckId: number, deckName: string) => {
        setSelectedDeckId(deckId);
        setEditedDeckName(deckName);
        setShowEditPopup(true);
    };

    const saveEditedDeck = async () => {
        try {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            const response = await axios.put(
                `http://localhost:3000/decks/${selectedDeckId}`,
                {
                    name: editedDeckName,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setSelectedDeckId(null);
                setEditedDeckName("");
                setShowEditPopup(false);
                fetchDecks();
            } else {
                console.error("Error updating deck:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating deck:", error);
        }
    };

    const handleDeckDelete = (deckId: number) => {
        setDeleteDeckId(deckId);
        setShowDeletePopup(true);
    };

    const confirmDeleteDeck = async () => {
        try {
            const authToken = localStorage.getItem("token");

            if (!authToken) {
                console.error("User not authenticated");
                return;
            }

            const response = await axios.delete(
                `http://localhost:3000/decks/${deleteDeckId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            if (response.status === 200) {
                setDeleteDeckId(null);
                setShowDeletePopup(false);
                fetchDecks();
            } else {
                console.error("Error deleting deck:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting deck:", error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <label className="block mb-2">Deck Name:</label>
            <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            />
            <button
                onClick={handleDeckCreation}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Create Deck
            </button>

            <div className="mt-4 pt-2 pl-4 pr-4 pb-10 rounded-md shadow-md">
                <h2 className="mt-8 mb-4 text-lg font-bold">Decks:</h2>
                <ul className="p-0">
                    {decks.map((deck) => (
                        <li key={deck.id} className="mb-2">
                            <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md m-4">
                                <Link
                                    href={`/deck?deckId=${deck.id}&spaceId=${spaceId}`}
                                    className="block hover:text-blue-500"
                                >
                                    {deck.name}
                                </Link>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() =>
                                            handleDeckEdit(deck.id, deck.name)
                                        }
                                        className="text-gray-500 hover:text-green-500"
                                        title="Edit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.293 15.707a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0zM17 6a1 1 0 0 0-1-1h-3.586l-9.707 9.707a1 1 0 0 0-.269.464l-1 3a1 1 0 0 0 1.265 1.265l3-1a1 1 0 0 0 .464-.269L17 9.586V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeckDelete(deck.id)
                                        }
                                        className="text-gray-500 hover:text-red-500"
                                        title="Delete"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 11l3.293 3.293a1 1 0 1 1-1.414 1.414L10 12.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L8.586 11 5.293 7.707a1 1 0 0 1 0-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Edit Deck Popup */}
            {showEditPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">Edit Deck</h2>
                        <input
                            type="text"
                            value={editedDeckName}
                            onChange={(e) => setEditedDeckName(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md mb-4 w-full"
                        />
                        <button
                            onClick={saveEditedDeck}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setShowEditPopup(false)}
                            className="ml-2 text-gray-600 hover:text-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Deck Popup */}
            {showDeletePopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-4">Delete Deck</h2>
                        <p>Are you sure you want to delete this deck?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={confirmDeleteDeck}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeletePopup(false)}
                                className="text-gray-600 hover:text-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeckForm;
