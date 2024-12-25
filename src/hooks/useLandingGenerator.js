import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdllppddyexrpocydrqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbGxwcGRkeWV4cnBvY3lkcnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTk4MTksImV4cCI6MjA1MDYzNTgxOX0.wV9cX1fOZ_wIim4hanRwpUZzlQvmIzbyDFC9zoucFgY';

const supabase = createClient(supabaseUrl, supabaseKey);

export const useLandingGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLanding = async (businessData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Создаем HTML для лендинга на основе данных
      const landingHTML = generateLandingHTML(businessData);
      
      // Сохраняем в Supabase
      const { data, error: insertError } = await supabase
        .from('landings')
        .insert([
          {
            business_data: businessData,
            html: landingHTML,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      // Возвращаем ID лендинга для просмотра
      return {
        id: data.id,
        html: landingHTML,
        previewUrl: `/preview/${data.id}`
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

// Функция генерации HTML
function generateLandingHTML(businessData) {
  const companyName = businessData.sections[0].content[0].value || 'Компания';
  const description = businessData.description || '';

  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${companyName}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: 'Inter', sans-serif; }
      </style>
    </head>
    <body>
      <div class="min-h-screen">
        <!-- Hero Section -->
        <header class="bg-gradient-to-r from-[#ff40ff] to-[#a041ff] text-white">
          <div class="container mx-auto px-4 py-20">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">${companyName}</h1>
            <p class="text-xl opacity-90">${description}</p>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container mx-auto px-4 py-12">
          ${businessData.sections.map(section => `
            <section class="mb-16">
              <h2 class="text-2xl font-bold mb-8 text-[#ff40ff]">${section.title}</h2>
              <div class="grid md:grid-cols-2 gap-8">
                ${section.content.map(item => `
                  <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-[#a041ff]">${item.subtitle}</h3>
                    <p class="text-gray-600">${item.value || 'Нет данных'}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          `).join('')}
        </main>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-8">
          <div class="container mx-auto px-4 text-center">
            <p>&copy; ${new Date().getFullYear()} ${companyName}. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </body>
    </html>
  `;
} 