import { motion } from 'framer-motion';

export const GeneratedLanding = ({ landingData }) => {
  console.log('Landing data received:', landingData);

  if (!landingData) {
    console.log('No landing data available');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white text-gray-900"
    >
      <div 
        className="generated-landing"
        dangerouslySetInnerHTML={{ 
          __html: `
            <div class="landing">
              <header class="bg-gradient-to-r from-[#ff40ff] to-[#a041ff] text-white py-20">
                <div class="container mx-auto px-4">
                  <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    ${landingData.html.split('<h1>')[1]?.split('</h1>')[0] || ''}
                  </h1>
                </div>
              </header>
              <main class="container mx-auto px-4 py-12">
                ${landingData.html
                  .split('<section>')
                  .slice(1)
                  .map(section => `
                    <div class="mb-16 p-6 bg-gray-50 rounded-lg shadow-lg">
                      <h2 class="text-2xl font-bold mb-6 text-[#ff40ff]">
                        ${section.split('<h2>')[1]?.split('</h2>')[0] || ''}
                      </h2>
                      <div class="grid md:grid-cols-2 gap-6">
                        ${section
                          .split('<div>')
                          .slice(1)
                          .map(item => `
                            <div class="p-4 bg-white rounded-lg shadow">
                              <h3 class="text-lg font-semibold mb-2 text-[#a041ff]">
                                ${item.split('<h3>')[1]?.split('</h3>')[0] || ''}
                              </h3>
                              <p class="text-gray-600">
                                ${item.split('<p>')[1]?.split('</p>')[0] || ''}
                              </p>
                            </div>
                          `).join('')}
                      </div>
                    </div>
                  `).join('')}
              </main>
              <footer class="bg-gray-900 text-white py-8">
                <div class="container mx-auto px-4 text-center">
                  <p>© ${new Date().getFullYear()} Все права защищены</p>
                </div>
              </footer>
            </div>
          `
        }}
      />
      <style>{`
        .landing {
          font-family: 'Inter', sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .generated-landing h1 {
          background: linear-gradient(to right, #ff40ff, #a041ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .generated-landing section {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </motion.div>
  );
}; 