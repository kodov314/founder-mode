import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import BusinessFormPage from './pages/BusinessFormPage';
import ResultsPage from './pages/ResultsPage';

const App = () => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          Привет, Tailwind CSS!
        </h1>
        
        {/* Карточка 1 */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-card rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Светлая тема
            </h2>
            <p className="text-card-foreground">
              Это карточка в светлой теме с новыми стилями
            </p>
          </div>

          {/* Карточка 2 */}
          <div className="p-6 bg-secondary rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold text-secondary-foreground mb-4">
              Дополнительные стили
            </h2>
            <p className="text-secondary-foreground">
              Пример использования вторичных цветов
            </p>
          </div>
        </div>

        {/* Кнопки */}
        <div className="mt-8 space-x-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
            Основная кнопка
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90">
            Вторичная кнопка
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
