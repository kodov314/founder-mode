import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { WavyBackground } from '../components/ui/wavy-background';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { AIContext } from '../context/AIContext';

const sections = [
  {
    title: '1. Общая информация о компании',
    content: [
      {
        subtitle: 'Название стартапа',
        description: 'Ваше уникальное название, как оно зарегистрировано юридически или как бы вы хотели его зарегистрировать.',
        required: true,
        placeholder: 'Название стартапа'
      },
      {
        subtitle: 'Описание',
        description: 'Краткое, но ёмкое описание вашей компании. Например: "Algolla предоставляет бизнес-аналитику и прогнозы для e-commerce платформ." Описание – это общий обзор компании и её деятельности: чем вы занимаетесь, какие услуги или продукты предоставляете.',
        required: true,
        placeholder: 'Описание компании'
      },
      {
        subtitle: 'Локация',
        description: 'Страна и город регистрации или нахождения. Пример: Москва, Российская Федерация',
        required: true,
        placeholder: 'Страна и город'
      }
    ]
  },
  {
    title: '2. Данные о вашей деятельности',
    content: [
      {
        subtitle: 'Отрасль',
        description: 'Укажите основные сферы деятельности. Пример: "Аналитика данных", "E-commerce".',
        required: true,
        placeholder: 'Укажите отрасль...'
      },
      {
        subtitle: 'Миссия и ценности',
        description: 'Кратко объясните, какую проблему решает ваш продукт, в чём его ценность на рынке. Миссия и ценности – это суть, "зачем" вы делаете то, что делаете, какую проблему решаете и какие идеалы лежат в основе вашего продукта или сервиса.'
      },
      {
        subtitle: 'Ключевые особенности',
        description: 'Ваши конкурентные преимущества (например, "AI-аналитика для малого и среднего бизнеса").'
      }
    ]
  },
  {
    title: '3. Финансовые данные',
    content: [
      {
        subtitle: 'Привлечённые инвестиции или бюджет',
        description: 'Если у вас уже есть финансирование, укажите суммы.'
      },
      {
        subtitle: 'Планы по финансированию',
        description: 'Укажите, сколько денег вы ищете и на что планируете их потратить. Подсказка: Возможно вы хотите взять кредит, по какой ставке? Или у вас есть "Love money"'
      },
      {
        subtitle: 'Затраты',
        description: 'Какие затраты вы ведёте/видите в течение дня, месяца, года? Пример: Ежемесячно мне нужно платить за подписной сервис X, Y, Z - 100$, работа сотрудников, маркетинг, закупка материалов и другие.'
      },
      {
        subtitle: 'Цена продажи',
        description: 'Какая на ваш взгляд цена продажи вашего сервиса/продукта? Пример: 200$ в месяц на годовой подписке или 150$ за единицу продукта.'
      }
    ]
  },
  {
    title: '4. Команда',
    content: [
      {
        subtitle: 'Ключевые сотрудники',
        description: 'Укажите основателей, их должности и профессиональный опыт и экспертизу которая может помочь в бизнесе. Добавьте ссылки на их LinkedIn или другие профессиональные профили.'
      },
      {
        subtitle: 'Численность команды',
        description: 'Примерное количество сотрудников в стартапе. Пример: Кирилл Самородов: Expertise in blockchain and FinTech... CEO/CTO/Director...'
      }
    ]
  },
  {
    title: '5. Продукты и услуги',
    content: [
      {
        subtitle: 'Описание продукта',
        description: 'Основные функции, вторичные функции (на будущее), целевая аудитория. Пример целевой аудитории: Возраст: 18–35 лет, Профессия: студенты, джуниор-разработчики...'
      },
      {
        subtitle: 'Кейсы',
        description: 'Если есть успешные кейсы продаж вашего продукта/сервиса или отзывы клиентов, добавьте их. Ссылки на демо-версии, примеры использования.'
      },
      {
        subtitle: 'Развитие Продукта',
        description: 'Последующие фичи или продукты/сервисы которые можно добавить'
      }
    ]
  }
];

