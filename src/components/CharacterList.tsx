import React from 'react';
import { Character } from '../types/character';
import LoadingSpinner from './LoadingSpinner';
import { ChevronRight } from 'lucide-react';

interface CharacterListProps {
  characters: Character[];
  selectedCharacterId?: string;
  onSelectCharacter: (character: Character) => void;
  isLoading: boolean;
  error?: Error;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  isLoadingMore: boolean;
  hasMorePages: boolean;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  isLoading,
  error,
  onScroll,
  isLoadingMore,
  hasMorePages
}) => {
  return (
    <div
      className="w-full md:w-[350px] h-[848px] overflow-y-auto border-r border-[#00000026] shadow-[1px_0px_0px_0px_#00000026] md:static fixed top-0 left-0 z-10 bg-white"
      onScroll={onScroll}
    >
      {isLoading && <LoadingSpinner />}
      {error && <p className="p-4 text-red-500">Error: {error.message}</p>}
      {characters.length > 0 && (
        <>
            <ul className="divide-y divide-gray-200">
              {characters.map((character) => (
                <li
                  key={character.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors
                    ${selectedCharacterId === character.id ? 'bg-gray-100' : ''}`}
                  onClick={() => onSelectCharacter(character)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{character.name}</h3>
                      <p className="text-gray-500">{character.species}</p>
                    </div>
                    <ChevronRight className="w-5 h-5" color="#000000" />
                  </div>
                </li>
              ))}
            </ul>

          {isLoadingMore && <LoadingSpinner />}
          {!isLoadingMore && characters.length > 0 && !hasMorePages && (
            <p className="p-4 text-center text-gray-500">No hay más personajes para cargar</p>
          )}
        </>
      )}
    </div>
  );
};

export default CharacterList;