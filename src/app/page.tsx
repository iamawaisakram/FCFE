// app/page.tsx
import React from 'react';
import { Flashcard } from '@/components/atoms';
import { Navbar } from '@/components/molecules';


const Home: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-3 cursor-pointer hover:text-blue-500">
          Flashcards
        </h1>
      </div>
      <Flashcard />
    </div>
  );
};

export default Home;
