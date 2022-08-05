import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Typography } from 'antd';
import { sendPasswordReset } from '../../util/auth_utils';

const { Text } = Typography;

const ForgotPassword = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(email);
      setEmailError(false);
      setTimeout(() => {
        setEmail('');
        setEmailError(null);
        setIsOpen(false);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setEmailError(true);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Forgot Password"
      visible={isOpen}
      confirmLoading={loading}
      onOk={onSubmit}
      onCancel={() => setIsOpen(false)}
    >
      <Input
        placeholder="sample@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {emailError === true && <Text type="danger"> Email failed to send, please try again. </Text>}
      {emailError === false && <Text type="success"> Email sent! </Text>}
    </Modal>
  );
};

ForgotPassword.propTypes = {
  isOpen: PropTypes.string.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ForgotPassword;
