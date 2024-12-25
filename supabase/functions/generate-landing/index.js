import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*'
}

serve(async (req) => {
  // Логируем входящий запрос
  console.log('Request method:', req.method);
  console.log('Request headers:', Object.fromEntries(req.headers));

  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    const body = await req.json();
    console.log('Request body:', body);

    // Проверяем наличие OpenAI API ключа
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Инициализируем OpenAI
    const configuration = new Configuration({
      apiKey
    })
    const openai = new OpenAIApi(configuration)

    // Формируем промпт
    const prompt = `
    Создай контент для лендинга на основе следующих данных:

    Описание бизнеса: ${body.description}
    Отрасль: ${body.industry}
    
    Дополнительная информация:
    ${JSON.stringify(body.sections, null, 2)}
    
    Сгенерируй следующие элементы:
    1. Заголовок (до 6 слов, должен привлекать внимание)
    2. Подзаголовок (1-2 предложения о главной ценности)
    3. 3 ключевые особенности (название до 3 слов и краткое описание)
    4. Миссию компании (1 предложение)
    5. Призыв к действию (короткая фраза)
    
    Ответ должен быть в формате JSON:
    {
      "title": "...",
      "subtitle": "...",
      "features": [
        { "title": "...", "description": "..." }
      ],
      "mission": "...",
      "cta": "..."
    }`

    // Получаем ответ от GPT
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ты - опытный копирайтер, специализирующийся на создании лендингов."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const content = JSON.parse(completion.data.choices[0].message.content)

    return new Response(
      JSON.stringify(content),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})