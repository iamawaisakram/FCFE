import React, { useState } from 'react';
import Link from 'next/link';
import AddSpaceForm from '../AddSpaceForm/AddSpaceForm';
const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-gray-100 w-64 h-full fixed top-0 left-0 p-4 text-black mt-16">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Navigation</h1>
      </div>
      <ul className="space-y-2 ">
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
      </ul>

      {/* Modal for adding new space */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Space</h2>
            <AddSpaceForm onClose={closeModal} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
