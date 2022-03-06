import React, { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  VerticalAlignBottomOutlined,
  AimOutlined,
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
          <p className="header">Additional Notes</p>
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
      primaryColor: '#115740',
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
              <p className="header">{eventData.name}</p>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#888888',
                  padding: 0,
                  margin: 0,
                }}
              >
                {eventData.volunteer_type ? eventData.volunteer_type : 'General Event'}
              </p>
              <p
                style={{
                  fontFamily: 'AvenirNextLTProBold',
                  fontSize: '15px',
                  color: '#000000',
                  padding: 0,
                  margin: 0,
                }}
              >
                XX/XX Volunteers Signed Up
              </p>
            </div>
            <div
              style={{
                position: 'relative',
                backgroundColor: 'white',
                marginTop: '4em',
                height: '7em',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <p className="header">Event Information</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <AimOutlined style={{ fontSize: '16px' }} />
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    paddingLeft: '.7em',
                    paddingTop: '4px',
                    fontSize: '16px',
                  }}
                >
                  {eventData.location}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <CalendarOutlined style={{ fontSize: '16px' }} />
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    paddingLeft: '.7em',
                    paddingTop: '4px',
                    fontSize: '16px',
                  }}
                >
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
                <ClockCircleOutlined style={{ fontSize: '16px' }} />
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    paddingLeft: '.7em',
                    paddingTop: '4px',
                    fontSize: '16px',
                  }}
                >
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
                marginTop: '4em',
                height: '6em',
              }}
            >
              <p className="header">Waivers</p>
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
              <p style={{ fontFamily: 'AvenirNextLTProBold', fontSize: '14px', color: '#888888' }}>
                Not yet implemented
              </p>
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
              <Button
                style={{
                  width: '9em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                type="primary"
                onClick={() => setIsAddingPost(true)}
              >
                <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>Add Post-Event</p>
              </Button>
              <Button
                style={{
                  width: '9em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                type="primary"
              >
                <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>Send Thank You</p>
              </Button>
            </div>
            {/*

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
              */}

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
              <p className="header" style={{ paddingLeft: '1em' }}>
                Requirements
              </p>
              <Divider style={{ padding: 0, margin: 0, marginBottom: '1em' }} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  paddingLeft: '1em',
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
          </div>
        </div>
      </ConfigProvider>
    )
  );
}

export default EventPage;
