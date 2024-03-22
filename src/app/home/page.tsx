"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Flashcard } from '@/components/atoms';
import { Navbar } from '@/components/molecules';
import authService from '@/api/axios';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if the user is authenticated by calling your backend API
        await authService.checkAuthentication(); // You need to implement this function in your authService

        // If authenticated, do nothing
      } catch (error) {
        // If not authenticated, redirect to the login page
        router.push('/login');
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-3 cursor-pointer hover:text-blue-500">
          Flashcards
        </h1>
      </div>
      <Flashcard />
    </div>
  );
};

export default HomePage;
