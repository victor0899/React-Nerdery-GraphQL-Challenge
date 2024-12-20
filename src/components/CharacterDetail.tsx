import React from 'react';
import { Character } from '../types/character';
import { ChevronLeft } from 'lucide-react';

interface CharacterDetailProps {
  character: Character | null;
  onBack: () => void;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character, onBack }) => {
  if (!character) {
    return (
      <div className="text-center text-gray-500 p-4">
        Select a character from the list to view details
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white overflow-hidden">
      <div className="md:hidden flex items-center p-4 border-b border-gray-200">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to list
        </button>
      </div>
      
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-auto"
      />
      
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{character.name}</h2>
        <div className="space-y-1">
          <p className="text-gray-700">
            <span className="font-semibold">Species:</span> {character.species}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span> {character.status}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Gender:</span> {character.gender}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Location:</span> {character.location.name}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Origin:</span> {character.origin.name}
          </p>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">First 5 Episodes:</h3>
            <ul className="space-y-2">
              {character.episode.slice(0, 5).map((episode) => (
                <li key={episode.id} className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-700">
                    <span className="font-medium">{episode.episode}:</span> {episode.name}
                  </p>
                </li>
              ))}
            </ul>
            {character.episode.length === 0 && (
              <p className="text-gray-500 italic">No episodes available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;