import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';

// Pages
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import About from './pages/About';
import Partners from './pages/Partners';
import Solutions from './pages/Solutions';
import VolunteeringHistory from './pages/VolunteeringHistory';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Volunteers from './pages/Volunteers';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Waivers from './pages/Waivers';
import Admin from './pages/Admin';
import AdminNavMenu from './components/navigation/AdminNavMenu';
import AdminDashboard from './pages/AdminDashboard';
// import VolunteerNavMenu from './components/navigation/VolunteerNavMenu';

const { Content } = Layout;

function App() {
  const [isAdmin] = useState(true);
  console.log(isAdmin);

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
              <Route path="/" exact element={<Login />} />
              <Route path="/users/create" exact element={<CreateAccount />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/partners" exact element={<Partners />} />
              <Route path="/solutions" exact element={<Solutions />} />
              <Route path="/volunteeringHistory" exact element={<VolunteeringHistory />} />
              <Route path="/events" exact element={<Events isAdmin={isAdmin} />} />
              <Route path="/events/create" exact element={<CreateEvent />} />
              <Route path="/event" exact element={<Event isAdmin={isAdmin} />} />
              <Route path="/volunteers" exact element={<Volunteers />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/event" exact element={<Event />} />
              <Route path="/waivers" exact element={<Waivers />} />
              <Route path="/admin" exact element={<AdminDashboard />} />
              <Route path="/admin/volunteers" exact element={<Admin />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
