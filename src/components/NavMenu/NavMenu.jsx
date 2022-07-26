/* eslint-disable react/require-default-props */
import React, { useState, createElement } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Layout, Button } from 'antd';
import { PropTypes, instanceOf } from 'prop-types';
import {
  ProfileOutlined,
  TableOutlined,
  DashboardOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/Logo.png';
import styles from './NavMenu.module.css';
import './NavAnt.css';

import { Cookies, withCookies } from '../../util/cookie_utils';
import { logout } from '../../util/auth_utils';

const { Sider } = Layout;

const NavMenu = ({ isAdmin, cookies }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuTitle, setMenuTitle] = useState('Abound Food Care');
  const { pathname } = useLocation();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    setMenuTitle(collapsed ? 'Abound Food Care' : '');
  };

  const navigate = useNavigate();

  return (
    <>
      {pathname !== '/auth' && (
        <Sider trigger={null} collapsible collapsed={collapsed} className={styles['side-nav']}>
          <Link to="/">
            <div className={`${collapsed ? styles.collapsed : ''} ${styles.logo}`}>
              <img src={Logo} className={styles['logo-img']} alt="AFC Logo" />
              {menuTitle}
            </div>
          </Link>
          <Menu defaultSelectedKeys={[pathname]} mode="inline" className={styles.menu}>
            <Menu.Item className={styles['menu-item']} key="/" icon={<DashboardOutlined />}>
              <Link to="/" className={styles.link}>
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item className={styles['menu-item']} key="/events" icon={<FormOutlined />}>
              <Link to="/events" className={styles.link}>
                Events
              </Link>
            </Menu.Item>
            {isAdmin ? (
              <>
                <Menu.Item
                  className={styles['menu-item']}
                  key="/volunteers"
                  icon={<TableOutlined />}
                >
                  <Link to="/volunteers" className={styles.link}>
                    Volunteers
                  </Link>
                </Menu.Item>
                <Menu.Item className={styles['menu-item']} key="/hours" icon={<ProfileOutlined />}>
                  <Link to="/hours" className={styles.link}>
                    Hours Log
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item className={styles['menu-item']} key="/history" icon={<TableOutlined />}>
                  <Link to="/volunteeringHistory" className={styles.link}>
                    Volunteering History
                  </Link>
                </Menu.Item>
                <Menu.Item
                  className={styles['menu-item']}
                  key="/profile"
                  icon={<ProfileOutlined />}
                >
                  <Link to="/profile" className={styles.link}>
                    Profile
                  </Link>
                </Menu.Item>
              </>
            )}
          </Menu>
          <Button onClick={async () => logout('/auth', navigate, cookies)}> Sign Out </Button>
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
  isAdmin: PropTypes.bool,
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(NavMenu);
