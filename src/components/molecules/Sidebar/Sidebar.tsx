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
  const [editSpace, setEditSpace] = useState<Space | null>(null);
  const [deleteSpace, setDeleteSpace] = useState<Space | null>(null);

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
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddSpace = async (newSpace: Space) => {
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
  };

  const handleEditSpace = (space: Space) => {
    setEditSpace(space);
  };

  const handleDeleteSpace = (space: Space) => {
    setDeleteSpace(space);
  };

  const confirmDeleteSpace = async () => {
    if (!deleteSpace) return;

    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('User not authenticated');
        return;
      }

      await axios.delete(`http://localhost:3000/spaces/${deleteSpace.id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setSpaces(spaces.filter((space) => space.id !== deleteSpace.id));
    } catch (error) {
      console.error('Error deleting space:', error);
    }

    setDeleteSpace(null);
  };

  const handleEditSpaceName = async (updatedName: string) => {
    if (!editSpace) return;

    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        console.error('User not authenticated');
        return;
      }

      const updatedSpace = { ...editSpace, name: updatedName };

      await axios.put(`http://localhost:3000/spaces/${editSpace.id}`, updatedSpace, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      setSpaces(spaces.map((space) => (space.id === editSpace.id ? updatedSpace : space)));
    } catch (error) {
      console.error('Error updating space:', error);
    }

    setEditSpace(null);
  };

  return (
    <nav className="bg-gray-100 w-64 h-full fixed top-0 left-0 p-4 text-black mt-16 shadow-lg">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Spaces</h1>
      </div>
      <ul className="space-y-2">
        <li className="transition duration-300 ease-in-out transform hover:scale-105">
          <button className="text-black hover:text-blue-500" onClick={openModal}>
            Add Space
          </button>
        </li>
        {/* Displaying fetched spaces */}
        {spaces.map((space) => (
          <li key={space.id} className="relative">
            <Link href={`/space?spaceId=${space.id}`} className="block py-2 px-4 hover:text-blue-500">
              {space.name}
            </Link>
            <div className="absolute right-0 top-0 flex space-x-2">
              <button
                onClick={() => handleEditSpace(space)}
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
                onClick={() => handleDeleteSpace(space)}
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
          </li>
        ))}
      </ul>

      {/* Modal for adding new space */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add New Space</h2>
            <AddSpaceForm onClose={closeModal} onAddSpace={handleAddSpace} />
          </div>
        </div>
      )}

      {/* Modal for editing space */}
      {editSpace && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Edit Space</h2>
            <input
              type="text"
              value={editSpace.name}
              onChange={(e) => setEditSpace({ ...editSpace, name: e.target.value })}
              className="border border-gray-300 p-2 rounded-md mb-4 w-full"
            />
            <button
              onClick={() => handleEditSpaceName(editSpace.name)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button onClick={() => setEditSpace(null)} className="ml-2 text-gray-600 hover:text-red-600">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for deleting space */}
      {deleteSpace && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Delete Space</h2>
            <p>Are you sure you want to delete "{deleteSpace.name}" space?</p>
            <div className="flex justify-end mt-4">
              <button onClick={confirmDeleteSpace} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
                Delete
              </button>
              <button onClick={() => setDeleteSpace(null)} className="text-gray-600 hover:text-red-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
