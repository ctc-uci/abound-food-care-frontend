import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Divider, Form, Input, Button, Checkbox, Radio } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as AboundSignature } from '../Abound_Signature.svg';

function Login() {
  const [state, setState] = useState('login');
  const navigate = useNavigate();

  const forgotPassword = () => {};

  const logIn = () => {};

  const googleSignIn = () => {};

  const signUp = () => {
    navigate('/users/create');
  };

  const googleSignUp = () => {};

  return (
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
            {state === 'login' && (
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
                  <Button type="link" onClick={() => setState('signup')}>
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
                      prefix={<MailOutlined style={{ color: '#009A44', paddingRight: '13px' }} />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />}
                    />
                  </Form.Item>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>

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
                  <Button onClick={googleSignIn} style={{ display: 'block', width: '100%' }}>
                    Sign In with Google
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
                    onClick={() => setState('signup')}
                    type="link"
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </div>

          <div>
            {state === 'signup' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button type="link" onClick={() => setState('login')}>
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

                <Form>
                  <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                  >
                    <Input
                      placeholder="First Name"
                      prefix={<UserOutlined style={{ color: '#009A44', paddingRight: '13px' }} />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                  >
                    <Input
                      placeholder="Last Name"
                      prefix={<UserOutlined style={{ color: '#009A44', paddingRight: '13px' }} />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input
                      placeholder="Email"
                      prefix={<MailOutlined style={{ color: '#009A44', paddingRight: '13px' }} />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password
                      placeholder="Password"
                      prefix={<LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />}
                    />
                  </Form.Item>

                  <Form.Item label="Role" name="role">
                    <Radio.Group defaultValue="Volunteer" buttonStyle="solid">
                      <Radio.Button value="Volunteer">Volunteer</Radio.Button>
                      <Radio.Button value="Admin">Admin</Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item name="TOSPP" valuePropName="checked">
                    <Checkbox>
                      I agree to the &nbsp;
                      <a className="TOS" href="*" style={{ color: '#009A44' }}>
                        Terms of Service
                      </a>
                      &nbsp;and&nbsp;
                      <a className="privacyPolicy" href="*" style={{ color: '#009A44' }}>
                        Privacy Policy
                      </a>
                    </Checkbox>
                  </Form.Item>
                </Form>
                <Button
                  onClick={signUp}
                  style={{ display: 'block', width: '100%', marginBottom: '4%' }}
                  type="primary"
                >
                  Sign Up
                </Button>
                <Button onClick={googleSignUp} style={{ display: 'block', width: '100%' }}>
                  Sign Up with Google
                </Button>

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
                    onClick={() => setState('login')}
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
  );
}

export default Login;
