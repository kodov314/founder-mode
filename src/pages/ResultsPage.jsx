import { useContext } from 'react';
import { AIContext } from '../context/AIContext';
import { GeneratedLanding } from '../components/GeneratedLanding';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ResultsPage = () => {
  const { results, isLoading, error } = useContext(AIContext);
  
  console.log('Results page state:', { results, isLoading, error });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Произошла ошибка</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link 
            to="/business-form"
            className="px-6 py-3 bg-[#ff40ff] text-white rounded-full hover:opacity-90"
          >
            Попробовать снова
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#ff40ff] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-white">Генерация лендинга...</p>
        </div>
      </div>
    );
  }

  if (!results?.landing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-400 mb-8">Ожидание данных для генерации...</p>
          <Link 
            to="/business-form"
            className="px-6 py-3 bg-[#ff40ff] text-white rounded-full hover:opacity-90"
          >
            Вернуться к форме
          </Link>
        </div>
      </div>
    );
  }

  return <GeneratedLanding landingData={results.landing} />;
};

export default ResultsPage; 