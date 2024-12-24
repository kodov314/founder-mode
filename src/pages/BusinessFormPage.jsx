import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { WavyBackground } from '../components/ui/wavy-background';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { AIContext } from '../context/AIContext';

const Accordion = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        className="w-full p-4 flex justify-between items-center bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all"
        onClick={onClick}
      >
        <span className="text-white">{title}</span>
        <ChevronDownIcon 
          className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-gray-800/30 rounded-b-lg">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BusinessFormPage = () => {
  const navigate = useNavigate();
  const { processWithAI, currentIteration } = useContext(AIContext);
  const [mainText, setMainText] = useState('');
  const [openSection, setOpenSection] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await processWithAI({ description: mainText });
    navigate('/results');
  };

  const sections = [
    {
      title: '1. Общая информация о компании',
      content: [
        {
          subtitle: 'Название стартапа',
          description: 'Ваше уникальное название, как оно зарегистрировано юридически или как бы вы хотели его зарегистрировать.'
        },
        {
          subtitle: 'Описание',
          description: 'Краткое, но ёмкое описание вашей компании. Например: "Algolla предоставляет бизнес-аналитику и прогнозы для e-commerce платформ."'
        },
        {
          subtitle: 'Локация',
          description: 'Страна и город регистрации или нахождения. Пример: Москва, Российская Федерация'
        }
      ]
    },
    {
      title: '2. Данные о вашей деятельности',
      content: [
        {
          subtitle: 'Отрасль',
          description: 'Укажите основные сферы деятельности. Пример: "Аналитика данных", "E-commerce".'
        },
        {
          subtitle: 'Миссия и ценности',
          description: 'Кратко объясните, какую проблему решает ваш продукт, в чём его ценность на рынке.'
        },
        {
          subtitle: 'Ключевые особенности',
          description: 'Ваши конкурентные преимущества (например, "AI-аналитика для малого и среднего бизнеса").'
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
          from-[#ff40ff] to-[#a041ff] mb-6 text-center
          drop-shadow-[0_0_15px_rgba(255,64,255,0.3)]">
          Опишите вашу бизнес идею
        </h1>
        
        <p className="text-center text-gray-300 mb-8">
          Чем детальнее вы ответите на вопросы, тем более качественный результат получите.
          У вас есть 6 попыток для улучшения вашего ответа.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SpotlightCard className="p-4">
            <textarea
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
              placeholder="Опишите вашу бизнес идею здесь..."
              className="w-full min-h-[200px] bg-transparent text-white focus:outline-none"
              style={{ resize: 'vertical' }}
            />
          </SpotlightCard>

          {sections.map((section, index) => (
            <Accordion
              key={index}
              title={section.title}
              isOpen={openSection === index}
              onClick={() => setOpenSection(openSection === index ? null : index)}
            >
              <div className="space-y-4">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-pink-500 font-medium mb-1">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Accordion>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 text-lg text-white rounded-full
              bg-gradient-to-r from-[#ff40ff] to-[#a041ff] 
              hover:opacity-90 transition-all
              shadow-[0_0_15px_rgba(255,64,255,0.5)]
              animate-gradient"
          >
            Отправить ответ ({currentIteration}/6)
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BusinessFormPage;