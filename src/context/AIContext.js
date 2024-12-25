import React, { createContext, useState, useEffect } from 'react';
import { useCursorGenerator } from '../hooks/useCursorGenerator';
import { useContextAnalyzer } from '../contexts/ContextAnalyzer';

export const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { generateLanding } = useCursorGenerator();
  const contextAnalyzer = useContextAnalyzer();

  const generateResults = async (businessData, onProgress) => {
    console.log('Starting generation with data:', businessData);
    try {
      setIsLoading(true);
      setError(null);
      
      // Анализ контекста (20%)
      onProgress?.(20);
      console.log('Analyzing business context...');
      const context = await contextAnalyzer.analyzeBusinessContext(businessData);
      console.log('Context analysis result:', context);
      
      // Генерация дизайна (50%)
      onProgress?.(50);
      console.log('Generating landing...');
      const landing = await generateLanding(businessData);
      console.log('Landing generated:', landing);
      
      // Финальные штрихи (100%)
      onProgress?.(100);
      setResults({ landing, context });
    } catch (err) {
      console.error('Error in generateResults:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Добавим эффект для отслеживания изменений состояния
  useEffect(() => {
    console.log('AIContext state updated:', {
      hasResults: !!results,
      isLoading,
      error
    });
  }, [results, isLoading, error]);

  return (
    <AIContext.Provider value={{ 
      results, 
      isLoading, 
      error, 
      generateResults 
    }}>
      {children}
    </AIContext.Provider>
  );
}; 