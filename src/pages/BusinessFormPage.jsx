import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '../components/ui/button';
import { SpotlightCard } from '../components/ui/spotlight-card';
import { AIContext } from '../context/AIContext';

const Accordion = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        type="button"
        className={`
          w-full p-4 flex justify-between items-center
          rounded-2xl transition-all duration-300
          ${isOpen 
            ? 'bg-gradient-to-r from-[#ff40ff]/20 to-[#a041ff]/20 shadow-lg' 
            : 'bg-gray-800/50 hover:bg-gray-800/70'
          }
        `}
        onClick={onClick}
      >
        <span className={`
          text-white font-medium text-lg
          ${isOpen ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#ff40ff] to-[#a041ff]' : ''}
        `}>
          {title}
        </span>
        <ChevronDownIcon 
          className={`
            w-5 h-5 transition-transform duration-300
            ${isOpen ? 'rotate-180 text-[#ff40ff]' : 'text-white'}
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FormField = ({ label, type = "text", placeholder, value, onChange, description }) => (
  <div className="space-y-2">
    <label className="block text-white font-medium">{label}</label>
    {type === "textarea" ? (
      <textarea
        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 
          text-white placeholder-gray-400 focus:border-[#ff40ff]/50 
          focus:ring-1 focus:ring-[#ff40ff]/20 transition-colors"
        rows={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700 
          text-white placeholder-gray-400 focus:border-[#ff40ff]/50 
          focus:ring-1 focus:ring-[#ff40ff]/20 transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
    {description && (
      <p className="text-sm text-gray-400">{description}</p>
    )}
  </div>
);

const BusinessFormPage = () => {
  const navigate = useNavigate();
  const { setBusinessData } = useContext(AIContext);
  const [openSection, setOpenSection] = useState(null);
  const [formData, setFormData] = useState({
    businessIdea: '',
    companyName: '',
    description: '',
    location: '',
    industry: '',
    mission: '',
    features: '',
    investments: '',
    financingPlans: '',
    expenses: '',
    pricing: '',
    team: '',
    teamSize: '',
    product: '',
    targetAudience: '',
    cases: '',
    development: ''
  });

  const handleSubmit = async () => {
    setBusinessData(formData);
    navigate('/landing');
  };

  const getFilledFieldsCount = () => {
    const sections = {
      1: ['companyName', 'description', 'location'],
      2: ['industry', 'mission', 'features'],
      3: ['investments', 'financingPlans', 'expenses', 'pricing'],
      4: ['team', 'teamSize'],
      5: ['product', 'targetAudience', 'cases', 'development']
    };

    // Считаем количество заполненных секций
    return Object.values(sections).filter(fields => 
      fields.some(field => formData[field]?.trim().length > 0)
    ).length;
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] relative overflow-hidden">
      {/* Фон и градиенты */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#1a1f2e] to-[#151923]" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full 
          bg-gradient-to-b from-[#ff40ff]/8 to-transparent 
          blur-[120px] animate-pulse transform rotate-12" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full 
          bg-gradient-to-t from-[#a041ff]/8 to-transparent 
          blur-[120px] animate-pulse delay-1000 transform -rotate-12" />
      </div>

      <div className="relative px-4 py-8">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-[#e88d7c] to-[#b86ef7] mb-12 text-center 
          leading-relaxed py-4">
          Опишите вашу бизнес идею
        </h1>
        
        <p className="text-center text-[#d1d5db] mb-8">
          Чем детальнее вы ответите на вопросы, тем более качественный результат получите.
          После заполнения формы будут сгенерированы:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SpotlightCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Лендинг</h3>
            <p className="text-[#d1d5db]">
              Продающая страница для вашего проекта с оптимальной структурой и контентом
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">Pitch Deck</h3>
            <p className="text-[#d1d5db]">
              Презентация для инвесторов с ключевыми метриками и бизнес-моделью
            </p>
          </SpotlightCard>
        </div>

        <div className="space-y-4">
          <Accordion 
            title="1. Общая информация о компании"
            isOpen={openSection === 1}
            onClick={() => setOpenSection(openSection === 1 ? null : 1)}
          >
            <FormField
              label="Название стартапа"
              placeholder="Введите название вашей компании"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              description="Ваше уникальное название, как оно зарегистрировано юридически или как бы вы хотели его зарегистрировать"
            />
            <FormField
              label="Описание"
              type="textarea"
              placeholder="Краткое, но ёмкое описание вашей компании"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              description='Например: "Algolla предоставляет бизнес-аналитику и прогнозы для e-commerce платформ"'
            />
            <FormField
              label="Локация"
              placeholder="Страна и город"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              description="Например: Москва, Российская Федерация"
            />
          </Accordion>

          <Accordion 
            title="2. Данные о вашей деятельности"
            isOpen={openSection === 2}
            onClick={() => setOpenSection(openSection === 2 ? null : 2)}
          >
            <FormField
              label="Индустрия"
              placeholder="Введите вашу индустрию"
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              description="Например: IT, Финансы, Медицина"
            />
            <FormField
              label="Миссия"
              placeholder="Введите вашу миссию"
              value={formData.mission}
              onChange={(e) => setFormData({...formData, mission: e.target.value})}
              description="Например: Создание инновационных решений для улучшения жизни людей"
            />
            <FormField
              label="Ключевые особенности"
              type="textarea"
              placeholder="Введите особенности вашей компании"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              description="Ваши конкурентные преимущества. Например: «AI-аналитика для малого и среднего бизнеса»"
            />
          </Accordion>

          <Accordion 
            title="3. Финансовые данные"
            isOpen={openSection === 3}
            onClick={() => setOpenSection(openSection === 3 ? null : 3)}
          >
            <FormField
              label="Инвестиции"
              placeholder="Введите сумму инвестиций"
              value={formData.investments}
              onChange={(e) => setFormData({...formData, investments: e.target.value})}
              description="Например: 100,000 долларов"
            />
            <FormField
              label="Финансирование"
              placeholder="Введите план финансирования"
              value={formData.financingPlans}
              onChange={(e) => setFormData({...formData, financingPlans: e.target.value})}
              description="Например: Получение кредита от банка"
            />
            <FormField
              label="Расходы"
              type="textarea"
              placeholder="Введите ежемесячные расходы"
              value={formData.expenses}
              onChange={(e) => setFormData({...formData, expenses: e.target.value})}
              description={`Например:\n\n• Подписной сервис X, Y, Z - 100$\n\n• Работа сотрудников\n\n• Маркетинг\n\n• Закупка материалов\n\nПопробуйте вспомнить как можно больше деталей.`}
            />
            <FormField
              label="Цена продукта/сервиса который вы продаёте"
              type="textarea"
              placeholder="Введите цену"
              value={formData.pricing}
              onChange={(e) => setFormData({...formData, pricing: e.target.value})}
              description="Например:

              • 200$ в месяц на годовой подписке (2400$ в год)
              • 300$ ежемесячно на пол года (1800$ за пол года)
              • 150$ за единицу продукта/сервиса/установку X, Y, Z"
            />
          </Accordion>

          <Accordion 
            title="4. Команда"
            isOpen={openSection === 4}
            onClick={() => setOpenSection(openSection === 4 ? null : 4)}
          >
            <FormField
              label="Ключевые сотрудники"
              type="textarea"
              placeholder="Опишите ключевых сотрудников"
              value={formData.team}
              onChange={(e) => setFormData({...formData, team: e.target.value})}
              description={`Например:

• Основатели, их должности

• Профессиональный опыт

• Экспертиза которая может помочь в бизнесе

• Ссылки на LinkedIn или другие профессиональные профили`}
            />
          </Accordion>

          <Accordion 
            title="5. Продукты и услуги"
            isOpen={openSection === 5}
            onClick={() => setOpenSection(openSection === 5 ? null : 5)}
          >
            <FormField
              label="Детальное описание продукта"
              type="textarea"
              placeholder="Опишите ваш продукт"
              value={formData.product}
              onChange={(e) => setFormData({...formData, product: e.target.value})}
              description={`Например:

• Основные функции

• Вторичные функции (на будущее)`}
            />
            <FormField
              label="Целевая аудитория"
              type="textarea"
              placeholder="Введите целевую аудиторию"
              value={formData.targetAudience}
              onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              description={`Например:

• Бизнес-пользователи`}
            />
            <FormField
              label="Кейсы"
              type="textarea"
              placeholder="Введите кейсы"
              value={formData.cases}
              onChange={(e) => setFormData({...formData, cases: e.target.value})}
              description={`Например:

• Успешные кейсы продаж вашего продукта/сервиса

• Отзывы клиентов`}
            />
            <FormField
              label="Разработка"
              type="textarea"
              placeholder="Введите этапы разработки"
              value={formData.development}
              onChange={(e) => setFormData({...formData, development: e.target.value})}
              description={`Например:

• Планирование

• Проектирование

• Разработка`}
            />
          </Accordion>

          <Button
            variant="gradient"
            size="lg"
            className="w-full mt-8 bg-gradient-to-r from-[#ff40ff] to-[#a041ff] 
              hover:from-[#ff40ff]/90 hover:to-[#a041ff]/90
              text-white/90 shadow-[0_0_20px_rgba(255,64,255,0.15)]"
            onClick={handleSubmit}
          >
            Отправить ответы
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessFormPage;