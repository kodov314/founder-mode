import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff40ff] to-[#a041ff]"
        >
          Founder Mode
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-8"
        >
          Создайте профессиональный лендинг для вашего стартапа
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/business-form"
            className="px-8 py-4 text-lg text-white rounded-full
              bg-gradient-to-r from-[#ff40ff] to-[#a041ff] 
              hover:opacity-90 transition-all
              shadow-[0_0_15px_rgba(255,64,255,0.5)]
              animate-gradient"
          >
            Начать
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 