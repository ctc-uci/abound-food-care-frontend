import React, { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons';
import { Button, Divider, ConfigProvider } from 'antd';
import axios from 'axios';
import PostEvent from './PostEvent';
import './eventPage.css';

function EventPage() {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingPost, setIsAddingPost] = useState(false);
  /*
  const [postEvent, setPostEvent] = useState(null);
  */

  const eventId = 2;

  useEffect(() => {
    axios.get(`http://localhost:3001/events/${eventId}`).then(res => {
      setEventData(res.data[0]);
      res.data[0].volunteer_requirements = [1, 2, 3, 4, 5];
      setLoading(false);
    });
  }, []);

  /*
  useEffect(() => {
    //get post event
    //axios.get(`http://localhost:3001/postevents/${eventId}`)
  }, [isAddingPost]);
  */
  const parseDate = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[parseInt(eventData.start_datetime.substring(5, 7), 10) - 1];
    const day = eventData.start_datetime.substring(8, 10);
    const year = eventData.start_datetime.substring(0, 4);
    return `${month} ${day}, ${year}`;
  };

  const parseTimeRange = () => {
    let startTime = eventData.start_datetime.substring(11, 16);
    if (startTime[0] !== '0' && parseInt(startTime[1], 10) > 2) {
      startTime = `${parseInt(startTime.substring(0, 2), 10) - 12}:${startTime.substring(3, 5)} pm`;
    } else {
      startTime = `${parseInt(startTime.substring(0, 2), 10)}:${startTime.substring(3, 5)} am`;
    }

    let endTime = eventData.end_datetime.substring(11, 16);
    if (endTime[0] !== '0' && parseInt(endTime[1], 10) > 2) {
      startTime = `${parseInt(endTime.substring(0, 2), 10)}:${endTime.substring(3, 5)} am`;
    } else {
      endTime = `${endTime.substring(0, 5)} am`;
    }

    return `${startTime} - ${endTime}`;
  };

  const getNotes = () => {
    if (eventData.notes) {
      return (
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
            {eventData.notes}
          </p>
        </div>
      );
    }
    return <div />;
  };

  ConfigProvider.config({
    theme: {
      primaryColor: '#009A44',
    },
  });

  if (isAddingPost) {
    return (
      <PostEvent
        name={eventData.name}
        date={parseDate()}
        time={parseTimeRange()}
        eventId={eventId}
        setIsAddingPost={setIsAddingPost}
      />
    );
  }

  return (
    !loading &&
    !isAddingPost && (
      <ConfigProvider>
        <div
          style={{
            width: '80vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
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
                {eventData.name}
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
                {eventData.volunteer_type ? eventData.volunteer_type : 'All Volunteers'}
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
                  {parseDate()}
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
                  {parseTimeRange()}
                </p>
              </div>
            </div>
            {getNotes()}
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
              width: '25%',
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
              <Button
                style={{ width: '9em', display: 'flex', alignItems: 'center' }}
                type="primary"
                onClick={() => setIsAddingPost(true)}
              >
                <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>Add Post-Event</p>
              </Button>
            </div>

            <div
              className="containerBorder"
              style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '2.5em',
              }}
            >
              <p
                style={{
                  color: 'black',
                  fontWeight: 500,
                  fontSize: '20px',
                  padding: 0,
                  margin: '1em',
                }}
              >
                Event Location
              </p>
              <Divider style={{ padding: 0, margin: 0, marginBottom: '1em' }} />
              <div
                style={{
                  backgroundColor: 'lightgrey',
                  alignSelf: 'center',
                  width: '85%',
                  height: '12em',
                  padding: 0,
                  margin: 0,
                  marginBottom: '1em',
                }}
              />
            </div>

            <div
              className="containerBorder"
              style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                marginTop: '2.5em',
              }}
            >
              <p
                style={{
                  color: 'black',
                  fontWeight: 500,
                  fontSize: '20px',
                  padding: 0,
                  margin: '1em',
                }}
              >
                Requirements
              </p>
              <Divider style={{ padding: 0, margin: 0, marginBottom: '1em' }} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {eventData.volunteer_requirements.map(e => {
                  return (
                    <div
                      key={e}
                      className="requirementsTag"
                      style={{
                        paddingLeft: '1em',
                        paddingRight: '1em',
                        margin: '1em',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        {e}
                      </p>
                    </div>
                  );
                })}
              </div>
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
    )
  );
}

export default EventPage;
