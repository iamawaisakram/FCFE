import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <label>Deck Name:</label>
      <input
        type="text"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
      />
      <button onClick={handleDeckCreation}>Create Deck</button>

      <h2>Decks:</h2>
      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>{deck.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DeckForm;
