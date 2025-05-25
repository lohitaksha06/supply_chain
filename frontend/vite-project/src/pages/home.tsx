import React from 'react';
import { Link } from 'react-router-dom';
import "./home.css";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 p-8">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
        PharmaChain: Secure Medicine Supply Tracker
      </h1>
      <p className="text-gray-700 text-center max-w-xl mb-10">
        Ensuring transparency and traceability in the pharmaceutical supply chain using blockchain technology.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/tracker">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md">
            Track Medicine
          </button>
        </Link>
        <Link to="/company">
          <button className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-semibold py-2 px-6 rounded-xl shadow-md">
            Company Portal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
