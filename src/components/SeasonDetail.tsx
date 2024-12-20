import React from 'react';
import { Season } from '../types/episode';
import { ChevronLeft } from 'lucide-react';

interface SeasonDetailProps {
  season: Season | null;
  onBack: () => void;
}

const SeasonDetail: React.FC<SeasonDetailProps> = ({ season, onBack }) => {
  if (!season) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Select a season to see its episodes</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="md:hidden flex items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to seasons
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Season {season.number}</h2>
      <div className="space-y-4">
        {season.episodes.map((episode) => (
          <div
            key={episode.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{episode.name}</h3>
              <span className="text-sm text-gray-500">{episode.episode}</span>
            </div>
            <p className="text-gray-600">Air date: {episode.air_date}</p>
            <p className="text-sm text-gray-500 mt-2">
              {episode.characters.length} characters appear
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetail;