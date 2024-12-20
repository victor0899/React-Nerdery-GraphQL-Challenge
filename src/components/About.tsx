import React from 'react';

const About: React.FC = () => {
  return (
  <div className="pt-[52px] flex">
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6">About This Project (React Nerdery GraphQL Challenge)</h1>
      
      <div className="space-y-6">
      <section>
          <h2 className="text-2xl font-semibold mb-3">What is this project?</h2>
          <p className="text-gray-700 leading-relaxed">
            This is a Rick and Morty character explorer application that allows users to browse and discover 
            characters from the popular animated series. Built with React, TypeScript, and Apollo Client, 
            this application fetches data from the <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" className="text-[#EC5757] hover:underline">Rick and Morty API</a>.
          </p>
        </section>


        <section>
          <h2 className="text-2xl font-semibold mb-3">Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Browse through all characters from the show with infinite scrolling</li>
            <li>View detailed information about each character</li>
            <li>Responsive design that works on both desktop and mobile devices</li>
            <li>Fast and efficient data loading with Apollo Client</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Technologies Used</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>React with TypeScript for type-safe development</li>
            <li>Apollo Client for GraphQL data fetching</li>
            <li>Tailwind CSS for styling</li>
            <li>Rick and Morty API as the data source</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Developed by</h2>
          <p className="list-disc pl-6 space-y-2 text-gray-700">
          <a href="https://github.com/victor0899" target="_blank" rel="noopener noreferrer" className="text-[#ec5757] hover:underline" >Victor Rodriguez</a> for <a href="https://ravn.co" target="_blank" rel="noopener noreferrer" className="text-[#EC5757] hover:underline" >RAVN </a>Nerdery Program Dec 20, 2024
          </p>
        </section>
      </div>
    </div>
    </div>
  );
};

export default About;