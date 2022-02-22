import React, { useState } from 'react';
import { Form, Input, Button, ConfigProvider } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';

const PostEvent = props => {
  const { name, date, time, eventId, setIsAddingPost } = props;
  const [postEventSection, setPostEventSection] = useState('');

  ConfigProvider.config({
    theme: {
      primaryColor: '#009A44',
    },
  });

  const sendPostEvent = () => {
    axios
      .put(`http://localhost:3001/postevents/${eventId}`, { description: postEventSection })
      .then(() => {
        setIsAddingPost(false);
      });
  };

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
          <h2> {name} </h2>

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
              <CalendarOutlined /> {date}
            </h4>

            <h4>
              <ClockCircleOutlined /> {time}
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
                  <Input
                    value={postEventSection}
                    onChange={e => setPostEventSection(e.target.value)}
                    placeholder="Write about the volunteers' impact and what happened at the event here!"
                  />
                </Form.Item>

                <Form.Item width={{ width: 10 }} wrapperCol={{ offset: 20 }}>
                  <Button
                    onClick={sendPostEvent}
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

PostEvent.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  eventId: PropTypes.number,
  setIsAddingPost: PropTypes.func,
};

PostEvent.defaultProps = {
  name: '',
  date: '',
  time: '',
  eventId: 0,
  setIsAddingPost: () => {},
};
