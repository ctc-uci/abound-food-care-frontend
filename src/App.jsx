import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';

// Pages
import Login from './pages/Login';
import About from './pages/About';
import Partners from './pages/Partners';
import Solutions from './pages/Solutions';
import Events from './pages/Events';
import Volunteers from './pages/Volunteers';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Waivers from './pages/Waivers';

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/partners" exact element={<Partners />} />
          <Route path="/solutions" exact element={<Solutions />} />
          <Route path="/events" exact element={<Events />} />
          <Route path="/volunteers" exact element={<Volunteers />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/event" exact element={<Event />} />
          <Route path="/waivers" exact element={<Waivers />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
