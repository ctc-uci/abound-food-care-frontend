import { React, useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button, Radio, Row, Col, Card, Pagination } from 'antd';
import { withCookies, Cookies } from 'react-cookie';
import { FilterOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AFCBackend } from '../../util/utils';
import EventCard from '../../components/events/event/EventCard/EventCard';
import EventList from '../../components/events/event/EventList/EventList';
import AddEventTypeModal from '../../components/events/CreateEvent/AddEventTypeModal';
import useViewPort from '../../common/useViewPort';
import { cookieKeys } from '../../util/cookie_utils';
import styles from './Events.module.css';
import 'antd/dist/antd.less';

// const { Title } = Typography;

const Events = ({ cookies }) => {
  const [eventTypeValue, setEventTypeValue] = useState('all');
  const [eventStatusValue, setEventStatusValue] = useState('all');
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showEventTypeModal, setShowEventTypeModal] = useState(false);
  const [numEvents, setNumEvents] = useState(0);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [pageSize, setPageSize] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const defaultEventTypes = [
    {
      name: 'Distribution',
      description:
        'Events where volunteers assist in distributing food - duties may include loading cars, taking data, packaging produce & meal, and traffic.',
    },
    {
      name: 'Food Running',
      description: 'Events where volunteers transport food safely from donor to recipient.',
    },
  ];
  const [eventTypes, setEventTypes] = useState(defaultEventTypes);

  const { width } = useViewPort();
  const breakpoint = 720;
  // const PAGE_SIZE = 6;

  const eventStatusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

  const fetchAllEvents = async () => {
    try {
      const { data: eventResponse } = await AFCBackend.get('/events', {
        params: {
          status: eventStatusValue,
          type: eventTypeValue,
        },
      });
      setDisplayedEvents(eventResponse.slice(0, pageSize));
      setEventsData(eventResponse);
      setAllEvents(eventResponse);
      setNumEvents(eventResponse.length);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllEvents();
    setLoading(false);
  }, []);

  const onSearch = async e => {
    if (e.target.value === '') {
      setShowSearchResults(false);
      setEventsData(allEvents);
    } else {
      setShowSearchResults(true);
      // const searchSpecificEventData = eventsData.filter(event => event.name === e.target.value);
      const { data: searchSpecificEventData } = await AFCBackend.get('/events', {
        params: {
          status: eventStatusValue,
          type: eventTypeValue,
          searchInput: e.target.value,
        },
      });
      setEventsData(searchSpecificEventData);
      setDisplayedEvents(searchSpecificEventData);
      setNumEvents(searchSpecificEventData.length);
      setCurrentPage(1);
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
    const filteredEvents = {
      all: events,
      upcoming: events.filter(event => determineStatus(event.startDatetime) === 'upcoming'),
      past: events.filter(event => determineStatus(event.startDatetime) === 'past'),
    };
    return filteredEvents[status];
  };

  const getEventsByTypeAndStatus = (type, status) => {
    const filteredEvents = {
      all: allEvents,
      distribution: allEvents.filter(event => event.eventType.toLowerCase() === 'distribution'),
      food: allEvents.filter(event => event.eventType.toLowerCase() === 'food running'),
      other: allEvents.filter(
        event =>
          event.eventType.toLowerCase() !== 'distribution' &&
          event.eventType.toLowerCase() !== 'food running',
      ),
    };
    return getEventsByStatus(
      ['all', 'distribution', 'food'].includes(type) ? filteredEvents[type] : filteredEvents.other,
      status,
    );
  };

  const onTypeChange = async e => {
    setEventTypeValue(e.target.value);
    const filteredEvents = await getEventsByTypeAndStatus(
      e.target.value.toLowerCase(),
      eventStatusValue,
    );
    setDisplayedEvents(filteredEvents.slice(0, pageSize));
    setEventsData(filteredEvents);
    setNumEvents(filteredEvents.length);
    setCurrentPage(1);
  };

  const onStatusChange = async e => {
    setEventStatusValue(e.target.value);
    const filteredEvents = await getEventsByTypeAndStatus(eventTypeValue, e.target.value);
    setDisplayedEvents(filteredEvents.slice(0, pageSize));
    setEventsData(filteredEvents);
    setNumEvents(filteredEvents.length);
    setCurrentPage(1);
  };

  const onPageChange = (page, newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(page);
    if (eventsData.slice(newPageSize * (page - 1)).length >= newPageSize) {
      setDisplayedEvents(
        eventsData.slice(newPageSize * (page - 1), newPageSize * (page - 1) + newPageSize),
      );
    } else {
      setDisplayedEvents(eventsData.slice(newPageSize * (page - 1)));
    }
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
        <Link to="/event/create">
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

  const renderAdminEventsView = () => {
    return (
      <div className={styles.events}>
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <Card className={styles.card}>
              {/* <Title level={1} className={styles.title}>
                Events
              </Title> */}
              <div className={styles.title}>Events</div>
              <Input
                prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
                className={styles['search-bar']}
                size="large"
                placeholder="Search events by name"
                onPressEnter={onSearch}
                onChange={onChange}
                allowClear
              />
            </Card>
            <Card className={styles['filter-card']}>
              <div className={styles.filters}>
                <span>
                  Event Type:
                  <Radio.Group
                    className={styles['event-type-radio']}
                    style={{ margin: '0px 20px 0px 10px' }}
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
                    style={{ margin: '0px 10px' }}
                    options={eventStatusOptions}
                    onChange={onStatusChange}
                    value={eventStatusValue}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </span>
                {/* <Button
                  className={styles['new-event-type-btn']}
                  type="default"
                  onClick={() => {
                    setShowEventTypeModal(true);
                  }}
                >
                  New Event Type
                </Button> */}
                {cookies.get(cookieKeys.ROLE) === 'admin' && (
                  <>
                    <Link to="/events/create">
                      <Button className={styles['new-event-btn']} type="primary">
                        New Event
                      </Button>
                    </Link>
                    <AddEventTypeModal
                      addVisible={showEventTypeModal}
                      setAddVisible={setShowEventTypeModal}
                      eventsData={eventTypes}
                      setEventsData={setEventTypes}
                    />
                  </>
                )}
              </div>
            </Card>
            {eventsData.length > 0 ? (
              <div className={styles['events-grid']}>
                {/* {width > breakpoint ? ( */}
                <Row className={styles['event-card-row']}>{renderEventsGrid(displayedEvents)}</Row>
                <Pagination
                  className={styles.pagination}
                  current={currentPage}
                  pageSize={pageSize}
                  total={numEvents}
                  onChange={onPageChange}
                  pageSizeOptions={[10, 20, 30, 50]}
                />
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
  return width > breakpoint ? renderAdminEventsView() : renderMobileAdminEventsView();
};

Events.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Events);
