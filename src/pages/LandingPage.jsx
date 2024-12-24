import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WavyBackground } from '../components/ui/wavy-background';
import Logo from '../components/Logo';

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 rounded-2xl bg-opacity-10 bg-white backdrop-blur-sm"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const GlowingButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255,64,255,0.4)"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    onClick={onClick}
    className="px-8 py-4 bg-gradient-to-r from-[#ff40ff] to-[#a041ff] text-white 
    rounded-full font-medium text-lg relative overflow-hidden
    hover:from-[#ff65ff] hover:to-[#b355ff] 
    transition-all duration-300 ease-out
    shadow-[0_0_20px_rgba(255,64,255,0.25)]"
  >
    {children}
  </motion.button>
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

  return (
    <div className="min-h-screen bg-[#2b3147]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
            from-[#ff40ff] to-[#a041ff] mb-6
            drop-shadow-[0_0_15px_rgba(255,64,255,0.3)]">
            Founder Mode
          </h1>
          <p className="text-gray-300 text-xl mb-8">
            Превратите вашу идею в успешный бизнес с помощью искусственного интеллекта
          </p>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-lg text-white rounded-full
              bg-gradient-to-r from-[#ff40ff] to-[#a041ff] 
              hover:opacity-90 transition-all mb-24
              shadow-[0_0_15px_rgba(255,64,255,0.5)]
              animate-gradient"
          >
            Начать бесплатно
          </motion.button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
            from-[#ff40ff] to-[#a041ff]
            drop-shadow-[0_0_15px_rgba(255,64,255,0.3)]
            mb-8">
            Как это работает?
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex-1">
              <div className="text-pink-500 text-4xl font-bold mb-2">01</div>
              <p className="text-gray-300">Опишите вашу бизнес-идею</p>
            </div>
            <div className="flex-1">
              <div className="text-pink-500 text-4xl font-bold mb-2">02</div>
              <p className="text-gray-300">ИИ анализирует и генерирует материалы</p>
            </div>
            <div className="flex-1">
              <div className="text-pink-500 text-4xl font-bold mb-2">03</div>
              <p className="text-gray-300">Получите готовые Pitch Deck и Landing Page</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 