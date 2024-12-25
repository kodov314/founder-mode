import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdllppddyexrpocydrqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbGxwcGRkeWV4cnBvY3lkcnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNTk4MTksImV4cCI6MjA1MDYzNTgxOX0.wV9cX1fOZ_wIim4hanRwpUZzlQvmIzbyDFC9zoucFgY';

const supabase = createClient(supabaseUrl, supabaseKey);

export const useBoltNew = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateLanding = async (businessData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Sending business data:', businessData);

      // Формируем HTML на основе полученных данных
      const landingHTML = `
        <div class="landing">
          <h1>${businessData.description || ''}</h1>
          ${businessData.sections.map(section => `
            <section>
              <h2>${section.title}</h2>
              ${section.content.map(item => `
                <div>
                  <h3>${item.subtitle}</h3>
                  <p>${item.value || 'Нет данных'}</p>
                </div>
              `).join('')}
            </section>
          `).join('')}
        </div>
      `;

      // Сохраняем в Supabase
      const { data: generation, error: insertError } = await supabase
        .from('landing_generations')
        .insert([
          {
            business_data: businessData,
            status: 'completed',
            result: {
              html: landingHTML,
              css: `
                .landing {
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 2rem;
                }
              `,
              assets: {}
            }
          }
        ])
        .select()
        .single();

      if (insertError) throw insertError;

      return generation.result;

    } catch (err) {
      console.error('Error generating landing:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateLanding, isLoading, error };
}; 