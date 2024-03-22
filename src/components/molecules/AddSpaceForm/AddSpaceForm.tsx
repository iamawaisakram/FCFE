import { useState } from 'react';
import axios from 'axios';

interface Space {
  id: number;
  name: string;
}

interface AddSpaceFormProps {
  onClose: () => void;
  onAddSpace: (newSpace: Space) => void;
}

const AddSpaceForm: React.FC<AddSpaceFormProps> = ({ onClose, onAddSpace }) => {
  const [spaceName, setSpaceName] = useState('');

  const handleAddSpace = async () => {
    try {
      //To Fetch the authentication token from localStorage
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('User not authenticated');
        return;
      }

      //To Hit the API endpoint to create a new space with authorization header
      const response = await axios.post<Space>(
        'http://localhost:3000/spaces',
        { name: spaceName },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // After creating the space, close the modal
      onClose();

      console.log('Space created:', response.data);

      //To call the onAddSpace callback to update the state in the Sidebar
       onAddSpace(response.data);

    } catch (error) {
      console.error('Error creating space:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Space Name"
        value={spaceName}
        onChange={(e) => setSpaceName(e.target.value)}
      />
      <button onClick={handleAddSpace}>Add Space</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddSpaceForm;
