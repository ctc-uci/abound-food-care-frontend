import React from 'react';
import './AdminNotifications.css';
import { Card } from 'antd';

const dummyData = [
  {
    id: 1,
    people: ['Amy Martinez', 'asdf', 'sdf', 'sdafa', 'fdsa', 'asdf', 'Fdsa', 'Fdsa'],
    notificationDescription: 'submitted a waiver for the',
    reference: 'Spring Food Running',
    notificationDescription2: 'event.',
  },
  {
    id: 2,
    people: ['Amy Martinez', 'asdf', 'sdf', 'sdafa', 'fdsa', 'asdf', 'Fdsa', 'Fdsa'],
    notificationDescription: 'submitted a waiver for the',
    reference: 'Spring Food Running',
    notificationDescription2: 'event.',
  },
  {
    id: 3,
    people: ['Amy Martinez', 'asdf', 'sdf', 'sdafa', 'fdsa', 'asdf', 'Fdsa', 'Fdsa'],
    notificationDescription: 'submitted a waiver for the',
    reference: 'Spring Food Running',
    notificationDescription2: 'event.',
  },
];
const AdminNotifications = () => {
  return (
    <div className="notifications-container">
      <Card className="notification-card" title="Notifications">
        {dummyData.map(notification => (
          <Card.Grid key={notification.id} className="notification">
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
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
};

export default AdminNotifications;
