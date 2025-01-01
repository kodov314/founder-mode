import { useContext } from 'react';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { AIContext } from '../context/AIContext';
import { PageTransition } from '../components/ui/page-transition.jsx';

const ResultPitchDeckPage = () => {
  const { pitchDeckResponse, isLoading } = useContext(AIContext);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#1a1f2e] relative overflow-hidden">
        {/* Фон и градиенты */}
        <div className="fixed inset-0 bg-gradient-to-b from-[#1a1f2e] to-[#151923]" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full 
            bg-gradient-to-b from-[#ff40ff]/8 to-transparent 
            blur-[120px] animate-pulse transform rotate-12" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full 
            bg-gradient-to-t from-[#a041ff]/8 to-transparent 
            blur-[120px] animate-pulse delay-1000 transform -rotate-12" />
        </div>

        <div className="relative px-4 py-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-[#e88d7c] to-[#b86ef7] mb-12 text-center 
            leading-relaxed py-4">
            Pitch Deck
          </h1>

          <div className="overflow-hidden py-6">
            <SpotlightCard className="p-6">
              <div className="space-y-6">
                {pitchDeckResponse ? (
                  <div className="text-[#d1d5db]">
                    <pre className="whitespace-pre-wrap">{pitchDeckResponse}</pre>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    {isLoading ? 'Генерация Pitch Deck...' : 'Нет данных'}
                  </div>
                )}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResultPitchDeckPage; 