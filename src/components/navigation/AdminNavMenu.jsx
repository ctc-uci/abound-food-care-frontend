import React, { useState, createElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout, Button } from 'antd';
import {
  ProfileOutlined,
  TableOutlined,
  DashboardOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/Logo.png';
import '../NavMenu/NavMenu.module.css';

const { Sider } = Layout;

const AdminNavMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuTitle, setMenuTitle] = useState('Abound Food Care');
  const { pathname } = useLocation();
  // TO-DO: remove console.log before shipping to AFC
  console.log({ pathname });
  const handleToggle = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setMenuTitle('');
    } else {
      setMenuTitle('Abound Food Care');
    }
  };

  return (
    <>
      {pathname !== '/' && (
        <div style={{ position: 'relative' }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ height: '100vh', backgroundColor: 'var(--eden)', color: 'white' }}
          >
            <Link to="/">
              <div className="logo">
                <img src={Logo} className="logo-img" alt="AFC Logo" />
                {menuTitle}
              </div>
            </Link>
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item className="menu-item" key="1" icon={<DashboardOutlined />}>
                <Link to="/admin" className="link">
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item className="menu-item" key="2" icon={<FormOutlined />}>
                <Link to="/events" className="link">
                  Events
                </Link>
              </Menu.Item>
              <Menu.Item className="menu-item" key="3" icon={<TableOutlined />}>
                <Link to="/volunteers" className="link">
                  Volunteers
                </Link>
              </Menu.Item>
              <Menu.Item className="menu-item" key="4" icon={<ProfileOutlined />}>
                <Link to="/hours" className="link">
                  Hours Log
                </Link>
              </Menu.Item>
            </Menu>
            <Button onClick={() => handleToggle} className="toggle-btn">
              {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: handleToggle,
              })}
            </Button>
          </Sider>
        </div>
      )}
    </>
  );
};

export default AdminNavMenu;
