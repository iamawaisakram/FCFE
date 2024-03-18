// SpacePage.js

"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeckForm from '@/components/molecules/DeckForm/DeckForm';

interface Space {
  id: number;
  name: string;
}

const SpacePage = () => {
  const searchParams = useSearchParams();
  const spaceId = searchParams.get('spaceId') as string | null;
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const authToken = localStorage.getItem('token');

        if (!authToken) {
          console.error('User not authenticated');
          return;
        }

        const response = await axios.get(`http://localhost:3000/spaces/${spaceId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setSpace(response.data);
      } catch (error) {
        console.error('Error fetching space:', error);
      }
    };

    if (spaceId) {
      fetchSpace();
    }
  }, [spaceId]);

  // If space data is not available, show a loading message
  if (!space) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className='text-center'>
      <h1 className="text-3xl font-bold">{space.name}</h1>
      </div>
      <DeckForm spaceId={space.id} />
      {/* Add other content related to the space page */}
    </div>
  );
};

export default SpacePage;
