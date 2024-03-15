import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Deck {
  id: number;
  name: string;
}

interface DeckFormProps {
  spaceId: number;
}

const DeckForm: React.FC<DeckFormProps> = ({ spaceId }) => {
  const [deckName, setDeckName] = useState<string>('');
  const [decks, setDecks] = useState<Deck[]>([]);

  const fetchDecks = async () => {
    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('User not authenticated');
        return;
      }

      const response = await axios.get<Deck[]>(`http://localhost:3000/decks/space/${spaceId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setDecks(response.data);
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, [spaceId]);

  const handleDeckCreation = async () => {
    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('User not authenticated');
        return;
      }

      const response = await axios.post(`http://localhost:3000/decks`, {
        name: deckName,
        space: { id: spaceId },
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.data) {
        setDeckName('');
        fetchDecks();
      } else {
        console.error('Error creating deck:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating deck:', error);
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
      <button onClick={handleDeckCreation} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Create Deck
      </button>

      <h2 className="mt-8 mb-4 text-lg font-bold">Decks:</h2>
      <ul >
        {decks.map((deck) => (
          <li key={deck.id} className="mb-2">
            <Link href={`/deck?deckId=${deck.id}&spaceId=${spaceId}`} className="text-black hover:text-blue-500">
              {deck.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeckForm;
