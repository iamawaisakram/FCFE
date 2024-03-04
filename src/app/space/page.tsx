"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';


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

  // If space data is available, render the space information
  return (
    <div>
      <h1>{space.name}</h1>
      {/* Add other content related to the space page */}
    </div>
  );
};

export default SpacePage;
