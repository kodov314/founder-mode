import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="p-8 rounded-2xl bg-[#1a1f2e]/40 border border-[#2b3147]/50
      hover:border-[#ff40ff]/20 hover:bg-[#1a1f2e]/60 group relative overflow-hidden"
  >
    <div className="relative">
      <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-[#d1d5db] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="text-[#ff40ff] text-4xl font-bold mb-4">
      {number.toString().padStart(2, '0')}
    </div>
    <h3 className="text-white text-xl font-medium mb-2">
      {title}
    </h3>
    <p className="text-[#d1d5db] leading-relaxed">
      {description}
    </p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🤖",
      title: "AI Анализ",
      description: "Мгновенный анализ вашей бизнес-идеи с помощью передовых AI технологий"
    },
    {
      icon: "📊",
      title: "Pitch Deck",
      description: "Автоматическая генерация профессиональной презентации для инвесторов"
    },
    {
      icon: "🚀",
      title: "Landing Page",
      description: "Создание продающего лендинга для вашего проекта"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Опишите вашу бизнес-идею",
      description: "Заполните форму с информацией о вашем проекте"
    },
    {
      number: 2,
      title: "ИИ анализирует и генерирует материалы",
      description: "Искусственный интеллект обрабатывает данные и создает документы"
    },
    {
      number: 3,
      title: "Получите готовые Pitch Deck и Landing Page",
      description: "Готовые материалы для презентации вашего проекта"
    }
  ];

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

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-32"
        >
          <h1 className="text-8xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-[#ff40ff] to-[#a041ff] mb-6">
            Founder Mode
          </h1>
          <p className="text-[#d1d5db] text-xl mb-8 leading-relaxed">
            Превратите вашу идею в успешный бизнес с помощью искусственного интеллекта
          </p>
          <Button 
            variant="gradient"
            size="lg"
            className="shadow-[0_0_20px_rgba(255,64,255,0.15)]"
            onClick={() => navigate('/business-form')}
          >
            Начать бесплатно
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-[#ff40ff] to-[#a041ff] mb-16">
            Как это работает?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px 
              bg-gradient-to-r from-[#ff40ff]/20 via-[#a041ff]/20 to-[#ff40ff]/20" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <StepCard {...step} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 