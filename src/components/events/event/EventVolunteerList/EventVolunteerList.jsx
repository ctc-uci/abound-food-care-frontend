import React, { useState, useEffect } from 'react';
import { Button, Table, ConfigProvider } from 'antd';
import { saveAs } from 'file-saver';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { AFCBackend } from '../../../../util/utils';
import styles from './EventVolunteerList.module.css';

const EventVolunteerList = ({ name, type, eventId, setViewVolunteers }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    let emailM = 'mailto:';
    const { data: userIds } = await AFCBackend.get(`/events/${eventId}/volunteers`);
    const volunteerPromises = userIds.map(user => AFCBackend.get(`/users/${user.user_id}`));
    const volunteerData = [];
    await Promise.all(volunteerPromises).then(values =>
      values.forEach(user => {
        emailM += `${emailM !== 'mailto:' ? ',' : ''}${user.data.email}`;
        volunteerData.push({
          ...user.data,
          name: `${user.data.firstName} ${user.data.lastName}`,
        });
      }),
    );

    const { data: eventData } = await AFCBackend.get(`/events/${eventId}`);
    const eventWaivers = eventData[0].waivers;
    eventWaivers?.forEach(waiver => {
      if (waiver.userId) {
        let matchingVolunteer = volunteerData.find(volunteer => {
          return volunteer.userId === waiver.userId;
        });
        if (!matchingVolunteer) {
          matchingVolunteer = {};
        }
        matchingVolunteer.waiver = waiver.link;
        matchingVolunteer.waiverName = waiver.name;
      }
    });
    setVolunteers(volunteerData);
    setEmail(emailM);
  };

  const getAllWaivers = async volunteerData => {
    const waiversZip = await AFCBackend.post(
      '/waivers/download',
      { volunteerData },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        responseType: 'blob',
      },
    );
    await saveAs(waiversZip.data, `${name}-waivers.zip`);
  };

  useEffect(async () => {
    await getUserData();
    setIsLoading(false);
  }, []);

  ConfigProvider.config({
    theme: {
      primaryColor: '#115740',
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => (
        <a style={{ color: '#115740' }} href="/volunteers">
          {text}
        </a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Waiver',
      dataIndex: 'waiver',
      key: 'waiver',
      render: waiver => {
        return (
          <a style={{ color: '#115740' }} href={waiver} download>
            Download
          </a>
        );
      },
    },
  ];

  return (
    <ConfigProvider>
      <div className={styles['volunteer-list-container']}>
        <ArrowLeftOutlined
          className={styles['back-arrow']}
          onClick={() => setViewVolunteers(false)}
        />
        <div className={styles.container}>
          <div className={styles['inner-container']}>
            <div className={styles['top-container']}>
              <div className={styles['event-header-container']}>
                <p className={styles.header}>{name}</p>
                <p className={styles['event-type']}>{type}</p>
              </div>
            </div>
            <div className={styles['buttons-container']}>
              <Button
                type="primary"
                className={styles['email-volunteers-button']}
                onClick={() => {
                  window.location = email;
                }}
                disabled={volunteers.length === 0}
              >
                Email Volunteers
              </Button>
              <Button
                type="primary"
                disabled={volunteers.length === 0}
                className={styles['download-waivers-button']}
                onClick={() => getAllWaivers(volunteers)}
              >
                Download All Waivers
              </Button>
            </div>
          </div>
          <Table
            rowKey={row => `${row.name} ${row.email}`}
            dataSource={volunteers}
            columns={columns}
            loading={isLoading}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

EventVolunteerList.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  setViewVolunteers: PropTypes.func.isRequired,
};

// EventVolunteerList.defaultProps = {
//   name: '',
//   type: 'General Event',
//   eventId: 0,
//   setViewVolunteers: () => {},
// };

export default EventVolunteerList;
