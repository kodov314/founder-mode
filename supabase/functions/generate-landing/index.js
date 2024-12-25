import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Обработка CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Получаем данные из запроса
    const { id } = await req.json()

    // Инициализируем Supabase клиент
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL'),
      Deno.env.get('SUPABASE_ANON_KEY')
    )

    // Получаем данные генерации
    const { data: generation, error: fetchError } = await supabaseClient
      .from('landing_generations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Формируем данные для генерации лендинга
    const landingData = {
      title: generation.business_data.description,
      sections: generation.business_data.sections,
      // Добавляем дополнительные параметры для генерации
      style: {
        theme: 'modern',
        colors: {
          primary: '#ff40ff',
          secondary: '#a041ff'
        }
      }
    }

    // Здесь будет логика генерации лендинга
    const generatedLanding = {
      html: `
        <!-- Сгенерированный HTML код лендинга -->
        <div class="landing-page">
          <header>...</header>
          <main>...</main>
          <footer>...</footer>
        </div>
      `,
      css: `
        /* Сгенерированные стили */
        .landing-page {
          /* ... */
        }
      `,
      assets: {
        // Ссылки на изображения и другие ресурсы
      }
    }

    // Обновляем статус и сохраняем результат
    const { error: updateError } = await supabaseClient
      .from('landing_generations')
      .update({
        status: 'completed',
        result: generatedLanding
      })
      .eq('id', id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true, data: generatedLanding }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in generate-landing function:', error)

    // Обновляем статус с ошибкой
    if (id) {
      await supabaseClient
        .from('landing_generations')
        .update({
          status: 'error',
          error: error.message
        })
        .eq('id', id)
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 400 
      }
    )
  }
}) 