/* eslint-disable react/require-default-props */
import React, { useState, createElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Layout, Button } from 'antd';
import { instanceOf } from 'prop-types';
import {
  ProfileOutlined,
  TableOutlined,
  DashboardOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Cookies, withCookies, cookieKeys } from '../../util/cookie_utils';
import { AUTH_ROLES, logout } from '../../util/auth_utils';
import Logo from '../../assets/Logo.png';
import styles from './NavMenu.module.css';
import './NavAnt.css';

const { Sider } = Layout;

const renderPaths = ['/auth', '/reset-password'];

const NavMenu = ({ cookies }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuTitle, setMenuTitle] = useState('Abound Food Care');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pickSelectedItem = path => {
    if (path === '/') {
      return ['/'];
    }
    // eslint-disable-next-line consistent-return
    ['event', 'volunteer', 'hour', 'profile', 'logout'].forEach(page => {
      if (path.includes(page)) {
        return [page];
      }
    });
    return [];
  };

  const handleToggle = () => {
    setCollapsed(!collapsed);
    setMenuTitle(collapsed ? 'Abound Food Care' : '');
  };

  return (
    <>
      {!renderPaths.includes(pathname) && (
        <Sider trigger={null} collapsible collapsed={collapsed} className={styles['side-nav']}>
          <Link to="/">
            <div className={`${collapsed ? styles.collapsed : ''} ${styles.logo}`}>
              <img src={Logo} className={styles['logo-img']} alt="AFC Logo" />
              {menuTitle}
            </div>
          </Link>
          <Menu
            defaultSelectedKeys={pickSelectedItem(pathname)}
            mode="inline"
            className={styles.menu}
          >
            <Menu.Item className={styles['menu-item']} key="/" icon={<DashboardOutlined />}>
              <Link to="/" className={styles.link}>
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item className={styles['menu-item']} key="event" icon={<FormOutlined />}>
              <Link to="/events" className={styles.link}>
                Events
              </Link>
            </Menu.Item>
            {cookies.get(cookieKeys.ROLE) === AUTH_ROLES.VOLUNTEER_ROLE && (
              <Menu.Item className={styles['menu-item']} key="/history" icon={<TableOutlined />}>
                <Link to="/history" className={styles.link}>
                  Volunteering History
                </Link>
              </Menu.Item>
            )}
            {cookies.get(cookieKeys.ROLE) === AUTH_ROLES.ADMIN_ROLE && (
              <>
                <Menu.Item className={styles['menu-item']} key="volunteer" icon={<TableOutlined />}>
                  <Link to="/volunteers" className={styles.link}>
                    Volunteers
                  </Link>
                </Menu.Item>
                <Menu.Item className={styles['menu-item']} key="hour" icon={<ProfileOutlined />}>
                  <Link to="/hours" className={styles.link}>
                    Hours Log
                  </Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item className={styles['menu-item']} key="profile" icon={<UserOutlined />}>
              <Link to={`/profile/${cookies.get(cookieKeys.USER_ID)}`} className={styles.link}>
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item className={styles['menu-item']} key="logout" icon={<LogoutOutlined />}>
              <Link
                to="/auth"
                className={styles.link}
                onClick={async () => logout('/auth', navigate, cookies)}
              >
                Log Out
              </Link>
            </Menu.Item>
          </Menu>
          <Button onClick={() => handleToggle} className={styles['toggle-btn']}>
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: handleToggle,
            })}
          </Button>
        </Sider>
      )}
    </>
  );
};

NavMenu.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(NavMenu);
