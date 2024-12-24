import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = () => (
  <Link to="/" className="flex items-center">
    <div className="relative w-12 h-12">
      <motion.div
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-[#ff40ff] rounded-2xl"
        style={{
          backfaceVisibility: 'hidden',
          boxShadow: '0 0 20px rgba(255,64,255,0.3)'
        }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold select-none"
        style={{ textShadow: '0 0 4px rgba(255,255,255,0.3)' }}
      >
        FM
      </div>

      <motion.div
        animate={{
          rotate: -360
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: [0.6, 1, 0.9, 1],
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformOrigin: 'center center'
        }}
      >
        <motion.div
          className="absolute w-2.5 h-2.5 bg-[#ff6b00] rounded-full"
          style={{
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 10px rgba(255,107,0,0.4)'
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.6, 1, 0.9, 1],
          }}
        />
      </motion.div>
    </div>
  </Link>
);

export default Logo; 