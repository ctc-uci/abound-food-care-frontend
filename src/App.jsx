import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Layout } from 'antd';
import './common/global.css';

// Pages
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import Volunteers from './pages/Volunteers';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Waivers from './pages/Waivers';
import useViewPort from './common/useViewPort';

import NavMenu from './components/NavMenu/NavMenu';
import EventSignUp from './pages/EventSignUp';

import ProtectedRoute from './util/ProtectedRoute';
import AUTH_ROLES from './util/auth_config';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { width } = useViewPort();
  const breakpoint = 720;
  return (
    <CookiesProvider>
      <Layout>
        <Router>
          {width > breakpoint ? <NavMenu isAdmin /> : <></>}
          <div className="site-background">
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <ProtectedRoute
                    Component={Dashboard}
                    redirectPath="/auth"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />
              <Route path="/auth" exact element={<Login />} />
              <Route
                path="/users/create"
                exact
                element={<ProtectedRoute Component={CreateAccount} redirectPath="/" roles={[]} />}
              />
              <Route
                path="/events"
                exact
                element={
                  <ProtectedRoute
                    Component={Events}
                    redirectPath="/auth"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />
              <Route path="/events/create" exact element={<CreateEvent />} />
              <Route path="/events/edit/:id" exact element={<CreateEvent />} />
              <Route path="/events/:eventId" exact element={<Event />} />
              <Route path="/events/register" exact element={<EventSignUp />} />
              <Route path="/volunteers" exact element={<Volunteers />} />
              {/* profile should be eventually be rendered under /volunteers. see Volunteers.jsx for note */}
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/waivers" exact element={<Waivers />} />
            </Routes>
          </div>
        </Router>
      </Layout>
    </CookiesProvider>
  );
};

export default App;
