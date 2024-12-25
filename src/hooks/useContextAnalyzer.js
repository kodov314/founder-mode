export const useContextAnalyzer = () => {
  // Анализ бизнес-контекста
  const analyzeBusinessContext = (businessData) => {
    const {
      description,
      industry,
      target_audience,
      goals,
      values,
      unique_selling_points
    } = businessData;

    // Анализ ключевых слов и их веса
    const keywordAnalysis = extractKeywords(description);
    
    // Определение основных тем бизнеса
    const businessThemes = analyzeThemes(keywordAnalysis);
    
    // Анализ целевой аудитории
    const audienceProfile = analyzeAudience(target_audience);
    
    // Определение тона коммуникации
    const communicationTone = determineTone(audienceProfile, industry);

    return {
      themes: businessThemes,
      audience: audienceProfile,
      tone: communicationTone,
      visualStyle: determineVisualStyle(businessThemes, audienceProfile),
      contentStrategy: createContentStrategy(businessThemes, communicationTone)
    };
  };

  // Извлечение и анализ ключевых слов
  const extractKeywords = (text) => {
    const words = text.toLowerCase().split(/\W+/);
    const keywordWeights = new Map();

    // Анализ частоты и контекста слов
    words.forEach((word, index) => {
      if (word.length > 2) { // Игнорируем короткие слова
        const weight = calculateWordWeight(word, words, index);
        keywordWeights.set(word, (keywordWeights.get(word) || 0) + weight);
      }
    });

    return Array.from(keywordWeights.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Топ-10 ключевых слов
  };

  // Определение веса слова на основе контекста
  const calculateWordWeight = (word, words, index) => {
    let weight = 1;

    // Увеличиваем вес для слов в важных контекстах
    if (index < words.length / 4) weight *= 1.5; // Слова в начале важнее
    if (word.length > 6) weight *= 1.2; // Длинные слова часто более значимы
    
    // Проверяем соседние слова для контекста
    const context = words.slice(Math.max(0, index - 2), index + 3);
    if (context.some(w => IMPORTANT_CONTEXT_WORDS.includes(w))) weight *= 1.3;

    return weight;
  };

  // Анализ основных тем бизнеса
  const analyzeThemes = (keywords) => {
    const themes = {
      technology: 0,
      innovation: 0,
      traditional: 0,
      luxury: 0,
      sustainability: 0,
      service: 0,
      // ... другие темы
    };

    keywords.forEach(([word, weight]) => {
      // Определяем к каким темам относится слово
      Object.keys(THEME_KEYWORDS).forEach(theme => {
        if (THEME_KEYWORDS[theme].some(kw => word.includes(kw))) {
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
  const analyzeAudience = (audienceData) => {
    return {
      type: determineAudienceType(audienceData),
      sophistication: calculateSophisticationLevel(audienceData),
      preferences: extractAudiencePreferences(audienceData)
    };
  };

  // Определение визуального стиля
  const determineVisualStyle = (themes, audience) => {
    const primaryTheme = themes[0];
    const sophisticationLevel = audience.sophistication;

    return {
      colors: generateColorScheme(primaryTheme, sophisticationLevel),
      typography: selectTypography(themes, audience),
      layout: determineLayout(themes, audience),
      imagery: defineImageryStyle(themes, audience)
    };
  };

  return {
    analyzeBusinessContext
  };
};

// Константы для анализа
const IMPORTANT_CONTEXT_WORDS = [
  'leading', 'best', 'innovative', 'unique', 'premier',
  'advanced', 'professional', 'expert', 'specialized'
];

const THEME_KEYWORDS = {
  technology: ['tech', 'digital', 'software', 'ai', 'automation'],
  innovation: ['innovative', 'new', 'future', 'advanced'],
  traditional: ['established', 'trusted', 'heritage', 'classic'],
  luxury: ['premium', 'exclusive', 'luxury', 'elite'],
  sustainability: ['eco', 'sustainable', 'green', 'responsible'],
  service: ['service', 'support', 'help', 'solution']
}; 