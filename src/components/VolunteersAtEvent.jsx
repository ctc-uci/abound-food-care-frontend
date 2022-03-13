import React from 'react';
import { Button, Table, ConfigProvider } from 'antd';
import './eventPage.css';
import PropTypes from 'prop-types';

const VolunteersAtEvent = props => {
  const { name, type, eventId } = props;

  ConfigProvider.config({
    theme: {
      primaryColor: '#115740',
    },
  });

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
            <Button type="primary" style={{ marginRight: '2vw' }}>
              Email Volunteers
            </Button>
            <Button type="primary">Download All Waivers</Button>
          </div>
        </div>
        <p> {eventId}</p>
        <Table />
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
