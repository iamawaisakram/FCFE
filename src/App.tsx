import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flashcard from "./components/atoms/Flashcard/Flashcard";
import { Navbar, Signup, Login } from "./components/molecules";
import "./App.css";

const App: React.FC = () => {
    return (
        <Router>
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center ">
                    <h1 className="text-4xl font-bold mt-3 cursor-pointer hover:text-blue-500">
                        Flashcards
                    </h1>
                    </div>
                    <Routes>
                        <Route path="/" element={<Flashcard />} />
                    </Routes>

                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </>
        </Router>
    );
};

export default App;
