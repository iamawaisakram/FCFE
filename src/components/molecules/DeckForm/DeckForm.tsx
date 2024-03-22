import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DeckFormProps {
  spaceId: number;
}

const DeckForm: React.FC<DeckFormProps> = ({ spaceId }) => {
  const [deckName, setDeckName] = useState('');

  const handleDeckCreation = async () => {
    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        // Displaying a toast for unauthenticated scenario
        toast.error('User not authenticated');
        return;
      }

      if (!deckName) {
        // Displaying a toast for empty input field
        toast.error('Deck name cannot be empty');
        return;
      }

    //   console.log('Space ID:', spaceId);

      const response = await fetch('http://localhost:3000/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: deckName,
          space: { id: spaceId },
        }),
      });

      if (response.ok) {
        // Deck created successfully
        setDeckName('');
        toast.success('Deck created successfully');
      } else {
        // Handling error scenarios
        toast.error(`Error creating deck: ${response.statusText}`);
      }
    } catch (error) {
      // Displaying a toast for general errors
      toast.error(`Error creating deck`);
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

      {/* ToastContainer to display error messages */}
      <ToastContainer />
    </div>
  );
};

export default DeckForm;
