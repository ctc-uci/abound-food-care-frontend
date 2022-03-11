import React from 'react';
import { Card, Row, Col } from 'antd';
import logo from '../../assets/img/afc-logo.png';
import './AdminNotifications.css';

const dummyData = [
  {
    id: 1,
    people: ['Amy Martinez', 'asdf', 'sdf', 'sdafa', 'fdsa', 'asdf', 'Fdsa', 'Fdsa'],
    notificationDescription: 'submitted a waiver for the',
    reference: 'Spring Food Running',
    notificationDescription2: 'event.',
    hoursAgo: 25,
  },
  {
    id: 2,
    people: ['Amy Martinez', 'asdf', 'sdf', 'sdafa', 'fdsa', 'asdf', 'Fdsa', 'Fdsa'],
    notificationDescription: 'submitted a waiver for the',
    reference: 'Spring Food Running',
    notificationDescription2: 'event.',
    hoursAgo: 25,
  },
  {
    id: 3,
    people: ['Amy Martinez', 'asdf', 'sdf', 'sdafa', 'fdsa', 'asdf', 'Fdsa', 'Fdsa'],
    notificationDescription: 'submitted a waiver for the',
    reference: 'Spring Food Running',
    notificationDescription2: 'event.',
    hoursAgo: 25,
  },
];
const AdminNotifications = () => {
  return (
    <div className="notifications-container">
      <Card className="notification-card" title="Notifications">
        {dummyData.map(notification => (
          <Card.Grid key={notification.id} className="notification">
            <Row gutter={[8, 8]}>
              <Col span={1}>
                <img style={{ width: '100%' }} src={logo} alt="logo" />
              </Col>
              <Col span={21}>
                {notification.people.length > 1 ? (
                  <div className="notification-people">
                    <a href="https://www.google.com">{notification.people[0]}</a> <p>and </p>{' '}
                    <a href="https://www.google.com">{notification.people.length - 1} others </a>
                  </div>
                ) : (
                  <a href="https://www.google.com">{notification.people[0]} </a>
                )}
                <p>{notification.notificationDescription} </p>
                <a href="https://www.google.com">{notification.reference} </a>
                <p>{notification.notificationDescription2} </p>
                <br />
                {notification.hoursAgo >= 24 ? (
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                    {Math.floor(notification.hoursAgo / 24)}{' '}
                    {Math.floor(notification.hoursAgo / 24) > 1 ? 'days' : 'day'} ago
                  </p>
                ) : (
                  <p>{notification.hoursAgo} hours ago</p>
                )}
              </Col>
              <Col span={2}>
                <a href="https://www.google.com">View</a>
              </Col>
            </Row>
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

export default AdminNotifications;
