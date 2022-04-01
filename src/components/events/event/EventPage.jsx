import React, { useEffect, useState } from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  VerticalAlignBottomOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { Button, Divider, ConfigProvider } from 'antd';
import axios from 'axios';
import PostEvent from './postevent/PostEvent';
import EventVolunteerList from './volunteer-list/EventVolunteerList';
import './eventPage.css';

const EventPage = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [viewVolunteers, setViewVolunteers] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  /*
  const [postEvent, setPostEvent] = useState(null);
  */

  const eventId = 8;

  // const getEvent = async () => {
  //   try {
  //     const { data: eventResponse } = await axios.get(`http://localhost:3001/events/${eventId}`);
  //     console.log(eventResponse);
  //     eventResponse.requirements = ['Can Drive', '18+', 'Other requirement'];
  //     eventResponse.notes = 'Lorem ipsum dolor sit amet.';
  //     setEventData(eventResponse);
  //     if (eventResponse.posteventText !== undefined) {
  //       setIsEdit(true);
  //     }
  //     console.log(`is edit: ${isEdit}`);
  //   } catch (e) {
  //     console.log('Error getting event data!');
  //   }
  // };

  // const getNumAttendees = async () => {
  //   try {
  //     const { data: volunteerData } = await axios.get(
  //       `http://localhost:3001/volunteers/events/${eventId}`,
  //     );
  //     setEventData(eventData2_ => {
  //       const eventData2 = eventData2_;
  //       eventData2.volunteersPresent = volunteerData.length;
  //       return eventData2;
  //     });
  //     console.log(eventData);
  //   } catch (e) {
  //     console.log('Error getting event attendee data!');
  //   }
  // };

  // shouldn't need this bc postevent description is now a column in events
  // const getPostEvent = async () => {
  //   try {

  //   } catch (e) {

  //   }
  // }

  useEffect(() => {
    setLoading(true);
    // getEvent();
    // getNumAttendees();
    axios
      .get(`http://localhost:3001/events/${eventId}`)
      .then(res => {
        res.data.requirements = ['Can Drive', '18+', 'Other requirement'];
        res.data.notes = 'Lorem ipsum dolor sit amet.';
        setEventData(res.data);
        if (res.data.posteventText !== undefined) {
          setIsEdit(true);
        }
      })
      .then(() => {
        axios.get(`http://localhost:3001/volunteers/events/${eventId}`).then(volRes => {
          setEventData(eventData2_ => {
            const eventData2 = eventData2_;
            eventData2.volunteersPresent = volRes.data.length;
            return eventData2;
          });
          setLoading(false);
        });
      });
    setLoading(false);
  }, [isAddingPost]);

  /*
  useEffect(() => {
    //get post event
    //axios.get(`http://localhost:3001/postevents/${eventId}`)
  }, [isAddingPost]);
  */
  // const parseDate = () => {
  //   const months = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ];
  //   const month = months[parseInt(eventData.startDatetime.substring(5, 7), 10) - 1];
  //   const day = eventData.startDatetime.substring(8, 10);
  //   const year = eventData.startDatetime.substring(0, 4);
  //   return `${month} ${day}, ${year}`;
  // };

  // const parseTimeRange = () => {
  //   let startTime = eventData.startDatetime.substring(11, 16);
  //   if (startTime[0] !== '0' && parseInt(startTime[1], 10) > 2) {
  //     startTime = `${parseInt(startTime.substring(0, 2), 10) - 12}:${startTime.substring(3, 5)} pm`;
  //   } else {
  //     startTime = `${parseInt(startTime.substring(0, 2), 10)}:${startTime.substring(3, 5)} am`;
  //   }

  //   let endTime = eventData.endDatetime.substring(11, 16);
  //   if (endTime[0] !== '0' && parseInt(endTime[1], 10) > 2) {
  //     startTime = `${parseInt(endTime.substring(0, 2), 10)}:${endTime.substring(3, 5)} am`;
  //   } else {
  //     endTime = `${endTime.substring(0, 5)} am`;
  //   }

  //   return `${startTime} - ${endTime}`;
  // };

  const getPostEvent = () => {
    if (eventData.posteventText) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            marginTop: '2em',
          }}
        >
          <p className="header">Post-Event Recap</p>
          <p
            style={{
              padding: 0,
              color: 'black',
              fontSize: '14px',
              lineHeight: '28px',
            }}
          >
            {eventData.posteventText}
          </p>
        </div>
      );
    }
    return <></>;
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
            marginTop: '2em',
          }}
        >
          <p className="header">Additional Notes</p>
          <p
            style={{
              padding: 0,
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
        isEdit={isEdit}
        name={eventData.name}
        // date={parseDate()}
        // time={parseTimeRange()}
        eventId={eventId}
        setIsAddingPost={setIsAddingPost}
        setIsLoading={setLoading}
      />
    );
  }

  if (viewVolunteers) {
    return (
      <EventVolunteerList
        name={eventData.name}
        type={eventData.eventType}
        eventId={eventId}
        setViewVolunteers={setViewVolunteers}
      />
    );
  }

  return (
    !loading &&
    !isAddingPost &&
    !viewVolunteers && (
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
                {eventData.eventType ? eventData.eventType : 'General Event'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p
                  style={{
                    fontFamily: 'AvenirNextLTProBold',
                    fontSize: '15px',
                    color: '#000000',
                    padding: 0,
                    margin: 0,
                    paddingRight: '1.5em',
                  }}
                >
                  {eventData.volunteersPresent}/{eventData.volunteerCapacity} Volunteers Signed Up
                </p>
                <button
                  type="button"
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: '#115740',
                  }}
                  onClick={() => setViewVolunteers(true)}
                >
                  View Volunteers
                </button>
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                backgroundColor: 'white',
                marginTop: '4em',
                height: '10em',
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
                  {eventData.addressStreet}
                  {eventData.addressCity}
                  {eventData.addressState}
                  {eventData.addressZip}
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
                  {/* {parseDate()} */}
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
                  {/* {parseTimeRange()} */}
                </p>
              </div>
            </div>
            {getPostEvent()}
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
                <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>
                  {eventData.posteventText ? 'Edit' : 'Add'} Post-Event
                </p>
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
                {/* {eventData.requirements.map(e => {
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
                })} */}
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    )
  );
};

export default EventPage;
