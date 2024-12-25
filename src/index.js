import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ContextAnalyzerProvider } from './contexts/ContextAnalyzer';
import { AIContextProvider } from './context/AIContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextAnalyzerProvider>
        <AIContextProvider>
          <App />
        </AIContextProvider>
      </ContextAnalyzerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
