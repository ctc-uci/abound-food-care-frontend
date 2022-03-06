import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';

// Pages
import Login from './pages/Login';
import About from './pages/About';
import Partners from './pages/Partners';
import Solutions from './pages/Solutions';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Volunteers from './pages/Volunteers';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Waivers from './pages/Waivers';
import Admin from './pages/Admin';
import AdminNavMenu from './components/navigation/AdminNavMenu';

const { Content } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Router>
          <AdminNavMenu />
          <Content
            className="site-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="/login" exact element={<Login />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/partners" exact element={<Partners />} />
              <Route path="/solutions" exact element={<Solutions />} />
              <Route path="/events" exact element={<Events />} />
              <Route path="/events/create" exact element={<CreateEvent />} />
              <Route path="/volunteers" exact element={<Volunteers />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/event" exact element={<Event />} />
              <Route path="/waivers" exact element={<Waivers />} />
              <Route path="/admin" exact element={<Admin />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
