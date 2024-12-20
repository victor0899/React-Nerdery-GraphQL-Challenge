import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from './graphql/queries';
import { Character, ApiResponse } from './types/character';
import { Page } from './types/pages';
import Navbar from './components/Navbar';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import About from './components/About';
import Episodes from './components/Episodes';

const SCROLL_THRESHOLD = 0.6;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('characters');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);

  const { loading, error, data, fetchMore } = useQuery<{
    characters: ApiResponse<Character>;
  }>(GET_CHARACTERS, {
    variables: { page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data?.characters?.info) {
      console.log('Data loaded:', data.characters);
      setHasMorePages(!!data.characters.info.next);
    }
  }, [data]);

  // Funciones de manejo
  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setIsDetailVisible(true);
  };

  const handleBackToList = () => {
    setIsDetailVisible(false);
  };

  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    console.log('Scroll debug:', {
      scrollPercentage,
      hasMorePages,
      isLoadingMore,
      loading,
      currentPage: page
    });

    if (
      scrollPercentage > SCROLL_THRESHOLD &&
      hasMorePages &&
      !isLoadingMore &&
      !loading
    ) {
      console.log('Starting to load more characters...');
      setIsLoadingMore(true);
      
      try {
        const nextPage = page + 1;
        console.log('Fetching page:', nextPage);
        
        const result = await fetchMore({
          variables: { page: nextPage },
        });

        console.log('Fetch result:', result.data.characters);

        if (result.data.characters.results.length > 0) {
          setPage(nextPage);
          setHasMorePages(!!result.data.characters.info.next);
          console.log(`Loaded ${result.data.characters.results.length} new characters`);
        } else {
          setHasMorePages(false);
          console.log('No more characters to load');
        }
      } catch (error) {
        console.error('Error loading more characters:', error);
        setHasMorePages(false);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  console.log('Rendering character list with:', {
    charactersCount: data?.characters.results?.length || 0,
    isLoading: loading,
    hasError: !!error
  });

  const renderContent = () => {
    switch (currentPage) {
      case 'characters':
        return (
          <main className="pt-[52px] flex flex-col md:flex-row">
            <div className={`md:block ${isDetailVisible ? 'hidden' : 'block'}`}>
              <CharacterList
                characters={data?.characters?.results || []}
                selectedCharacterId={selectedCharacter?.id}
                onSelectCharacter={handleCharacterSelect}
                isLoading={loading}
                error={error}
                onScroll={handleScroll}
                isLoadingMore={isLoadingMore}
                hasMorePages={hasMorePages}
              />
            </div>
            <div className={`flex-1 ${isDetailVisible ? 'block' : 'hidden md:block'}`}>
              <CharacterDetail
                character={selectedCharacter}
                onBack={handleBackToList}
              />
            </div>
          </main>
        );
      case 'about':
        return <About />;
      case 'episodes':
        return <Episodes />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderContent()}
    </div>
  );
};

export default App;