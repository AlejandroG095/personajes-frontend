import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import Home from './pages/Home';
import CharacterList from './pages/CharacterList';
import CharacterForm from './pages/CharacterForm';
import './App.css';
import FooterComponent from './components/FooterComponent';

function App() {

  return (
    <Router>
      <HeaderComponent />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters/new" element={<CharacterForm />} />
          <Route path="/characters/edit/:id" element={<CharacterForm />} />
        </Routes>
      </div>
      <FooterComponent />
    </Router>
  )
}

export default App
