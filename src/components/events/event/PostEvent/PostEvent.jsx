import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { AFCBackend } from '../../../../util/utils';
import styles from './PostEvent.module.css';

const PostEvent = props => {
  const { name, date, time, eventId, prevText, setIsAddingPost, setIsLoading } = props;
  const [postEventSection, setPostEventSection] = useState(prevText);

  const sendPostEvent = async () => {
    setIsLoading(true);
    await AFCBackend.put(`/events/add_post_text/${eventId}`, {
      posteventText: postEventSection,
    });
    setIsAddingPost(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}> Post-Event Recap </h1>
        <p className={styles.subhead}>
          The post-event recap will be posted on <span className={styles.bold}>{name}</span>&apos;s
          event page for all volunteers to see.
        </p>

        <div className={`${styles.flexColumn}${styles.bottomContainer}`}>
          <div className={styles.flexColumn}>
            <h2 className={styles.eventName}> {name} </h2>

            <p className={styles.mediumFont}>
              <CalendarOutlined style={{ fontSize: 16, marginRight: '.3%' }} /> {date}
            </p>

            <p className={styles.mediumFont}>
              <ClockCircleOutlined style={{ fontSize: 16, marginRight: '.3%' }} /> {time}
            </p>

            <div className={`${styles.flexColumn}${styles.inputContainer}`}>
              <div className={styles.rowWrap}>
                <p className={styles.inputTitle}>Post-Event Section:</p>
                <Input.TextArea
                  value={postEventSection}
                  className={styles.postEventInput}
                  onChange={e => setPostEventSection(e.target.value)}
                  placeholder="Write about the volunteers' impact and what happened at the event here!"
                />
              </div>

              <div className={styles.buttonsContainer}>
                <Button
                  onClick={() => {
                    setIsAddingPost(false);
                  }}
                  className={styles.bottomButton}
                >
                  Cancel
                </Button>

                <Button
                  onClick={async () => {
                    await sendPostEvent();
                  }}
                  className={styles.bottomButton}
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
  prevText: PropTypes.string,
  setIsAddingPost: PropTypes.func,
  setIsLoading: PropTypes.func,
};

PostEvent.defaultProps = {
  name: '',
  date: '',
  time: '',
  eventId: '0',
  prevText: '',
  setIsAddingPost: () => {},
  setIsLoading: () => {},
};

export default PostEvent;
