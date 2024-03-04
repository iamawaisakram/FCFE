import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AddSpaceForm from '../AddSpaceForm/AddSpaceForm';
import axios from 'axios';


interface Space {
  id: number;
  name: string;
}

interface SidebarProps {
  onClose: () => void;
}


const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        //To Fetch the authentication token from localStorage
        const authToken = localStorage.getItem('token');

        if (!authToken) {
          console.error('User not authenticated');
          return;
        }

        //To Hit the API endpoint to get spaces with authorization header
        const response = await axios.get<Space[]>('http://localhost:3000/spaces', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        //To Set the fetched spaces in the state
        setSpaces(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };

    //To Fetch spaces when the component mounts
    fetchSpaces();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleAddSpace = async (newSpace: Space) => {
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
  };
  return (
    <nav className="bg-gray-100 w-64 h-full fixed top-0 left-0 p-4 text-black mt-16">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Navigation</h1>
      </div>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="text-black hover:text-blue-500">
            Spaces
          </Link>
        </li>
        <li>
          <button className="text-black hover:text-blue-500" onClick={openModal}>
            Add Space
          </button>
        </li>
        {/* Displaying fetched spaces */}
        {spaces.map((space) => (
          <li key={space.id}>
            <Link href={`/space?spaceId=${space.id}`} className="text-black hover:text-blue-500">
             {space.name}
           </Link>
          </li>
        ))}
      </ul>

      {/* Modal for adding new space */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Space</h2>

            <AddSpaceForm onClose={closeModal} onAddSpace={handleAddSpace} />

          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
