import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import BusinessFormPage from './pages/BusinessFormPage';
import ResultLandingPage from './pages/ResultLandingPage';
import ResultPitchDeckPage from './pages/ResultPitchDeckPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/business-form" element={<BusinessFormPage />} />
        <Route path="/landing" element={<ResultLandingPage />} />
        <Route path="/pitch-deck" element={<ResultPitchDeckPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
