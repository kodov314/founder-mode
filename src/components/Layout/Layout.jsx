import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#2b3147]">
      {children}
    </div>
  );
};

export default Layout; 