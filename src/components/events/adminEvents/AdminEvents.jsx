import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Radio, Row, Col, Card, Typography, ConfigProvider } from 'antd';
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AFCBackend } from '../../../util/utils';
import EventCard from '../event/EventCard';
import EventList from '../event/EventList';
import useViewPort from '../../../common/useViewPort';
import styles from './adminEvents.module.css';
import 'antd/dist/antd.variable.min.css';
import 'antd/dist/antd.less';

const { Title } = Typography;

ConfigProvider.config({
  theme: {
    primaryColor: '#115740',
  },
});

const AdminEvents = () => {
  const [eventTypeValue, setEventTypeValue] = useState('all');
  const [eventStatusValue, setEventStatusValue] = useState('all');
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { width } = useViewPort();
  const breakpoint = 720;

  const eventStatusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

  const fetchAllEvents = async () => {
    try {
      const { data: eventResponse } = await AFCBackend.get('/events');
      setEventsData(eventResponse);
      setAllEvents(eventResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllEvents();
    setLoading(false);
  }, []);

  const onSearch = e => {
    if (e.target.value === '') {
      setShowSearchResults(false);
      setEventsData(allEvents);
    } else {
      setShowSearchResults(true);
      const searchSpecificEventData = eventsData.filter(event => event.name === e.target.value);
      setEventsData(searchSpecificEventData);
    }
  };

  const onChange = e => {
    if (e.target.value === '') {
      onSearch(e);
    }
  };

  const determineStatus = startDatetime => {
    if (new Date(startDatetime) > new Date()) {
      return 'upcoming';
    }
    return 'past';
  };

  const getEventsByTypeAndStatus = (type, status) => {
    let filteredEvents = allEvents;
    if (type === 'all' && status === 'all') {
      filteredEvents = allEvents;
    } else if (type === 'all' || status === 'all') {
      const fieldToFilterBy = type !== 'all' ? type : status;
      filteredEvents = filteredEvents.filter(
        event =>
          event.eventType === fieldToFilterBy ||
          determineStatus(event.startDatetime) === fieldToFilterBy,
      );
    } else if (
      (type === 'distribution' || type === 'food') &&
      (status === 'upcoming' || status === 'past')
    ) {
      filteredEvents = filteredEvents.filter(
        event => event.eventType === type && determineStatus(event.startDatetime) === status,
      );
    } else {
      filteredEvents = filteredEvents.filter(
        event =>
          (event.eventType === type || event.eventType === 'null') &&
          determineStatus(event.startDatetime) === status,
      );
    }
    return filteredEvents;
  };

  const onTypeChange = e => {
    setEventTypeValue(e.target.value);
    const filteredEvents = getEventsByTypeAndStatus(e.target.value, eventStatusValue);
    setEventsData(filteredEvents);
  };

  const onStatusChange = e => {
    setEventStatusValue(e.target.value);
    const filteredEvents = getEventsByTypeAndStatus(eventTypeValue, e.target.value);
    setEventsData(filteredEvents);
  };

  const renderEventsGrid = events => {
    const rows = events.map(event => (
      <Col key={event.eventId} span={8}>
        <Link to={`/events/${event.eventId}`}>
          <EventCard
            id={event.eventId}
            name={event.name}
            type={event.eventType}
            startDateTime={event.startDatetime}
            endDateTime={event.endDatetime}
            volunteerCapacity={event.volunteerCapacity}
          />
        </Link>
      </Col>
    ));
    return rows;
  };

  const renderMobileCreateNewEventButton = () => {
    return (
      <div>
        <Link to="/events/create">
          <Button
            className={styles['mobile-new-event-btn']}
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            block
          >
            Create New Event
          </Button>
        </Link>
      </div>
    );
  };

  const filterButton = <FilterOutlined style={{ color: '#115740' }} />;

  const renderMobileSearchBar = () => {
    return (
      <Input
        prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
        className={styles['mobile-search-bar']}
        size="large"
        placeholder="Search by event name, date, ..."
        onPressEnter={onSearch}
        onChange={onChange}
        suffix={filterButton}
        allowClear
      />
    );
  };

  const renderMobileAdminEventsView = () => {
    // default lists
    if (eventStatusValue === 'all' && eventTypeValue === 'all' && !showSearchResults) {
      const pastEvents = getEventsByTypeAndStatus('all', 'past');
      const upcomingEvents = getEventsByTypeAndStatus('all', 'upcoming');
      return (
        <div id="mobile-admin-event-view">
          {renderMobileCreateNewEventButton()}
          {renderMobileSearchBar()}
          <EventList title="Upcoming Events" events={upcomingEvents} />
          <EventList title="Past Events" events={pastEvents} />
        </div>
      );
    }
    // render search/filter results
    return (
      <div id="mobile-admin-event-view">
        {renderMobileCreateNewEventButton()}
        {renderMobileSearchBar()}
        <EventList title="" events={eventsData} />
      </div>
    );
  };

  const renderAdminEventsView = () => {
    return (
      <div className={styles.events}>
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <Title level={1} className={styles.title}>
              Events
            </Title>
            <Card className={styles.card}>
              <Input
                prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
                className={styles['search-bar']}
                size="large"
                placeholder="Search events by name"
                onPressEnter={onSearch}
                onChange={onChange}
                allowClear
              />
              <div className={styles.filters}>
                <span>
                  Event Type:
                  <Radio.Group
                    className={styles['event-type-radio']}
                    defaultValue="all"
                    onChange={onTypeChange}
                    value={eventTypeValue}
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="all">All</Radio.Button>
                    {/* TODO Add functionality to map types to buttons instead of hardcoding */}
                    <Radio.Button className={styles['distribution-radio-btn']} value="distribution">
                      Distributions
                    </Radio.Button>
                    <Radio.Button className={styles['food-radio-btn']} value="food">
                      Food Running
                    </Radio.Button>
                    <Radio.Button value="other">Other</Radio.Button>
                  </Radio.Group>
                </span>
                <span>
                  Event Status:
                  <Radio.Group
                    className={styles['status-type-radio']}
                    options={eventStatusOptions}
                    onChange={onStatusChange}
                    value={eventStatusValue}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </span>
                <Link to="/events/create">
                  <Button className={styles['new-event-btn']} type="primary">
                    Create New Event
                  </Button>
                </Link>
              </div>
            </Card>
            {eventsData.length > 0 ? (
              <div className={styles['events-grid']}>
                {/* {width > breakpoint ? ( */}
                <Row className={styles['event-card-row']}>{renderEventsGrid(eventsData)}</Row>
              </div>
            ) : (
              <Card className={styles.card}>
                There are no events. Select <b>Create an Event</b> to make one!
              </Card>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <ConfigProvider>
        {width > breakpoint ? renderAdminEventsView() : renderMobileAdminEventsView()}
      </ConfigProvider>
    </>
  );
};

export default AdminEvents;
