import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Home } from '@mui/icons-material';
import Albums from './components/pages/Albums';
import Artists from './components/pages/Artists';
import Genres from './components/pages/Genres';
import Languages from './components/pages/Languages';
import { styled } from '@mui/material/styles';
import PlayerFooter from './components/PlayerFooter';


function App() {
  

const ThemedContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  transition: 'background-color 0.9s ease, color 0.9s ease',
  minHeight: '100vh',
}));
  return (
    <ThemedContainer>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/languages" element={<Languages />} />
      </Routes>
      <PlayerFooter />
    </Layout>
    </ThemedContainer>
  );
}

export default App;
