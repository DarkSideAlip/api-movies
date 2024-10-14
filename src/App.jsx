import './App.css';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetails'; // ใช้ MovieDetail ไม่ใช่ MovieDetails
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> {/* เพิ่มเส้นทางนี้ */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
