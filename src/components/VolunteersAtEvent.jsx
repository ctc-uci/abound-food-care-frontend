import React, { useState, useEffect } from 'react';
import { Button, Table, ConfigProvider } from 'antd';
import './eventPage.css';
import PropTypes from 'prop-types';
import axios from 'axios';

const VolunteersAtEvent = props => {
  const { name, type, eventId } = props;
  const [volunteers, setVolunteers] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/volunteers/getVolunteers/${eventId}`)
      .then(res => {
        for (let i = 0; i < res.data.length; i += 1) {
          res.data[i].name = `${res.data[i].first_name} ${res.data[i].last_name}`;
        }
        setVolunteers(res.data);
        let emailM = 'mailto:';
        for (let i = 0; i < res.data.length; i += 1) {
          emailM += `${res.data[i].email};`;
        }
        setEmail(emailM);
      })
      .then(() => {});
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
          width: '80vw',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '5%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '7vh',
            marginTop: '1.5em',
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
                backgroundColor: 'white',
                height: '4.5em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <p className="header">{name}</p>
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
        <Table dataSource={volunteers} columns={columns} />
      </div>
    </ConfigProvider>
  );
};

export default VolunteersAtEvent;

VolunteersAtEvent.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  eventId: PropTypes.number,
};

VolunteersAtEvent.defaultProps = {
  name: '',
  type: 'General Event',
  eventId: 0,
};
