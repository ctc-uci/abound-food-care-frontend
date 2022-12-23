import React, { useEffect, useState } from 'react';
import { instanceOf } from 'prop-types';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import VolunteerDashboard from './VolunteerDashboard/VolunteerDashboard';
import { withCookies, cookieKeys, Cookies } from '../util/cookie_utils';
import AUTH_ROLES from '../util/auth_config';

const Dashboard = ({ cookies }) => {
  const [role, setRole] = useState(cookies.get(cookieKeys.ROLE));

  useEffect(() => {
    if (role) {
      return;
    }
    setRole(cookies.get(cookieKeys.ROLE));
  }, [role]);

  return role === AUTH_ROLES.ADMIN_ROLE ? <AdminDashboard /> : <VolunteerDashboard />;
};

Dashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Dashboard);
