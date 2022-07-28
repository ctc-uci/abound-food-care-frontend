import React from 'react';
import { instanceOf } from 'prop-types';
import AdminDashboard from './AdminDashboard';
import VolunteerDashboard from './VolunteerDashboard';
import { withCookies, cookieKeys, Cookies } from '../util/cookie_utils';
import AUTH_ROLES from '../util/auth_config';

const Dashboard = ({ cookies }) => {
  const role = cookies.get(cookieKeys.ROLE);
  if (role === AUTH_ROLES.ADMIN_ROLE) {
    return <AdminDashboard />;
  }
  return <VolunteerDashboard />;
};

Dashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Dashboard);
