import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'antd';
import './common/global.css';

// Pages
import Login from './pages/Login';
import Events from './pages/Events/Events';
import CreateEvent from './pages/CreateEvent';
import Volunteers from './pages/Volunteers/Volunteers';
import Profile from './pages/Profile/Profile';
import Event from './pages/Event';
import EventSignUp from './pages/EventSignUp';
import Dashboard from './pages/Dashboard';
import Hours from './pages/Hours/Hours';

// Components
import NavMenu from './components/NavMenu/NavMenu';
import ResetPassword from './components/ForgotPassword/ResetPassword';

// Utils
import useViewPort from './common/useViewPort';
import AUTH_ROLES from './util/auth_config';
import ProtectedRoute from './util/ProtectedRoute/ProtectedRoute';

const App = () => {
  const { width } = useViewPort();
  const breakpoint = 720;
  return (
    <CookiesProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Router>
          {/* TODO: implement mobile navbar here */}
          {width > breakpoint ? <NavMenu /> : <></>}
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
              <Route path="/reset-password" element={<ResetPassword redirectPath="/" />} />
              <Route
                path="/events"
                exact
                element={
                  <ProtectedRoute
                    Component={Events}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />
              <Route
                path="/event/create"
                exact
                element={
                  <ProtectedRoute
                    Component={CreateEvent}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE]}
                  />
                }
              />
              <Route
                path="/event/view/:eventId"
                exact
                element={
                  <ProtectedRoute
                    Component={Event}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />
              <Route
                path="/event/edit/:id"
                exact
                element={
                  <ProtectedRoute
                    Component={CreateEvent}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />

              <Route
                path="/event/register/:eventId"
                exact
                element={
                  <ProtectedRoute
                    Component={EventSignUp}
                    redirectPath="/"
                    // FIXME: can admins sign up for event?
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />

              <Route
                path="/volunteers"
                exact
                element={
                  <ProtectedRoute
                    Component={Volunteers}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE]}
                  />
                }
              />
              <Route
                path="/hours"
                exact
                element={
                  <ProtectedRoute
                    Component={Hours}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE]}
                  />
                }
              />
              <Route
                path="/profile/"
                exact
                element={
                  <ProtectedRoute
                    Component={Profile}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />
              <Route
                path="/profile/:userId"
                exact
                element={
                  <ProtectedRoute
                    Component={Profile}
                    redirectPath="/"
                    roles={[AUTH_ROLES.ADMIN_ROLE, AUTH_ROLES.VOLUNTEER_ROLE]}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </Layout>
    </CookiesProvider>
  );
};

export default App;
