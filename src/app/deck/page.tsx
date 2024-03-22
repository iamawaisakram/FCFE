"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface Deck {
  id: number;
  name: string;

}

const DeckPage = () => {
const searchParams = useSearchParams();
  const deckId = searchParams.get('deckId') as string | null;
  const [deck, setDeck] = useState<Deck | null>(null);




  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const authToken = localStorage.getItem('token');

        if (!authToken) {
          console.error('User not authenticated');
          return;
        }

        const response = await axios.get(`http://localhost:3000/decks/${deckId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setDeck(response.data);
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    if (deckId) {
      fetchDeck();
    }
  }, [deckId]);


  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{deck.name}</h1>


    </div>
  );
};

export default DeckPage;
