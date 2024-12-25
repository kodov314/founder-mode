import { useState } from 'react';

const V0_API_TOKEN = process.env.REACT_APP_V0_API_TOKEN;

export const useV0Generator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLanding = async (businessData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Формируем промпт для v0.dev
      const prompt = `Create a modern landing page for ${businessData.sections[0].content[0].value} with:
        - Hero section with company name and description
        - Features section
        - About section
        - Contact form
        - Modern design with gradients
        - Responsive layout
        
        Business details:
        ${JSON.stringify(businessData, null, 2)}
      `;

      // Отправляем запрос к v0.dev API
      const response = await fetch('https://api.v0.dev/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${V0_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to generate landing page');
      }

      const data = await response.json();

      return {
        code: data.code, // React компоненты
        preview: data.preview, // URL предпросмотра
        deployUrl: data.deployUrl // URL для деплоя
      };

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateLanding, isLoading, error };
}; 