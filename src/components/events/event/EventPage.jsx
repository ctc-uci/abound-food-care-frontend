import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  VerticalAlignBottomOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { Button, Divider, ConfigProvider } from 'antd';
import axios from 'axios';
import moment from 'moment';
import PostEvent from './postevent/PostEvent';
import EventVolunteerList from './volunteer-list/EventVolunteerList';
import './eventPage.css';

const EventPage = ({ isAdmin }) => {
  const [eventData, setEventData] = useState([]);
  const [numAttendees, setNumAttendees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [viewVolunteers, setViewVolunteers] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  /*
  const [postEvent, setPostEvent] = useState(null);
  */

  const eventId = 11;

  const getEvent = async () => {
    try {
      const { data: eventResponse } = await axios.get(`http://localhost:3001/events/${eventId}`);
      setEventData(eventResponse[0]);
      if (eventResponse[0].posteventText !== undefined) {
        setIsEdit(true);
      }
    } catch (e) {
      console.log('Error getting event data!');
    }
  };

  const getNumAttendees = async () => {
    try {
      const { data: volunteerData } = await axios.get(
        `http://localhost:3001/volunteers/events/${eventId}`,
      );
      setNumAttendees(volunteerData.length);
    } catch (e) {
      console.log('Error getting event attendee data!');
    }
  };

  useEffect(() => {
    setLoading(true);
    getEvent();
    getNumAttendees();
    setLoading(false);
  }, [isAddingPost]);

  /*
  useEffect(() => {
    //get post event
    //axios.get(`http://localhost:3001/postevents/${eventId}`)
  }, [isAddingPost]);
  */

  const parseDate = () => {
    const startDateObj = new Date(Date.parse(eventData.startDatetime));
    const endDateObj = new Date(Date.parse(eventData.endDatetime));
    const startDate = moment(startDateObj).format('MMMM Do, YYYY');
    const startTime = moment(startDateObj).format('hh:mm a');
    const endDate = moment(endDateObj).format('MMMM Do, YYYY');
    const endTime = moment(endDateObj).format('hh:mm a');
    return { startDate, startTime, endDate, endTime };
  };

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
        date={parseDate().startDate}
        time={`${parseDate().startTime}-${parseDate().endTime}`}
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
        {isAdmin && (
          <>
            <div>
              <h1>event id is currently hardcoded!</h1>
            </div>
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
                      {numAttendees}/{eventData.volunteerCapacity} Volunteers Signed Up
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
                      {eventData.addressStreet} {eventData.addressCity}, {eventData.addressState}{' '}
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
                      {parseDate().startDate}
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
                      {parseDate().startTime} - {parseDate().endTime}
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
                  <p
                    style={{
                      fontFamily: 'AvenirNextLTProBold',
                      fontSize: '14px',
                      color: '#888888',
                    }}
                  >
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
                  {/* Thank you note to be implemented if time */}
                  {/* <Button
                    style={{
                      width: '9em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    type="primary"
                  >
                    <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>Send Thank You</p>
                  </Button> */}
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
                    {/* TODO: fix this */}
                    {[eventData.requirements].map(e => {
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
          </>
        )}

        {!isAdmin && (
          <>
            <div>
              <h1>event id is currently hardcoded!</h1>
            </div>
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
                      {numAttendees}/{eventData.volunteerCapacity} Volunteers Signed Up
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
                      {eventData.addressStreet} {eventData.addressCity}, {eventData.addressState}{' '}
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
                      {parseDate().startDate}
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
                      {parseDate().startTime} - {parseDate().endTime}
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
                  <p
                    style={{
                      fontFamily: 'AvenirNextLTProBold',
                      fontSize: '14px',
                      color: '#888888',
                    }}
                  >
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
                  {/* Thank you note to be implemented if time */}
                  {/* <Button
                    style={{
                      width: '9em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    type="primary"
                  >
                    <p style={{ padding: 0, margin: 0, fontSize: '14px' }}>Send Thank You</p>
                  </Button> */}
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
                    {/* TODO: fix this */}
                    {[eventData.requirements].map(e => {
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
          </>
        )}
      </ConfigProvider>
    )
  );
};

EventPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default EventPage;
