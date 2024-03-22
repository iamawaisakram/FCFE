"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeCard } from '@/components/atoms';
import { Navbar } from '@/components/molecules';
import authService from '@/api/axios';
import {Sidebar} from '@/components/molecules';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {

        await authService.checkAuthentication();

        // If authenticated, do nothing
      } catch (error) {
        // If not authenticated, redirect to the login page
        router.push('/login');
      }
    };

    checkAuthentication();
  }, []);

 return (
    <div className="flex">

      <Sidebar onClose={function (): void {
       throw new Error('Function not implemented.');
     } } />

      <div className="flex flex-col flex-1">

        <Navbar />

        <div className="flex items-center justify-center p-8">
        <h1 className="text-4xl font-bold mt-3 cursor-pointer hover:text-blue-500">
          Flashcards
        </h1>
        <div className="ml-4"> {/* Add margin to create space between h1 and image */}
          <Image
            className="h-10 w-auto"
            src="/f3.png"
            alt="Your Company"
            width="64" height="64"
          />
        </div>
      </div>

        <HomeCard/>

      </div>
    </div>
  );
};


export default HomePage;
