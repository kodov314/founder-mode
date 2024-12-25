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
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Получаем данные генерации
    const { data: generation, error: fetchError } = await supabaseClient
      .from('landing_generations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // Здесь должна быть логика генерации лендинга
    // Например, вызов API bolt.new или другого сервиса

    // Обновляем статус и результат
    const { error: updateError } = await supabaseClient
      .from('landing_generations')
      .update({
        status: 'completed',
        result: {
          // Результат генерации
        }
      })
      .eq('id', id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})