import { useContext } from 'react';
import { motion } from 'framer-motion';
import { WavyBackground } from '../components/ui/wavy-background';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { AIContext } from '../context/AIContext';

const ResultsPage = () => {
  const { aiResponse } = useContext(AIContext);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
          from-[#ff40ff] to-[#a041ff] mb-6 text-center
          drop-shadow-[0_0_15px_rgba(255,64,255,0.3)]">
          Результаты анализа
        </h1>

        <SpotlightCard className="p-6">
          <div className="space-y-6">
            {aiResponse ? (
              <div className="text-white">
                {/* Здесь будет отображаться ответ от AI */}
                <pre className="whitespace-pre-wrap">{aiResponse}</pre>
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                Ожидание результатов анализа...
              </div>
            )}
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};

export default ResultsPage; 