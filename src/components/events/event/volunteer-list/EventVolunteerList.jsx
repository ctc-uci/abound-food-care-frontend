import React, { useState, useEffect } from 'react';
import { Button, Table, ConfigProvider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../eventPage.css';
import PropTypes from 'prop-types';
import { AFCBackend } from '../../../../util/utils';

const EventVolunteerList = ({ name, type, eventId, setViewVolunteers }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    const volunteerPromises = [];
    const volunteerData = [];
    // TODO Retool this to use forEach and modern JS (alan - 7/3)
    let emailM = 'mailto:';
    const { data: userIds } = await AFCBackend.get(`/events/${eventId}/volunteers`);
    for (let i = 0; i < userIds.length; i += 1) {
      volunteerPromises.push(AFCBackend.get(`/users/${userIds[i].user_id}`));
    }
    await Promise.all(volunteerPromises).then(values => {
      for (let i = 0; i < values.length; i += 1) {
        const user = values[i].data;
        user.name = `${user.firstName} ${user.lastName}`;
        emailM += `${user.email}`;
        volunteerData.push(user);
      }
    });

    const { data: eventWaivers } = await AFCBackend.get(`waivers/${eventId}`);
    for (let i = 0; i < eventWaivers.length; i += 1) {
      const waiver = eventWaivers[i];
      if (waiver.userId) {
        const matchingVolunteer = volunteerData.find(volunteer => {
          return volunteer.userId === waiver.userId;
        });
        matchingVolunteer.waiver = waiver.link;
      }
    }

    setVolunteers(volunteerData);
    setEmail(emailM);
  };

  // const getVolunteerWaivers = async () => {
  //   // match uploaded waivers to volunteers
  //   const { data: eventWaivers } = await AFCBackend.get(`waivers/${eventId}`);
  //   console.log('waivers', eventWaivers);
  //   console.log('volunteers', volunteers);

  //   for (let i = 0; i < eventWaivers.length; i += 1) {
  //     const waiver = eventWaivers[i];
  //     if (waiver.userId) {
  //       console.log('waiver', waiver);
  //       const matchingVolunteer = volunteers.find(volunteer => {
  //         return volunteer.userId === waiver.userId;
  //       });
  //       console.log('matching', matchingVolunteer);
  //       matchingVolunteer.waiver = waiver.link;
  //     }
  //   }
  // };

  useEffect(async () => {
    await getUserData();
    // await getVolunteerWaivers();
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
          // TODO: add waiver functionality, remove email href
          <a style={{ color: '#115740' }} href={waiver} download>
            Download
          </a>
        );
      },
    },
  ];

  return (
    <ConfigProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '80vw',
          paddingTop: '1.5em',
          margin: 'auto',
        }}
      >
        <ArrowLeftOutlined
          style={{ fontSize: '24px', paddingRight: '1vw' }}
          onClick={() => setViewVolunteers(false)}
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '10vh',
            }}
          >
            <div
              style={{
                height: '50em',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  height: '4.5em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p className="header" style={{ lineHeight: '1em' }}>
                  {name}
                </p>
                <p
                  style={{
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#888888',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {type}
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              <Button
                type="primary"
                style={{ marginRight: '2vw' }}
                onClick={() => {
                  window.location = email;
                }}
              >
                Email Volunteers
              </Button>
              {/* TODO: add waiver download functionality */}
              <Button type="primary">Download All Waivers</Button>
            </div>
          </div>
          <Table rowKey="email" dataSource={volunteers} columns={columns} loading={isLoading} />
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
