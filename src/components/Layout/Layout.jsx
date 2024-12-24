import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <AppBar position="static" sx={{ 
        background: 'transparent', 
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
          <Logo />
          <div className="flex gap-8">
            <Link 
              to="/business-form" 
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              Форма
            </Link>
            <Link 
              to="/results" 
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              Результаты
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className="max-w-6xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
};

export default Layout; 