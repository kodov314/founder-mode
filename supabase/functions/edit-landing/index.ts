import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.1.0'

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
    const { prompt, context } = await req.json()

    // Инициализируем OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Формируем системный промпт
    const systemPrompt = `Ты - опытный веб-разработчик. Тебе нужно помочь отредактировать React компоненты лендинга.
    Текущие компоненты и данные:
    ${JSON.stringify(context.currentComponents, null, 2)}
    
    Бизнес данные:
    ${JSON.stringify(context.businessData, null, 2)}
    
    История изменений:
    ${JSON.stringify(context.editHistory, null, 2)}
    
    Отвечай только JSON объектом с полями:
    - message: сообщение пользователю о сделанных изменениях
    - updatedComponents: объект с обновленными React компонентами`

    // Получаем ответ от OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    })

    const aiResponse = completion.data.choices[0].message?.content
    const parsedResponse = JSON.parse(aiResponse || '{}')

    return new Response(
      JSON.stringify(parsedResponse),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
}) 