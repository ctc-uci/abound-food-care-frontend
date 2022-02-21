import React from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { Button, Divider, ConfigProvider } from 'antd';

function EventPage() {
  ConfigProvider.config({
    theme: {
      primaryColor: '#009A44',
    },
  });

  return (
    <ConfigProvider>
      <div
        style={{
          backgroundColor: 'grey',
          width: '80vw',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            backgroundColor: 'lightgrey',
            width: '46%',
            height: '50em',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '5%',
            marginTop: '1.5em',
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
            <p
              style={{
                color: 'black',
                fontWeight: 500,
                fontSize: '28px',
                padding: 0,
                margin: 0,
                lineHeight: '22px',
              }}
            >
              Event Title
            </p>
            <p
              style={{ fontWeight: 500, fontSize: '16px', color: '#888888', padding: 0, margin: 0 }}
            >
              Volunteer Type
            </p>
          </div>
          <div
            style={{
              position: 'relative',
              backgroundColor: 'white',
              marginTop: '2.5em',
              height: '7em',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <p
              style={{
                color: 'black',
                fontWeight: 500,
                fontSize: '28px',
                padding: 0,
                margin: 0,
                lineHeight: '28px',
              }}
            >
              Event Information
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <CalendarOutlined style={{ fontSize: '14px' }} />
              <p style={{ padding: 0, margin: 0, paddingLeft: '.7em', fontSize: '14px' }}>
                December 3, 2021
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ClockCircleOutlined style={{ fontSize: '14px' }} />
              <p style={{ padding: 0, margin: 0, paddingLeft: '.7em', fontSize: '14px' }}>
                9:00 am - 1:30pm
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              marginTop: '2.5em',
            }}
          >
            <p
              style={{
                color: 'black',
                fontWeight: 500,
                fontSize: '28px',
                padding: 0,
                margin: 0,
                lineHeight: '22px',
              }}
            >
              Additional Notes
            </p>
            <p
              style={{
                padding: 0,
                marginTop: '1.5em',
                color: 'black',
                fontSize: '14px',
                lineHeight: '28px',
              }}
            >
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. A pellentesque sit amet porttitor eget
              dolor morbi non. Vulputate dignissim suspendisse in est ante in.{' '}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              marginTop: '2.5em',
              height: '6em',
            }}
          >
            <p style={{ padding: 0, margin: 0, fontWeight: 500, fontSize: '28px' }}>Waivers</p>
            <Button
              style={{
                width: '13em',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <VerticalAlignBottomOutlined />
              <p style={{ padding: 0, margin: 0, paddingLeft: '.7em' }}>Click to Download</p>
            </Button>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'lightgrey',
            width: '30%',
            height: '50em',
            display: 'flex',
            flexDirection: 'column',
            marginRight: '5%',
            marginTop: '1.5em',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p style={{ color: '#888888', padding: 0, margin: 0, fontSize: '14px' }}>
              Spots: 23/36
            </p>
            <Button style={{ width: '9em', display: 'flex', alignItems: 'center' }} type="primary">
              <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>Add Post-Event</p>
            </Button>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '2.5em',
              height: '14em',
            }}
          >
            <p
              style={{
                color: 'black',
                fontWeight: 500,
                fontSize: '28px',
                padding: 0,
                margin: 0,
                lineHeight: '22px',
              }}
            >
              Event Location
            </p>
            <Divider style={{ padding: 0, margin: '1em' }} />
            <div
              style={{
                backgroundColor: 'lightgrey',
                width: '85%',
                height: '65%',
                padding: 0,
                margin: 0,
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '2.5em',
              height: '8em',
            }}
          >
            <p
              style={{
                color: 'black',
                fontWeight: 500,
                fontSize: '28px',
                padding: 0,
                margin: 0,
                lineHeight: '22px',
              }}
            >
              Requirements
            </p>
            <Divider style={{ padding: 0, margin: '1em' }} />
          </div>
          <div
            style={{
              marginTop: '2.5em',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Button type="primary">Send Thank You</Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default EventPage;
