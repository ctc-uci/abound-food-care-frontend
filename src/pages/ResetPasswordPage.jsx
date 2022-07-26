import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
// import styles from './ResetPasswordForm.module.css';
import { confirmNewPassword } from '../util/auth_utils';

const schema = yup.object({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Please enter your password'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must both match'),
});

const { Title, Text } = Typography;

const ResetPasswordForm = ({ code }) => {
  const [componentSize, setComponentSize] = useState('default');
  const {
    handleSubmit,
    trigger,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async ({ newPassword }) => {
    const result = await trigger();
    if (result) {
      await confirmNewPassword(code, newPassword);
      navigate('/');
    }
  };

  return (
    <>
      <Title type="secondary">Reset Password</Title>
      <Form
        labelWrap
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 8 }}
        size={componentSize}
        onValuesChange={({ size }) => setComponentSize(size)}
        onFinish={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange, ref } }) => (
            <Form.Item label="New Password" required>
              <Input.Password onChange={onChange} ref={ref} />
              <Text type="danger">{errors.newPassword && <p>{errors.newPassword.message}</p>}</Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, ref } }) => (
            <Form.Item label="Confirm Password" required>
              <Input.Password onChange={onChange} ref={ref} />
              <Text type="danger">
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
        <div>
          <Button to="/auth" onClick={() => navigate('/auth')}>
            Return to Login
          </Button>
          <Button type="submit" onClick={() => onSubmit(getValues())}>
            Reset Password
          </Button>
        </div>
      </Form>
    </>
  );
};

ResetPasswordForm.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ResetPasswordForm;
