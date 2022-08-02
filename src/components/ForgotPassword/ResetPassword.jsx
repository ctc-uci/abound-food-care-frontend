import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResetPasswordPage from '../../pages/ResetPasswordPage';

const ResetPassword = ({ redirectPath }) => {
  const { search } = useLocation();
  const mode = new URLSearchParams(search).get('mode');
  const code = new URLSearchParams(search).get('oobCode');

  if (code === null || mode !== 'resetPassword') {
    return <Navigate to={redirectPath} />;
  }

  return <ResetPasswordPage code={code} />;
};

ResetPassword.propTypes = {
  redirectPath: PropTypes.string.isRequired,
};

export default ResetPassword;
