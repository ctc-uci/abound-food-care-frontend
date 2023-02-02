import React from 'react';
import { instanceOf } from 'prop-types';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import VolunteerDashboard from './VolunteerDashboard/VolunteerDashboard';
import { withCookies, cookieKeys, Cookies } from '../util/cookie_utils';
import AUTH_ROLES from '../util/auth_config';

const Dashboard = ({ cookies }) => {
  return cookies.get(cookieKeys.ROLE) === AUTH_ROLES.ADMIN_ROLE ? (
    <AdminDashboard />
  ) : (
    <VolunteerDashboard />
  );
};

Dashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Dashboard);
