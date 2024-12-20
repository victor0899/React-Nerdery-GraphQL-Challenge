import React from 'react';
import { Season } from '../types/episode';
import { ApolloError } from '@apollo/client';

interface SeasonListProps {
  seasons: Season[];
  selectedSeasonNumber: number | null;
  onSelectSeason: (seasonNumber: number) => void;
  isLoading: boolean;
  error?: ApolloError;
  onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  isLoadingMore: boolean;
}

const SeasonList: React.FC<SeasonListProps> = ({
  seasons,
  selectedSeasonNumber,
  onSelectSeason,
  isLoading,
  error,
  onScroll,
  isLoadingMore,
}) => {
  if (error) {
    return (
      <div className="w-full md:w-[350px] bg-white border-r border-gray-200 fixed md:static top-0 left-0 z-10">
        <div className="p-4 text-red-500">Error loading seasons: {error.message}</div>
      </div>
    );
  }

  if (isLoading && !isLoadingMore) {
    return (
      <div className="w-full md:w-[350px] bg-white border-r border-gray-200 fixed md:static top-0 left-0 z-10">
        <div className="p-4">Loading seasons...</div>
      </div>
    );
  }

  return (
    <div
      className="w-full md:w-[350px] bg-white border-r border-gray-200 overflow-y-auto fixed md:static top-54 left-0 z-10 h-[848px]"
      onScroll={onScroll}
    >
      {seasons.map((season) => (

        <div
          key={season.number}
          className={`p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 ${
            selectedSeasonNumber === season.number ? 'bg-gray-100' : ''
          }`}
          onClick={() => onSelectSeason(season.number)}
        >
          <h3 className="text-lg font-medium">Season {season.number}</h3>
          <p className="text-sm text-gray-500">{season.episodes.length} episodes</p>
        </div>

      ))}
      {isLoadingMore && (
        <div className="p-4 text-center text-gray-500">Loading more seasons...</div>
      )}
      
    </div>

  );
};

export default SeasonList;