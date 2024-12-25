/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const OpenAI = require('openai');
require('dotenv').config();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.generateLanding = onCall({
  maxInstances: 10,
}, async (request) => {
  try {
    logger.info('Function started');
    const { description, industry, sections } = request.data;
    logger.info("Received request data:", { description, industry, sections });

    // Используем переменную окружения
    const apiKey = process.env.OPENAI_API_KEY;
    logger.info('Using API key:', apiKey ? 'Key found' : 'No key');

    // Проверяем входные данные
    if (!description || !industry) {
      logger.error('Missing required fields', { description: !!description, industry: !!industry });
      throw new Error('Missing required fields: description or industry');
    }

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
      });
      logger.info('OpenAI client initialized');

      const prompt = `
      Создай контент для лендинга на основе следующих данных:
      Описание бизнеса: ${description}
      Отрасль: ${industry}
      Дополнительная информация: ${JSON.stringify(sections, null, 2)}
      
      Сгенерируй следующие элементы в формате JSON:
      {
        "title": "Заголовок (до 6 слов)",
        "subtitle": "Подзаголовок (1-2 предложения)",
        "features": [
          {
            "title": "Особенность 1",
            "description": "Описание особенности 1"
          }
        ],
        "mission": "Миссия компании",
        "cta": "Призыв к действию"
      }`;

      logger.info('Making request to OpenAI');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Ты - опытный копирайтер. Отвечай строго в формате JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      logger.info('Received response from OpenAI');

      const responseContent = completion.choices[0].message.content;
      logger.info('OpenAI response content:', responseContent);

      const content = JSON.parse(responseContent);
      logger.info('Successfully parsed JSON response');

      return content;

    } catch (openaiError) {
      logger.error('OpenAI API Error:', openaiError);
      throw new Error(`OpenAI API Error: ${openaiError.message}`);
    }

  } catch (error) {
    logger.error('Function error:', error);
    throw new Error(`Function error: ${error.message}`);
  }
});
