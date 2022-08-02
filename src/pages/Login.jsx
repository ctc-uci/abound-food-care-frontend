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
} from '../util/auth_utils';
import { Cookies, withCookies } from '../util/cookie_utils';
import { ReactComponent as AboundSignature } from '../Abound_Signature.svg';

import CreateAccount from './CreateAccount/CreateAccount';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';

function Login({ cookies }) {
  const navigate = useNavigate();
  const [adminCodes, setAdminCodes] = useState([]);

  useEffect(async () => {
    const user = await getCurrentUser(auth);
    if (user !== null) {
      navigate('/');
    }
    setAdminCodes(['test123', '123test']);
  }, []);

  const [pageState, setPageState] = useState('login');
  // const [registerFirstName, setRegisterFirstName] = useState('');
  // const [registerLastName, setRegisterLastName] = useState('');
  // const [registerCode, setRegisterCode] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const [loginEmail, setLoginEmail] = useState('');

  const [loginPassword, setLoginPassword] = useState('');

  // const [registerEmail, setRegisterEmail] = useState('');

  // const [registerPassword, setRegisterPassword] = useState('');

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
    console.log(vals);
    // if (!adminCodes.includes(vals.code)) {
    //   form.setFields([{ name: 'role', errors: ['Invalid admin code'] }]);
    // }
    setValues(vals);
    // if (
    //   registerFirstName.length > 0 &&
    //   registerLastName.length > 0 &&
    //   registerPassword.length > 0 &&
    //   registerEmail.length > 0
    // ) {
    setPageState('createPage');
    // } else {
    //   setErrorMessage("Inputs can't be empty.");
    // }
  };

  return (
    <>
      <ForgotPassword isOpen={isOpen} setIsOpen={setIsOpen} />
      {pageState === 'createPage' ? (
        <CreateAccount
          setPageState={setPageState}
          // firstName={registerFirstName}
          // lastName={registerLastName}
          // email={registerEmail}
          // password={registerPassword}
          {...values}
          role={role}
          navigate={navigate}
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
                          // value={form.firstName}
                          // onChange={e => setRegisterFirstName(e.target.value)}
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
                          // value={registerLastName}
                          // onChange={e => setRegisterLastName(e.target.value)}
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
                          // value={registerEmail}
                          // onChange={e => setRegisterEmail(e.target.value)}
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
                          // value={registerPassword}
                          // onChange={e => setRegisterPassword(e.target.value)}
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
                              type: 'enum',
                              enum: adminCodes,
                              message: 'Invalid admin code',
                            },
                          ]}
                        >
                          <Input
                            // value={registerCode}
                            // onChange={e => setRegisterCode(e.target.value)}
                            placeholder="Admin Code"
                            prefix={
                              <LockOutlined style={{ color: '#009A44', paddingRight: '13px' }} />
                            }
                          />
                        </Form.Item>
                      )}

                      <Form.Item label="Role" name="role" defaultValue={AUTH_ROLES.VOLUNTEER_ROLE}>
                        <Radio.Group
                          // value={AUTH_ROLES.VOLUNTEER_ROLE}
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
                      {/* {errorMessage.length > 0 && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
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
