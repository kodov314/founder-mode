import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';
import { useContextAnalyzer } from '../contexts/ContextAnalyzer';
import { motion } from 'framer-motion';

// Вспомогательные функции
const selectHeadingFont = (tone) => {
  switch (tone) {
    case 'professional': return '"Inter", sans-serif';
    case 'creative': return '"Poppins", sans-serif';
    case 'traditional': return '"Merriweather", serif';
    default: return '"Inter", sans-serif';
  }
};

const selectBodyFont = (tone) => {
  switch (tone) {
    case 'professional': return '"Source Sans Pro", sans-serif';
    case 'creative': return '"DM Sans", sans-serif';
    case 'traditional': return '"PT Serif", serif';
    default: return '"Source Sans Pro", sans-serif';
  }
};

const generateContent = async (businessData) => {
  try {
    // Создаем вызываемую функцию с явным указанием региона
    const generateLandingFunction = httpsCallable(
      functions, 
      'generateLanding'
    );

    // Добавляем обработку ошибок
    try {
      const result = await generateLandingFunction({
        description: businessData.description || '',
        industry: businessData.industry || '',
        sections: businessData.sections || []
      });

      console.log('API Response:', result.data);
      return result.data;
    } catch (error) {
      console.error('Firebase Function Error:', error);
      if (error.code === 'functions/unavailable') {
        throw new Error('Сервис временно недоступен. Пожалуйста, попробуйте позже.');
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in generateContent:', error);
    throw error;
  }
};

const generateComponents = async (context, designSystem) => {
  // Получаем сгенерированный контент
  const content = await generateContent(context.businessData);
  
  return {
    Hero: ({ design, isDarkMode }) => (
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-16 w-auto" />
            </div>
            <nav className="space-x-6">
              <a href="#features" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:opacity-80`}>
                Особенности
              </a>
              <a href="#about" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:opacity-80`}>
                О нас
              </a>
              <a href="#contact" className={`${isDarkMode ? 'text-white' : 'text-gray-800'} hover:opacity-80`}>
                Контакты
              </a>
            </nav>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              {content.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {content.subtitle}
            </motion.p>
          </div>
        </div>
      </section>
    ),

    Features: ({ design, isDarkMode }) => {
      return (
        <section id="features" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Наши преимущества
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}
                >
                  <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    },

    About: ({ design, isDarkMode }) => {
      return (
        <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={`text-4xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                О нас
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {content.mission}
              </p>
            </div>
          </div>
        </section>
      );
    },

    Contact: ({ design, isDarkMode }) => {
      return (
        <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Свяжитесь с нами
              </h2>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Сообщение"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className={`w-full py-4 rounded-lg font-semibold text-white ${
                    isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>
      );
    }
  };
};

export const useCursorGenerator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const contextAnalyzer = useContextAnalyzer();

  const generateLanding = async (businessData) => {
    console.log('Starting landing generation with data:', businessData);
    setIsLoading(true);
    setError(null);

    try {
      // Имитируем длительный процесс генерации
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Analyzing business context...');
      const context = await contextAnalyzer.analyzeBusinessContext({ ...businessData });

      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Generating design system...');
      const designSystem = await generateDesignSystem(context);

      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Generating components...');
      const components = await generateComponents({ ...context, businessData }, designSystem);

      return {
        components,
        designSystem,
        context
      };

    } catch (err) {
      console.error('Error in landing generation:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateDesignSystem = async (context) => {
    const { themes, audience, tone } = context;
    
    // Базовые цвета на основе тем
    const baseColors = generateBaseColors(themes[0]);
    
    return {
      colors: {
        primary: baseColors.primary,
        secondary: baseColors.secondary,
        accent: baseColors.accent,
        background: baseColors.background,
        text: baseColors.text,
        surface: baseColors.surface
      },
      typography: {
        headingFont: selectHeadingFont(tone),
        bodyFont: selectBodyFont(tone),
        headingSizes: {
          h1: 'text-4xl md:text-6xl lg:text-7xl',
          h2: 'text-3xl md:text-4xl lg:text-5xl',
          h3: 'text-2xl md:text-3xl'
        }
      },
      spacing: {
        section: 'py-16 md:py-24 lg:py-32',
        container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
      },
      effects: {
        buttonHover: 'transform hover:scale-105 transition-all duration-300',
        cardHover: 'hover:shadow-xl transition-all duration-300',
        fadeIn: 'animate-fade-in'
      }
    };
  };

  const generateBaseColors = (primaryTheme) => {
    // Генерация цветовой схемы на основе темы
    switch (primaryTheme) {
      case 'technology':
        return {
          primary: '#2563eb',    // Яркий синий
          secondary: '#1e40af',  // Темно-синий
          accent: '#3b82f6',     // Светло-синий
          background: '#f8fafc',
          text: '#1e293b',
          surface: '#ffffff'
        };
      case 'innovation':
        return {
          primary: '#7c3aed',    // Фиолетовый
          secondary: '#5b21b6',  // Темно-фиолетовый
          accent: '#8b5cf6',     // Светло-фиолетовый
          background: '#f5f3ff',
          text: '#1e1b4b',
          surface: '#ffffff'
        };
      // ... другие темы
      default:
        return {
          primary: '#3b82f6',
          secondary: '#1e40af',
          accent: '#60a5fa',
          background: '#f8fafc',
          text: '#1e293b',
          surface: '#ffffff'
        };
    }
  };

  return {
    generateLanding,
    isLoading,
    error
  };
}; 