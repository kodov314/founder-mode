import React, { useContext, useEffect, useState } from 'react';
import { AIContext } from '../context/AIContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronUpIcon, PencilIcon } from '@heroicons/react/24/outline';

const ResultsPage = () => {
  const { results, isLoading, error } = useContext(AIContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    console.log('ResultsPage mounted');
    console.log('Results state:', results);
    console.log('Loading state:', isLoading);
    console.log('Error state:', error);
  }, [results, isLoading, error]);

  // Если данные загружаются, показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2563eb] to-[#1e40af]">
        <div className="text-center text-white">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Генерируем ваш лендинг</h2>
          <p className="text-white/80">Это может занять несколько секунд...</p>
        </div>
      </div>
    );
  }

  // Если есть ошибка, показываем сообщение об ошибке
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800">
        <div className="text-center text-white max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">Произошла ошибка</h2>
          <p className="mb-6">{error}</p>
          <Link 
            to="/business-form"
            className="px-6 py-3 bg-white text-red-600 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Вернуться к форме
          </Link>
        </div>
      </div>
    );
  }

  // Если нет результатов, показываем сообщение
  if (!results?.landing?.components) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2563eb] to-[#1e40af]">
        <div className="text-center text-white max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">Нет данных для отображения</h2>
          <p className="mb-6">Пожалуйста, заполните форму для генерации лендинга</p>
          <Link 
            to="/business-form"
            className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Перейти к форме
          </Link>
        </div>
      </div>
    );
  }

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Рендерим результаты
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      {/* Верхняя панель */}
      <div className="bg-[#2b3147] p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-white font-bold">Предпросмотр лендинга</h2>
          <div className="space-x-4">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-white border border-white rounded-full hover:bg-white hover:text-[#2b3147] transition-all"
            >
              {isDarkMode ? 'Светлая тема' : 'Темная тема'}
            </button>
            <button
              onClick={() => setIsEditorOpen(!isEditorOpen)}
              className="px-4 py-2 text-[#ff40ff] border border-[#ff40ff] rounded-full hover:bg-[#ff40ff] hover:text-white transition-all inline-flex items-center"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              {isEditorOpen ? 'Скрыть редактор' : 'Редактировать'}
            </button>
            <Link 
              to="/business-form"
              className="px-4 py-2 bg-[#ff40ff] text-white rounded-full hover:opacity-90 transition-all"
            >
              Вернуться к форме
            </Link>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="landing-preview">
        {Object.entries(results.landing.components).map(([name, Component]) => (
          <Component 
            key={name} 
            design={results.landing.designSystem}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage; 