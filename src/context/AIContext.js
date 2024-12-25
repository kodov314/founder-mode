import { createContext, useState } from 'react';
import { useBoltNew } from '../hooks/useBoltNew';

export const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
  const [results, setResults] = useState({});
  const [currentIteration, setCurrentIteration] = useState(1);
  const { generateLanding, isLoading, error } = useBoltNew();
  
  const processWithAI = async (data) => {
    try {
      console.log('Processing data:', data); // Для отладки
      
      // Генерируем лендинг через bolt.new
      const landingData = await generateLanding(data);
      console.log('Landing data received:', landingData); // Для отладки
      
      // Сохраняем результат
      setResults(prev => ({
        ...prev,
        landing: landingData
      }));

      setCurrentIteration(prev => Math.min(prev + 1, 6));
      
      return landingData;
      
    } catch (error) {
      console.error('Error in AI processing:', error);
      throw error;
    }
  };
  
  return (
    <AIContext.Provider value={{ 
      results, 
      currentIteration,
      processWithAI,
      isLoading,
      error 
    }}>
      {children}
    </AIContext.Provider>
  );
}; 