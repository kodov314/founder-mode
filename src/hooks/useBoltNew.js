import { useState } from 'react';

const BOLT_API_KEY = process.env.REACT_APP_BOLT_API_KEY;

export const useBoltNew = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hostingUrl, setHostingUrl] = useState(null);

  const generateLanding = async (businessData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Формируем запрос к bolt.new API
      const response = await fetch('https://api.bolt.new/v1/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BOLT_API_KEY}`
        },
        body: JSON.stringify({
          name: businessData.sections[0].content[0].value || 'founder-mode-landing',
          description: businessData.description,
          template: 'landing-page',
          content: {
            title: businessData.sections[0].content[0].value,
            description: businessData.description,
            sections: businessData.sections.map(section => ({
              title: section.title,
              items: section.content.map(item => ({
                title: item.subtitle,
                description: item.value
              }))
            }))
          },
          styling: {
            theme: 'modern',
            colors: {
              primary: '#ff40ff',
              secondary: '#a041ff',
              background: '#ffffff',
              text: '#2b3147'
            },
            fonts: {
              heading: 'Inter',
              body: 'Inter'
            }
          },
          features: {
            animations: true,
            responsiveness: true,
            contactForm: true
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate landing page');
      }

      const data = await response.json();
      setHostingUrl(data.url);

      return {
        hostingUrl: data.url,
        previewUrl: data.previewUrl,
        status: 'completed'
      };

    } catch (err) {
      console.error('Error generating landing:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateLanding, isLoading, error, hostingUrl };
}; 