import React, { useState, useEffect } from 'react';
import { Card, Divider, Form, Input, Button, Checkbox, Radio } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { ReactComponent as AboundSignature } from '../Abound_Signature.svg';

import CreateAccount from './CreateAccount/CreateAccount';

import '../common/global.css';

const Login = () => {
  const [pageState, setPageState] = useState('login');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerRole, setRegisterRole] = useState('Volunteer');
  const [registerCode, setRegisterCode] = useState('');
  const [registerTOSChecked, setRegisterTOSChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    setErrorMessage('');
  }, [pageState]);

  const forgotPassword = () => {};

  const logIn = () => {};

  const googleSignIn = () => {};

  const signUp = () => {
    if (
      registerFirstName.length > 0 &&
      registerLastName.length > 0 &&
      registerPassword.length > 0 &&
      registerEmail.length > 0 &&
      (registerRole === 'Volunteer' || registerCode.length > 0) &&
      registerTOSChecked
    ) {
      if (registerRole === 'Volunteer') {
        setPageState('createPage');
      } else if (registerRole === 'Admin') {
        console.log('Admin sign up');
        // TODO Validate admin signup code, do something here
      }
    } else if (!registerTOSChecked) {
      setErrorMessage('You must agree to the TOS and Privacy Policy.');
    } else if (registerRole === 'Admin' && registerCode.length === 0) {
      setErrorMessage('You must enter an admin code to proceed.');
    } else {
      setErrorMessage("Inputs can't be empty.");
    }
  };
  const googleSignUp = () => {};

  return (
    <>
      {pageState === 'createPage' ? (
        <CreateAccount
          setPageState={setPageState}
          firstName={registerFirstName}
          lastName={registerLastName}
          email={registerEmail}
        />
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
                          prefix={
                            <MailOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>

                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password
                          placeholder="Password"
                          prefix={
                            <LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
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

                    <Form>
                      <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                      >
                        <Input
                          value={registerFirstName}
                          onChange={e => setRegisterFirstName(e.target.value)}
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
                          value={registerLastName}
                          onChange={e => setRegisterLastName(e.target.value)}
                          placeholder="Last Name"
                          prefix={
                            <UserOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                      >
                        <Input
                          value={registerEmail}
                          onChange={e => setRegisterEmail(e.target.value)}
                          placeholder="Email"
                          prefix={
                            <MailOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      >
                        <Input.Password
                          value={registerPassword}
                          onChange={e => setRegisterPassword(e.target.value)}
                          placeholder="Password"
                          prefix={
                            <LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                          }
                        />
                      </Form.Item>
                      {registerRole === 'Admin' && (
                        <Form.Item
                          name="code"
                          rules={[{ required: true, message: 'Please input your admin code!' }]}
                        >
                          <Input
                            value={registerCode}
                            onChange={e => setRegisterCode(e.target.value)}
                            placeholder="Admin Code"
                            prefix={
                              <LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                            }
                          />
                        </Form.Item>
                      )}

                      <Form.Item label="Role" name="role">
                        <Radio.Group
                          defaultValue="Volunteer"
                          buttonStyle="solid"
                          onChange={e => setRegisterRole(e.target.value)}
                        >
                          <Radio.Button value="Volunteer">Volunteer</Radio.Button>
                          <Radio.Button value="Admin">Admin</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item name="TOSPP" valuePropName="checked">
                        <Checkbox onChange={e => setRegisterTOSChecked(e.target.checked)}>
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
                      {errorMessage.length > 0 && <p style={{ color: 'red' }}>{errorMessage}</p>}
                      <Button
                        onClick={signUp}
                        style={{ display: 'block', width: '100%', marginBottom: '4%' }}
                        type="submit"
                      >
                        Sign Up
                      </Button>
                    </Form>

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
};

export default Login;
