import React, { useState, useEffect } from 'react';
import { Button, Table, ConfigProvider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../eventPage.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const EventVolunteerList = ({ name, type, eventId, setViewVolunteers }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    const volunteerData = [];
    let emailM = 'mailto:';
    const { data: userIds } = await axios.get(`http://localhost:3001/events/${eventId}/volunteers`);
    for (let i = 0; i < userIds.length; i += 1) {
      axios
        .get(`http://localhost:3001/users/${userIds[i].user_id}`)
        .then(res => volunteerData.push(res.data));
    }
    // TODO: fix--volunteerData length 0
    for (let i = 0; i < volunteerData.length; i += 1) {
      const user = volunteerData[i];
      console.log(user);
      user.name = `${user.firstName} ${user.lastName}`;
      emailM += `${user.email}`;
      volunteerData.push(user);
    }
    setVolunteers(volunteerData);
    setEmail(emailM);
  };

  useEffect(() => {
    getUserData();
    setIsLoading(false);
    // axios
    //   .get(`http://localhost:3001/events/${eventId}/volunteers`)
    //   .then(res => {
    //     for (let i = 0; i < res.data.length; i += 1) {
    //       res.data[i].name = `${res.data[i].first_name} ${res.data[i].last_name}`;
    //     }
    //     setVolunteers(res.data);
    //     let emailM = 'mailto:';
    //     for (let i = 0; i < res.data.length; i += 1) {
    //       emailM += `${res.data[i].email};`;
    //     }
    //     setEmail(emailM);
    //     setIsLoading(false);
    //   })
    //   .then(() => {});
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
      render: () => {
        return (
          <a style={{ color: '#115740' }} href={email}>
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
          paddingLeft: '5vw',
          paddingTop: '1.5em',
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
              height: '7vh',
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
              <Button type="primary">Download All Waivers</Button>
            </div>
          </div>
          <Table dataSource={volunteers} columns={columns} loading={isLoading} />
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
