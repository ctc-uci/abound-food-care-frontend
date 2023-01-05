import { React, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import { sendPasswordReset } from '../../util/auth_utils';
import styles from './ForgotPassword.module.css';

const ForgotPassword = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(email);
      toast.success(
        `Email sent to ${email}!\nIf there is an account associated, you will receive a link shortly.`,
        { duration: 6000 },
      );
    } catch (err) {
      if (err.message.includes('auth/user-not-found')) {
        toast.success(
          `Email sent to ${email}!\nIf there is an account associated, you will receive a link shortly.`,
          { duration: 6000 },
        );
      } else {
        toast.error(`Failed to send email: ${err.message}`);
      }
    }
    setIsOpen(false);
    setLoading(false);
  };

  useEffect(() => setEmail(''), [isOpen]);

  return (
    <Modal
      title="Forgot Password"
      visible={isOpen}
      confirmLoading={loading}
      onOk={onSubmit}
      onCancel={() => setIsOpen(false)}
    >
      <p className={styles.desc}>
        Enter the email address associated with your account to receive a password reset link:
      </p>
      <Input
        placeholder="sample@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onPressEnter={onSubmit}
      />
    </Modal>
  );
};

ForgotPassword.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ForgotPassword;
