import { createContext, useState } from 'react';

export const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
  const [currentIteration, setCurrentIteration] = useState(1);
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState(null);

  const processWithAI = async (data) => {
    if (currentIteration > 6) {
      return null;
    }

    setFormData(data);
    
    // Имитация ответа ИИ
    const result = {
      iteration: currentIteration,
      pitchDeck: {
        url: `https://example.com/pitch-deck-${currentIteration}.pdf`,
        preview: `Превью презентации ${currentIteration}`
      },
      landingPage: {
        url: `https://example.com/landing-${currentIteration}`,
        preview: `Превью лендинга ${currentIteration}`
      }
    };
    
    setResults([...results, result]);
    setCurrentIteration(prev => prev + 1);
    return result;
  };

  return (
    <AIContext.Provider value={{ 
      currentIteration,
      results,
      formData,
      processWithAI,
      isLastIteration: currentIteration > 6 
    }}>
      {children}
    </AIContext.Provider>
  );
}; 