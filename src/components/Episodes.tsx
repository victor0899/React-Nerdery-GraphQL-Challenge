//comment for review
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EPISODES } from '../graphql/queries';
import { Episode, ApiResponse, Season } from '../types/episode';
import SeasonList from './SeasonList';
import SeasonDetail from './SeasonDetail';

const Episodes: React.FC = () => {
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadedAllPages, setHasLoadedAllPages] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<{
    episodes: ApiResponse<Episode>;
  }>(GET_EPISODES, {
    variables: { page: 1 },
  });

  const organizeEpisodesBySeason = (episodes: Episode[]) => {
    const episodesBySeason = new Map<number, Episode[]>();
    episodes.forEach(episode => {
      const seasonNumber = parseInt(episode.episode.substring(1, 3));
      if (!episodesBySeason.has(seasonNumber)) {
        episodesBySeason.set(seasonNumber, []);
      }
      episodesBySeason.get(seasonNumber)?.push(episode);
    });

    return Array.from(episodesBySeason.entries())
      .map(([number, episodes]) => ({
        number,
        episodes: episodes.sort((a, b) =>
          parseInt(a.episode.substring(4)) - parseInt(b.episode.substring(4))
        ),
      }))
      .sort((a, b) => a.number - b.number);
  };

  useEffect(() => {
    const loadAllPages = async () => {
      if (data?.episodes?.info?.pages && !hasLoadedAllPages) {
        setIsLoadingMore(true);
        try {
          const totalPages = data.episodes.info.pages;
          const promises = [];
          for (let page = 2; page <= totalPages; page++) {
            promises.push(
              fetchMore({
                variables: { page },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    episodes: {
                      ...fetchMoreResult.episodes,
                      results: [
                        ...prev.episodes.results,
                        ...fetchMoreResult.episodes.results
                      ],
                    },
                  };
                },
              })
            );
          }
          await Promise.all(promises);
          setHasLoadedAllPages(true);
        } catch (error) {
          console.error('Error loading all episodes:', error);
        } finally {
          setIsLoadingMore(false);
        }
      }
    };

    if (data?.episodes?.info?.pages && !hasLoadedAllPages) {
      loadAllPages();
    }
  }, [data?.episodes?.info?.pages, hasLoadedAllPages, fetchMore]);

  useEffect(() => {
    if (data?.episodes.results) {
      const newSeasons = organizeEpisodesBySeason(data.episodes.results);
      setSeasons(newSeasons);
    }
  }, [data?.episodes.results]);

  useEffect(() => {
    if (seasons.length > 0 && selectedSeasonNumber === null) {
      setSelectedSeasonNumber(seasons[0].number);
    }
  }, [seasons, selectedSeasonNumber]);

  const handleSeasonSelect = (seasonNumber: number) => {
    setSelectedSeasonNumber(seasonNumber);
    setIsDetailVisible(true);
  };

  const handleBackToList = () => {
    setIsDetailVisible(false);
  };

  const selectedSeason = seasons.find(season => season.number === selectedSeasonNumber) || null;
  const isInitialLoading = loading && !isLoadingMore;

  return (
    <div className="pt-[52px] flex flex-col md:flex-row">
      <div className={`md:block ${isDetailVisible ? 'hidden' : 'block'}`}>
        <SeasonList
          seasons={seasons}
          selectedSeasonNumber={selectedSeasonNumber}
          onSelectSeason={handleSeasonSelect}
          isLoading={isInitialLoading}
          error={error}
          onScroll={() => {}}
          isLoadingMore={isLoadingMore}
        />
      </div>
      <div className={`flex-1 ${isDetailVisible ? 'block' : 'hidden md:block'}`}>
        <SeasonDetail 
          season={selectedSeason} 
          onBack={handleBackToList}
        />
      </div>
    </div>
  );
};

export default Episodes;