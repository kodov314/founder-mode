import { createContext, useContext } from 'react';

const ContextAnalyzerContext = createContext();

// Константы для анализа
const IMPORTANT_KEYWORDS = {
  technology: ['ai', 'технологии', 'платформа', 'автоматизация', 'данные', 'аналитика'],
  eco: ['эко', 'устойчивый', 'зеленый', 'окружающая среда', 'углеродный'],
  business: ['бизнес', 'компания', 'предприятие', 'организация', 'решение'],
  innovation: ['инновации', 'современный', 'передовой', 'новый', 'будущее'],
  professional: ['профессиональный', 'эксперт', 'специалист', 'качество'],
  service: ['сервис', 'услуга', 'поддержка', 'помощь', 'обслуживание']
};

const TONE_MARKERS = {
  formal: ['профессиональный', 'корпоративный', 'официальный'],
  friendly: ['дружелюбный', 'простой', 'доступный'],
  innovative: ['современный', 'инновационный', 'передовой'],
  trustworthy: ['надежный', 'проверенный', 'стабильный']
};

export const useContextAnalyzer = () => {
  const context = useContext(ContextAnalyzerContext);
  if (!context) {
    throw new Error('useContextAnalyzer must be used within a ContextAnalyzerProvider');
  }
  return context;
};

export const ContextAnalyzerProvider = ({ children }) => {
  // Извлечение и анализ ключевых слов
  const extractKeywords = (text = '') => {
    if (!text) return [];
    
    const words = text.toLowerCase().split(/\W+/);
    const keywordWeights = new Map();

    words.forEach((word) => {
      if (word.length > 2) {
        let weight = 1;
        
        Object.entries(IMPORTANT_KEYWORDS).forEach(([category, keywords]) => {
          if (keywords.some(keyword => word.includes(keyword))) {
            weight += 2;
            keywordWeights.set(category, (keywordWeights.get(category) || 0) + 1);
          }
        });

        keywordWeights.set(word, (keywordWeights.get(word) || 0) + weight);
      }
    });

    return Array.from(keywordWeights.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  // Анализ основных тем бизнеса
  const analyzeThemes = (keywords) => {
    const themes = {
      technology: 0,
      eco: 0,
      business: 0,
      innovation: 0,
      professional: 0,
      service: 0
    };

    keywords.forEach(([word, weight]) => {
      Object.entries(IMPORTANT_KEYWORDS).forEach(([theme, keywords]) => {
        if (keywords.some(keyword => word.includes(keyword))) {
          themes[theme] += weight;
        }
      });
    });

    return Object.entries(themes)
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0)
      .map(([theme]) => theme);
  };

  // Анализ целевой аудитории
  const analyzeAudience = (audienceData = '') => {
    const audienceText = (audienceData || '').toLowerCase();
    
    return {
      type: determineAudienceType(audienceText),
      sophistication: calculateSophisticationLevel(audienceText),
      preferences: extractAudiencePreferences(audienceText)
    };
  };

  // Определение типа аудитории
  const determineAudienceType = (text) => {
    if (text.includes('бизнес') || text.includes('компани')) return 'business';
    if (text.includes('специалист') || text.includes('профессионал')) return 'professional';
    if (text.includes('пользовател')) return 'consumer';
    return 'general';
  };

  // Определение уровня сложности
  const calculateSophisticationLevel = (text) => {
    let score = 0;
    if (text.includes('технич')) score += 2;
    if (text.includes('профессионал')) score += 2;
    if (text.includes('прост') || text.includes('начинающ')) score -= 1;
    return Math.max(1, Math.min(5, score + 3)); // Шкала от 1 до 5
  };

  // Извлечение предпочтений аудитории
  const extractAudiencePreferences = (text) => {
    const preferences = [];
    if (text.includes('быстр')) preferences.push('efficiency');
    if (text.includes('качеств')) preferences.push('quality');
    if (text.includes('цен')) preferences.push('value');
    if (text.includes('современ')) preferences.push('innovation');
    return preferences;
  };

  // Определение тона коммуникации
  const determineTone = (audience, industry) => {
    const { type, sophistication } = audience;
    
    if (type === 'business' && sophistication > 3) return 'professional';
    if (type === 'professional') return 'technical';
    if (type === 'consumer') return 'friendly';
    return 'balanced';
  };

  const analyzeBusinessContext = async (businessData) => {
    try {
      // Проверяем наличие данных
      if (!businessData) {
        throw new Error('Не предоставлены данные для анализа');
      }

      const keywordAnalysis = extractKeywords(businessData.description);
      const themes = analyzeThemes(keywordAnalysis);
      const audience = analyzeAudience(businessData.target_audience);
      const tone = determineTone(audience, businessData.industry);

      return {
        themes,
        audience,
        tone,
        keywords: keywordAnalysis
      };
    } catch (err) {
      console.error('Error in analyzeBusinessContext:', err);
      throw new Error('Ошибка при анализе данных: ' + err.message);
    }
  };

  return (
    <ContextAnalyzerContext.Provider value={{ analyzeBusinessContext }}>
      {children}
    </ContextAnalyzerContext.Provider>
  );
}; 