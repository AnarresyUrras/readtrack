import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import AuthorDetail from './pages/AuthorDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App