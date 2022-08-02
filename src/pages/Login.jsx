import React, { useEffect, useState } from 'react';
import { instanceOf } from 'prop-types';
import { Card, Divider, Form, Input, Button, Checkbox, Radio } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import {
  auth,
  AUTH_ROLES,
  logInWithEmailAndPassword,
  useNavigate,
  getCurrentUser,
  AFCBackend,
} from '../util/auth_utils';
import { Cookies, withCookies } from '../util/cookie_utils';
import { ReactComponent as AboundSignature } from '../Abound_Signature.svg';

import CreateAccount from './CreateAccount/CreateAccount';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';

function Login({ cookies }) {
  const navigate = useNavigate();
  const [adminCodeStatus, setAdminCodeStatus] = useState('');

  useEffect(async () => {
    const user = await getCurrentUser(auth);
    if (user !== null) {
      navigate('/');
    }
  }, []);

  const [pageState, setPageState] = useState('login');

  const [loginEmail, setLoginEmail] = useState('');

  const [loginPassword, setLoginPassword] = useState('');

  const [role, setRole] = useState(AUTH_ROLES.VOLUNTEER_ROLE);

  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const [values, setValues] = useState({});

  const forgotPassword = () => {
    setIsOpen(true);
  };

  const logIn = async e => {
    e.preventDefault();
    try {
      await logInWithEmailAndPassword(loginEmail, loginPassword, '/', navigate, cookies);
    } catch (err) {
      console.log(err);
    }
  };

  const signUp = async () => {
    const vals = await form.validateFields();
    const { data } = await AFCBackend.get(`/adminCode/code/${vals.code}`);
    if (!data.length) {
      setAdminCodeStatus('error');
    } else {
      setAdminCodeStatus('');
      setValues(vals);
      setPageState('createPage');
    }
  };

  return (
    <>
      <ForgotPassword isOpen={isOpen} setIsOpen={setIsOpen} />
      {pageState === 'createPage' ? (
        <CreateAccount setPageState={setPageState} {...values} role={role} navigate={navigate} />
      ) : (
        <Card
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              style={{
                width: 400,
                display: 'inline-block',
                flexDirection: 'left',
                border: 'none',

                boxShadow: 'none',
              }}
            >
              <AboundSignature style={{ marginBottom: 22 }} />
              <div>
                {pageState === 'login' && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Button type="link">
                        <p
                          style={{
                            color: '#115740',
                            textDecorationLine: 'underline',
                            textUnderlineOffset: 10,
                            textDecorationThickness: 3,
                          }}
                        >
                          Log In
                        </p>
                      </Button>
                      <Button type="link" onClick={() => setPageState('signup')}>
                        Sign Up
                      </Button>
                    </div>

                    <Divider style={{ marginTop: 3 }} />

                    <Form>
                      <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                      >
                        <Input
                          placeholder="Email"
                          prefix={<MailOutlined style={{ color: '#009A44' }} />}
                          onChange={e => setLoginEmail(e.target.value)}
                          value={loginEmail}
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password
                          placeholder="Password"
                          prefix={<LockOutlined style={{ color: '#009A44' }} />}
                          onChange={e => setLoginPassword(e.target.value)}
                          value={loginPassword}
                        />
                      </Form.Item>

                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Form.Item>
                          <Button
                            style={{ padding: 0, color: '#009A44' }}
                            onClick={forgotPassword}
                            type="link"
                          >
                            Forgot your password?
                          </Button>
                        </Form.Item>
                      </div>

                      <Button
                        onClick={logIn}
                        style={{ display: 'block', width: '100%', marginBottom: '4%' }}
                        type="primary"
                      >
                        Log In
                      </Button>
                    </Form>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: '4%',
                      }}
                    >
                      <p>Not registered yet?</p>
                      <Button
                        style={{ paddingLeft: '10px', marginTop: '-5px', color: '#009A44' }}
                        onClick={() => setPageState('signup')}
                        type="link"
                      >
                        Sign Up
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div>
                {pageState === 'signup' && (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <Button type="link" onClick={() => setPageState('login')}>
                        Log In
                      </Button>
                      <Button type="link">
                        <p
                          style={{
                            color: '#009A44',
                            textDecorationLine: 'underline',
                            textUnderlineOffset: 10,
                            textDecorationThickness: 3,
                          }}
                        >
                          Sign Up
                        </p>
                      </Button>
                    </div>

                    <Divider style={{ marginTop: 3 }} />

                    <Form form={form}>
                      <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                      >
                        <Input
                          placeholder="First Name"
                          prefix={
                            <UserOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                      >
                        <Input
                          placeholder="Last Name"
                          prefix={
                            <UserOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                            type: 'email',
                          },
                        ]}
                      >
                        <Input
                          placeholder="Email"
                          prefix={
                            <MailOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            type: 'string',
                            min: 8,
                            message: 'Your password must be at least 8 characters',
                          },
                        ]}
                      >
                        <Input.Password
                          placeholder="Password"
                          prefix={
                            <LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      {role === AUTH_ROLES.ADMIN_ROLE && (
                        <Form.Item
                          name="code"
                          rules={[
                            {
                              required: true,
                              // type: 'enum',
                              // enum: adminCodes,
                              message: 'Invalid admin code',
                            },
                          ]}
                          hasFeedback
                          validateStatus={adminCodeStatus}
                        >
                          <Input
                            placeholder="Admin Code"
                            prefix={
                              <LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                            }
                          />
                        </Form.Item>
                      )}

                      <Form.Item label="Role" name="role" defaultValue={AUTH_ROLES.VOLUNTEER_ROLE}>
                        <Radio.Group
                          defaultValue={AUTH_ROLES.VOLUNTEER_ROLE}
                          onChange={e => setRole(e.target.value)}
                          buttonStyle="solid"
                        >
                          <Radio.Button value={AUTH_ROLES.VOLUNTEER_ROLE}>Volunteer</Radio.Button>
                          <Radio.Button value={AUTH_ROLES.ADMIN_ROLE}>Admin</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        name="TOSPP"
                        valuePropName="checked"
                        rules={[
                          {
                            required: true,
                            type: 'enum',
                            enum: [true],
                            message: 'Please accept the terms and conditions!',
                          },
                        ]}
                      >
                        <Checkbox>
                          I agree to the&nbsp;
                          <a className="TOS" href="*" style={{ color: '#009A44' }}>
                            Terms of Service
                          </a>
                          &nbsp;and&nbsp;
                          <a className="privacyPolicy" href="*" style={{ color: '#009A44' }}>
                            Privacy Policy
                          </a>
                        </Checkbox>
                      </Form.Item>
                      <Button
                        onClick={signUp}
                        style={{ display: 'block', width: '100%', marginBottom: '4%' }}
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Form>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: '4%',
                      }}
                    >
                      <p>Already have an account?</p>
                      <Button
                        style={{ paddingLeft: '10px', marginTop: '-5px', color: '#009A44' }}
                        onClick={() => setPageState('login')}
                        type="link"
                      >
                        Log In
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>
        </Card>
      )}
    </>
  );
}

Login.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Login);
