import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';

// Pages
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Volunteers from './pages/Volunteers';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Waivers from './pages/Waivers';
import useViewPort from './common/useViewPort';

import AdminNavMenu from './components/navigation/AdminNavMenu';
import AdminDashboard from './pages/AdminDashboard';
import EventSignUp from './pages/EventSignUp';
import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteeringHistory from './components/profile/VolunteeringHistory';
// import VolunteerNavMenu from './components/navigation/VolunteerNavMenu';

const { Content } = Layout;

function App() {
  const { width } = useViewPort();
  const breakpoint = 720;
  return (
    <div>
      <Layout>
        <Router>
          {width > breakpoint ? <AdminNavMenu /> : <></>}
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
              <Route path="/admin" exact element={<AdminDashboard />} />
              <Route path="/events" exact element={<Events />} />
              <Route path="/events/create" exact element={<CreateEvent />} />
              <Route path="/events/edit/:id" exact element={<CreateEvent />} />
              <Route path="/event" exact element={<Event />} />
              <Route path="/events/register" exact element={<EventSignUp />} />
              <Route path="/volunteers" exact element={<Volunteers />} />
              {/* profile should be eventually be rendered under /volunteers. see Volunteers.jsx for note */}
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/waivers" exact element={<Waivers />} />
              <Route path="/test" exact element={<VolunteerDashboard />} />
              <Route path="/volunteeringHistory" exact element={<VolunteeringHistory />} />
            </Routes>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
