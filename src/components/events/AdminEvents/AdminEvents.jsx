import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Radio, Row, Col, Card, Typography } from 'antd';
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AFCBackend } from '../../../util/utils';
import EventCard from '../event/EventCard/EventCard';
import EventList from '../event/EventList/EventList';
import useViewPort from '../../../common/useViewPort';
import styles from './AdminEvents.module.css';
import 'antd/dist/antd.less';

const { Title } = Typography;

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

  const determineStatus = startDatetime =>
    new Date(startDatetime) > new Date() ? 'upcoming' : 'past';

  const getEventsByStatus = (events, status) => {
    let filteredEvents = events;
    if (status === 'all') {
      filteredEvents = events;
    } else if (status === 'upcoming') {
      filteredEvents = filteredEvents.filter(
        event => determineStatus(event.startDatetime) === 'upcoming',
      );
    } else if (status === 'past') {
      filteredEvents = filteredEvents.filter(
        event => determineStatus(event.startDatetime) === 'past',
      );
    }
    return filteredEvents;
  };

  const getEventsByTypeAndStatus = (type, status) => {
    let filteredEvents = allEvents;
    if (type === 'all') {
      filteredEvents = allEvents;
    } else if (type === 'distribution') {
      filteredEvents = filteredEvents.filter(
        event => event.eventType.toLowerCase() === 'distribution',
      );
    } else if (type === 'food') {
      filteredEvents = filteredEvents.filter(
        event => event.eventType.toLowerCase() === 'food running',
      );
    } else {
      filteredEvents = filteredEvents.filter(
        event =>
          event.eventType !== 'Distribution' && event.eventType.toLowerCase() !== 'food running',
      );
    }
    return getEventsByStatus(filteredEvents, status);
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
        <Link to={`/event/view/${event.eventId}`}>
          <EventCard
            key={event.eventId}
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

  const renderMobileSearchBar = () => (
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

  const renderMobileAdminEventsView = () => {
    // default lists
    if (eventStatusValue === 'all' && eventTypeValue === 'all' && !showSearchResults) {
      const pastEvents = getEventsByTypeAndStatus('all', 'past');
      const upcomingEvents = getEventsByTypeAndStatus('all', 'upcoming');
      return (
        <div>
          {renderMobileCreateNewEventButton()}
          {renderMobileSearchBar()}
          <EventList title="Upcoming Events" events={upcomingEvents} />
          <EventList title="Past Events" events={pastEvents} />
        </div>
      );
    }
    // render search/filter results
    return (
      <div>
        {renderMobileCreateNewEventButton()}
        {renderMobileSearchBar()}
        <EventList title="" events={eventsData} />
      </div>
    );
  };

  const renderAdminEventsView = () => (
    <div className={styles.events}>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
          <div className={styles['events-grid']}>
            {/* {width > breakpoint ? */}
            <Row className={styles['event-card-row']}>{renderEventsGrid(eventsData)}</Row>
          </div>
        </>
      )}
    </div>
  );

  return width > breakpoint ? renderAdminEventsView() : renderMobileAdminEventsView();
};

export default AdminEvents;
