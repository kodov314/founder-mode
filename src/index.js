import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AIContextProvider } from './context/AIContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AIContextProvider>
        <App />
      </AIContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
