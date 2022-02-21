import React from 'react';
import { Form, Input, Button, ConfigProvider } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const PostEvent = () => {
  ConfigProvider.config({
    theme: {
      primaryColor: '#009A44',
    },
  });

  return (
    <ConfigProvider>
      <div
        style={{
          background: 'white',
          width: '80vw',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '5%',
          marginTop: '1.5em',
        }}
      >
        <h1> Post-Event Page </h1>

        <div
          style={{
            background: 'white',
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '1.5em',
          }}
        >
          <h2> Event Name </h2>

          <div
            style={{
              background: 'white',
              width: '80vw',
              display: 'flex',
              flexDirection: 'column',
              marginTop: '1.5em',
            }}
          >
            <h4>
              <CalendarOutlined /> December 3, 2021
            </h4>

            <h4>
              <ClockCircleOutlined /> 9:00 am - 1:30 pm
            </h4>

            <div
              style={{
                background: 'white',
                width: '80vw',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '-2%',
                marginTop: '3.0em',
                marginBottom: '8.0em',
              }}
            >
              <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} name="post_event_section">
                <Form.Item name="post_event_sec" label="Post-Event Section">
                  <Input placeholder="Write about the volunteers' impact and what happened at the event here!" />
                </Form.Item>

                <Form.Item width={{ width: 10 }} wrapperCol={{ offset: 20 }}>
                  <Button
                    style={{
                      width: '9.0em',
                      marginTop: '3.0em',
                    }}
                    type="primary"
                  >
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default PostEvent;
