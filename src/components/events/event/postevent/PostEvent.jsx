import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { AFCBackend } from '../../../../util/utils';

const PostEvent = props => {
  const { name, date, time, eventId, setIsAddingPost, isEdit, setIsLoading } = props;
  const [postEventSection, setPostEventSection] = useState('');

  const sendPostEvent = async () => {
    setIsLoading(true);
    if (isEdit) {
      await AFCBackend.put(`/events/add_post_text/${eventId}`, {
        posteventText: postEventSection,
      });
      setIsAddingPost(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: 'white',
          width: '80vw',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
        }}
      >
        <h1
          style={{
            fontSize: 34,
            fontFamily: 'AvenirNextLTProBold',
            marginBottom: '1%',
            color: 'black',
          }}
        >
          {' '}
          Post-Event Recap{' '}
        </h1>
        <p style={{ fontWeight: 400 }}>
          The post-event recap will be posted on the EventName page for all volunteers to see.
        </p>

        <div
          style={{
            width: '80vw',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '2em',
          }}
        >
          <div
            style={{
              width: '80vw',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontFamily: 'AvenirNextLTProBold',
                fontSize: 20,
                fontWeight: 600,
                textAlign: 'left',
                color: 'black',
              }}
            >
              {' '}
              {name}{' '}
            </h2>

            <p style={{ fontSize: 16 }}>
              <CalendarOutlined style={{ fontSize: 16, marginRight: '.3%' }} /> {date}
            </p>

            <p style={{ fontSize: 16 }}>
              <ClockCircleOutlined style={{ fontSize: 16, marginRight: '.3%' }} /> {time}
            </p>

            <div
              style={{
                width: '80vw',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '3.0em',
                marginBottom: '8.0em',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <p style={{ fontSize: 16, padding: 0, margin: 0, width: '15%' }}>
                  Post-Event Section:
                </p>

                <Input
                  style={{ width: '85%' }}
                  value={postEventSection}
                  onChange={e => setPostEventSection(e.target.value)}
                  placeholder="Write about the volunteers' impact and what happened at the event here!"
                />
              </div>

              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Button
                  onClick={() => {
                    setIsAddingPost(false);
                  }}
                  style={{
                    width: '9.0em',
                    marginTop: '3.0em',
                  }}
                >
                  Cancel
                </Button>

                <Button
                  onClick={async () => {
                    await sendPostEvent();
                  }}
                  style={{
                    width: '9.0em',
                    marginTop: '3.0em',
                  }}
                  type="primary"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PostEvent.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  eventId: PropTypes.string,
  setIsAddingPost: PropTypes.func,
  isEdit: PropTypes.bool,
  setIsLoading: PropTypes.func,
};

PostEvent.defaultProps = {
  name: '',
  date: '',
  time: '',
  eventId: '0',
  setIsAddingPost: () => {},
  setIsLoading: () => {},
  isEdit: false,
};

export default PostEvent;
