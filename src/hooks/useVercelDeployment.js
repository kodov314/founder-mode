import { useState } from 'react';

const VERCEL_API_TOKEN = process.env.REACT_APP_VERCEL_API_TOKEN;
const VERCEL_TEAM_ID = process.env.REACT_APP_VERCEL_TEAM_ID; // опционально

export const useVercelDeployment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deployLanding = async (businessData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Создаем проект в Vercel
      const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: businessData.sections[0].content[0].value.toLowerCase().replace(/\s+/g, '-'),
          framework: 'create-react-app'
        })
      });

      const project = await createProjectResponse.json();

      // 2. Создаем деплоймент
      const deploymentResponse = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VERCEL_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: project.name,
          project: project.id,
          target: 'production',
          files: [
            {
              file: 'index.html',
              data: generateLandingHTML(businessData)
            },
            {
              file: 'styles.css',
              data: generateStyles()
            }
          ]
        })
      });

      const deployment = await deploymentResponse.json();

      return {
        projectId: project.id,
        deploymentId: deployment.id,
        url: deployment.url,
        previewUrl: `https://${deployment.url}`
      };

    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deployLanding, isLoading, error };
};

// Генерация HTML
function generateLandingHTML(businessData) {
  // Тот же код генерации HTML, что и раньше
}

// Генерация стилей
function generateStyles() {
  return `
    /* Ваши стили */
  `;
} 