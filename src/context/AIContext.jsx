import { createContext, useState } from 'react';

export const AIContext = createContext();

export const AIContextProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState('');
  const [landingResponse, setLandingResponse] = useState('');
  const [pitchDeckResponse, setPitchDeckResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AIContext.Provider 
      value={{ 
        businessData, 
        setBusinessData,
        landingResponse, 
        setLandingResponse,
        pitchDeckResponse, 
        setPitchDeckResponse,
        isLoading, 
        setIsLoading 
      }}
    >
      {children}
    </AIContext.Provider>
  );
}; 