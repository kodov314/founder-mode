import Layout from '../components/Layout/Layout';

const BusinessForm = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
          from-[#ff40ff] to-[#a041ff] mb-6">
          Опишите вашу бизнес идею
        </h1>
        
        <p className="text-gray-400 mb-8 text-center">
          Чем детальнее вы ответите на вопросы, тем более качественный результат получите. 
          У вас есть 6 попыток для улучшения вашего ответа.
        </p>

        <div className="space-y-6">
          <textarea 
            className="w-full h-40 bg-[#1a1f36] bg-opacity-50 rounded-xl p-4 
            text-white placeholder-gray-500 focus:outline-none focus:ring-2 
            focus:ring-[#ff40ff] focus:ring-opacity-50 resize-none"
            placeholder="Опишите вашу бизнес идею здесь..."
          />

          <div className="space-y-4">
            <details className="bg-[#1a1f36] bg-opacity-50 rounded-xl p-4">
              <summary className="text-white cursor-pointer">
                1. Общая информация о компании
              </summary>
              {/* Содержимое аккордеона */}
            </details>

            <details className="bg-[#1a1f36] bg-opacity-50 rounded-xl p-4">
              <summary className="text-white cursor-pointer">
                2. Данные о вашей деятельности
              </summary>
              {/* Содержимое аккордеона */}
            </details>
          </div>

          <button className="w-full bg-gradient-to-r from-[#ff40ff] to-[#a041ff] 
            text-white font-medium py-3 px-6 rounded-full hover:opacity-90 
            transition-opacity">
            Отправить ответ (1/6)
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BusinessForm; 