const Accordion = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        type="button"
        className={`
          w-full p-4 flex justify-between items-center
          rounded-lg transition-all duration-300
          ${isOpen 
            ? 'bg-gradient-to-r from-[#ff40ff]/20 to-[#a041ff]/20 shadow-lg' 
            : 'bg-gray-800/50 hover:bg-gray-800/70'
          }
        `}
        onClick={onClick}
      >
        <div className="flex items-center">
          <span className={`
            text-white font-medium text-lg
            ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ff40ff] to-[#a041ff]' : ''}
          `}>
            {title}
          </span>
          {!isOpen && (
            <span className="ml-2 text-sm text-gray-400">
              (нажмите, чтобы раскрыть)
            </span>
          )}
        </div>
        <ChevronDownIcon 
          className={`
            w-5 h-5 transition-transform duration-300
            ${isOpen 
              ? 'rotate-180 text-[#ff40ff]' 
              : 'text-white'
            }
          `}
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
            <div className="p-6 bg-gray-800/30 rounded-b-lg border-l-2 border-[#ff40ff]/30">
              <div className="space-y-6">
                {children}
                <div className="text-sm text-gray-400 mt-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Заполните эту информацию максимально подробно для получения качественного анализа
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BusinessFormPage = () => {
  const navigate = useNavigate();
  const { generateResults, isLoading } = useContext(AIContext);
  const [mainText, setMainText] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const [progress, setProgress] = useState(0);

  const [sectionValues, setSectionValues] = useState(
    sections.reduce((acc, section) => ({
      ...acc,
      [section.title]: section.content.reduce((contentAcc, content) => ({
        ...contentAcc,
        [content.subtitle]: ''
      }), {})
    }), {})
  );

  const handleAccordionClick = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleFieldChange = (sectionTitle, subtitle, value) => {
    setSectionValues(prev => ({
      ...prev,
      [sectionTitle]: {
        ...prev[sectionTitle],
        [subtitle]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(0);
    
    try {
      console.log('Submitting form...');
      
      const businessData = {
        description: mainText || '',
        industry: sectionValues['2. Данные о вашей деятельности']?.['Отрасль'] || '',
        target_audience: '',
        sections: sections.map(section => ({
          title: section.title,
          content: section.content.map(item => ({
            subtitle: item.subtitle,
            value: sectionValues[section.title]?.[item.subtitle] || ''
          })).filter(item => item.value)
        }))
      };

      if (sectionValues['1. Общая информация о компании']) {
        businessData.name = sectionValues['1. Общая информация о компании']['Название стартапа'];
        businessData.location = sectionValues['1. Общая информация о компании']['Локация'];
      }

      if (sectionValues['2. Данные о вашей деятельности']) {
        businessData.mission = sectionValues['2. Данные о вашей деятельности']['Миссия и ценности'];
        businessData.features = sectionValues['2. Данные о вашей деятельности']['Ключевые особенности'];
      }

      console.log('Business data:', businessData);

      if (!businessData.description) {
        throw new Error('Пожалуйста, заполните описание бизнеса');
      }

      const onProgress = (value) => {
        setProgress(value);
      };

      await generateResults(businessData, onProgress);
      console.log('Processing complete, navigating...');
      navigate('/results');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'Произошла ошибка при генерации лендинга. Пожалуйста, попробуйте снова.');
    }
  };

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
              onClick={() => handleAccordionClick(index)}
            >
              <div className="space-y-4">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-pink-500 font-medium mb-1">
                      {item.subtitle}
                    </h3>
                    <label>
                      {item.subtitle} 
                      {item.required && <span style={{ color: '#ff1744' }}>*</span>}
                    </label>
                    <textarea
                      value={sectionValues[section.title]?.[item.subtitle] || ''}
                      onChange={(e) => handleFieldChange(section.title, item.subtitle, e.target.value)}
                      className="w-full p-2 bg-gray-800/50 rounded-md text-white"
                      rows={3}
                      placeholder={item.description}
                      required={item.required}
                    />
                  </div>
                ))}
              </div>
            </Accordion>
          ))}

          {isLoading && (
            <div className="fixed top-0 left-0 right-0 z-50">
              <div className="bg-gray-800 h-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ff40ff] to-[#a041ff]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-center text-sm text-gray-400 mt-1">
                {progress < 100 ? 'Генерация лендинга...' : 'Завершаем...'}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-4 rounded-full font-semibold text-white
              transition-all duration-300
              ${isLoading 
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#ff40ff] to-[#a041ff] hover:opacity-90'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Генерация ({Math.round(progress)}%)
              </div>
            ) : (
              'Отправить ответ'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BusinessFormPage;