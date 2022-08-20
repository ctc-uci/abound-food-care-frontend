import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  VerticalAlignBottomOutlined,
  AimOutlined,
} from '@ant-design/icons';
import { Button, Divider, Tag, Space } from 'antd';
import moment from 'moment';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies, cookieKeys } from '../../../../util/cookie_utils';
import { AFCBackend } from '../../../../util/utils';
import PostEvent from '../PostEvent/PostEvent';
import EventVolunteerList from '../EventVolunteerList/EventVolunteerList';
import EventPageImage from '../../../../assets/img/event-page-banner.png';
import styles from './EventPage.module.css';
import './EventPageAntStyles.css';
import AUTH_ROLES from '../../../../util/auth_config';

const EventPage = ({ cookies }) => {
  const [eventData, setEventData] = useState([]);
  const [numAttendees, setNumAttendees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [viewVolunteers, setViewVolunteers] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [handoutWaiver, setHandoutWaiver] = useState(null);
  const [signedUp, setSignedUp] = useState(false);

  const { eventId } = useParams();
  const navigate = useNavigate();

  const getEvent = async () => {
    try {
      const { data: eventResponse } = await AFCBackend.get(`/events/${eventId}`);
      setEventData(eventResponse[0]);
      if (eventResponse[0].posteventText) {
        setIsEdit(true);
      }

      // get handout waiver for volunteers to download
      const waivers = eventResponse[0].waivers?.filter(waiver => {
        return waiver.userId === null;
      });
      if (waivers?.length > 0) {
        setHandoutWaiver(waivers[0]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getNumAttendees = async () => {
    try {
      const { data: volunteerData } = await AFCBackend.get(`/volunteers/events/${eventId}`);
      if (volunteerData) {
        const { userIds } = volunteerData;
        setNumAttendees(userIds.length);
      } else {
        setNumAttendees(0);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(async () => {
    const { data } = await AFCBackend.get(`/volunteers/${cookies.get(cookieKeys.USER_ID)}`);
    if (data[0] && data[0].eventIds.includes(parseInt(eventId, 10))) {
      setSignedUp(true);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getEvent();
    getNumAttendees();
    setLoading(false);
  }, [isAddingPost]);

  /*
  useEffect(() => {
    //get post event
    //AFCBackend.get(`/postevents/${eventId}`)
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

  const getPostEvent = () =>
    eventData.posteventText && (
      <div className={styles.sectionContainer}>
        <p className={styles.header}>Post-Event Recap</p>
        <p className={styles.sectionText}>{eventData.posteventText}</p>
      </div>
    );

  const getNotes = () =>
    eventData.notes && (
      <div className={styles.sectionContainer}>
        <p className={styles.header}>Additional Notes</p>
        <p className={styles.sectionText}>{eventData.notes}</p>
      </div>
    );

  const requirementsMap = {
    drive: 'Can Drive',
    adult: 'Adult (Age 18+)',
    minor: 'Minor (Age <18)',
    'first aid': 'First Aid Training',
    'serve safe': 'Serve Safe Knowledge',
    transportation: 'Transportation Experience',
    warehouse: 'Moving/Warehouse Experience',
    'food service': 'Food Service Industry Knowledge',
  };

  if (isAddingPost) {
    return (
      <PostEvent
        name={eventData.name}
        date={parseDate().startDate}
        time={`${parseDate().startTime}-${parseDate().endTime}`}
        eventId={eventId}
        prevText={eventData.posteventText ?? ''}
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

  const onUnregister = async () => {
    if (!signedUp) return;
    await AFCBackend.delete(`/volunteers/${cookies.get(cookieKeys.USER_ID)}/${eventId}`);
    setSignedUp(false);
    setNumAttendees(e => e - 1);
  };

  return (
    !loading &&
    !isAddingPost &&
    !viewVolunteers && (
      <>
        <img src={EventPageImage} alt="Event Page Banner" className={styles.headerImage} />
        <div className={styles.eventPageContainer}>
          <div className={styles.eventPageLeftContainer}>
            <div className={styles.eventPageLeftSection}>
              <p className={styles.header}>{eventData.name}</p>
              <p className={styles.subhead}>
                {eventData.eventType ? eventData.eventType : 'General Event'}
              </p>
            </div>
            <div className={styles.eventInfoContainer}>
              <p className={styles.header}>Event Information</p>
              <div className={styles.centerContainer}>
                <AimOutlined style={{ fontSize: '16px' }} />
                <p className={styles.infoParagraph}>
                  {eventData.addressStreet} {eventData.addressCity}, {eventData.addressState}{' '}
                  {eventData.addressZip}
                </p>
              </div>
              <div className={styles.centerContainer}>
                <CalendarOutlined style={{ fontSize: '16px' }} />
                <p className={styles.infoParagraph}>{parseDate().startDate}</p>
              </div>
              <div className={styles.centerContainer}>
                <ClockCircleOutlined style={{ fontSize: '16px' }} />
                <p className={styles.infoParagraph}>
                  {parseDate().startTime} - {parseDate().endTime}
                </p>
              </div>
            </div>
            {getPostEvent()}
            {getNotes()}
            <div className={styles.waiversContainer}>
              <p className={styles.header}>Waivers</p>
              {/* TODO Multiple waiver downloads; currently, only single waiver download button */}
              {handoutWaiver ? (
                <a href={handoutWaiver.link} download={handoutWaiver.name}>
                  <Button className={styles.waiversButton}>
                    <VerticalAlignBottomOutlined />
                    <p className={styles.waiversButtonText}>Click to Download</p>
                  </Button>
                </a>
              ) : (
                <p>Waiver not available</p>
              )}
            </div>
          </div>
          <div className={styles.topRightContainer}>
            <div className={styles.signedUpContainer}>
              <div className={styles.leftPad}>
                <p className={styles.volunteers}>
                  {numAttendees || 0}/{eventData.volunteerCapacity} Signed Up
                </p>
                <button
                  type="button"
                  className={styles.viewVolunteers}
                  onClick={() => setViewVolunteers(true)}
                >
                  View Volunteers
                </button>
              </div>
              {cookies.get(cookieKeys.ROLE) === AUTH_ROLES.ADMIN_ROLE &&
                (Date.parse(eventData.startDatetime) < new Date() ? (
                  <Button
                    className={styles.editButton}
                    type="primary"
                    onClick={() => setIsAddingPost(true)}
                  >
                    <p className={styles.buttonText}>{isEdit ? 'Edit' : 'Add'} Post-Event</p>
                  </Button>
                ) : (
                  Date.parse(eventData.startDatetime) >= new Date() && (
                    <Button
                      className={`${styles.editEventButton} ${styles.editButton}`}
                      type="primary"
                      onClick={() => navigate(`/event/edit/${eventId}`)}
                    >
                      <p className={styles.buttonText}>Edit Event</p>
                    </Button>
                  )
                ))}
              {cookies.get(cookieKeys.ROLE) === AUTH_ROLES.VOLUNTEER_ROLE &&
                (!signedUp ? (
                  <Button
                    className={`${styles.editEventButton} ${styles.editButton}`}
                    type="primary"
                    onClick={() => navigate(`/event/register/${eventId}`)}
                  >
                    <p className={styles.buttonText}>Register</p>
                  </Button>
                ) : (
                  <Button
                    className={`${styles.editEventButton} ${styles.editButton}`}
                    type="primary"
                    onClick={onUnregister}
                  >
                    <p className={styles.buttonText}>Unregister</p>
                  </Button>
                ))}
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
            {eventData.requirements && (
              <div
                className={styles.containerBorder}
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: '3.75em',
                }}
              >
                <p
                  className={styles.header}
                  style={{ paddingLeft: '1em', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
                >
                  Requirements
                </p>
                <Divider style={{ padding: 0, margin: 0, marginBottom: '1em' }} />
                <div style={{ paddingLeft: '2em', paddingBottom: '1.5rem' }}>
                  <Space direction="vertical">
                    {eventData.requirements.map((e, i) => {
                      return (
                        <Tag
                          // eslint-disable-next-line react/no-array-index-key
                          key={i}
                        >
                          {requirementsMap[e]}
                        </Tag>
                      );
                    })}
                  </Space>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <pre>{JSON.stringify((Date.parse(eventData.startDatetime)) > new Date(), null, 2)}</pre> */}
      </>
    )
  );
};

EventPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(EventPage);
