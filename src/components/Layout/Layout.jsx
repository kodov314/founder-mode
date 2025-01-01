import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/business-form', label: 'Форма' },
    { path: '/landing', label: 'Лендинг' },
    { path: '/pitch-deck', label: 'Pitch Deck' }
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 
        backdrop-blur-md bg-[#131620]/90 border-b border-[#2b3147]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="flex gap-6">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-[#d1d5db] hover:text-white transition-colors
                  ${location.pathname === path ? 'text-white font-medium' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout; 