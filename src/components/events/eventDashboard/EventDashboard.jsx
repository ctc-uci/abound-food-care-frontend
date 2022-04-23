import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Input, Button, Radio, Row, Col, Card, Typography, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import EventCard from '../EventCard';
import './eventDashboard.css';
import 'antd/dist/antd.variable.min.css';
import 'antd/dist/antd.less';

const { Title } = Typography;

ConfigProvider.config({
  theme: {
    primaryColor: '#115740',
  },
});

const EventDashboard = ({ isAdmin }) => {
  const [eventTypeValue, setEventTypeValue] = useState('all');
  const [eventStatusValue, setEventStatusValue] = useState('all');
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const eventStatusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ];

  const fetchAllEvents = async () => {
    try {
      const { data: eventResponse } = await axios.get('http://localhost:3001/events');
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
      setEventsData(allEvents);
    } else {
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

  const renderEventsByTypeAndStatus = (type, status) => {
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
    setEventsData(filteredEvents);
  };

  const onTypeChange = e => {
    setEventTypeValue(e.target.value);
    renderEventsByTypeAndStatus(e.target.value, eventStatusValue);
  };

  const onStatusChange = e => {
    setEventStatusValue(e.target.value);
    renderEventsByTypeAndStatus(eventTypeValue, e.target.value);
  };

  const renderEventsGrid = events => {
    const rows = events.map(event => (
      <Col key={event.eventId} span={8}>
        <EventCard
          id={event.eventId}
          name={event.name}
          type={event.eventType}
          startDateTime={event.startDatetime}
          endDateTime={event.endDatetime}
          volunteerCapacity={event.volunteerCapacity}
          isAdmin={isAdmin}
        />
      </Col>
    ));
    return rows;
  };

  return (
    <>
      <ConfigProvider>
        {isAdmin && (
          <div className="events">
            {loading && <div>Loading...</div>}
            {!loading && (
              <>
                <Title level={1} className="title">
                  Events
                </Title>
                <Card className="card">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
                    className="search-bar"
                    size="large"
                    placeholder="Search events by name"
                    onPressEnter={onSearch}
                    onChange={onChange}
                    allowClear
                  />
                  <div className="filters">
                    <span>
                      Event Type:
                      <Radio.Group
                        className="event-type-radio"
                        defaultValue="all"
                        onChange={onTypeChange}
                        value={eventTypeValue}
                        optionType="button"
                        buttonStyle="solid"
                      >
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button className="distribution-radio-btn" value="distribution">
                          Distributions
                        </Radio.Button>
                        <Radio.Button className="food-radio-btn" value="food">
                          Food Running
                        </Radio.Button>
                        <Radio.Button value="other">Other</Radio.Button>
                      </Radio.Group>
                    </span>
                    <span>
                      Event Status:
                      <Radio.Group
                        className="status-type-radio"
                        options={eventStatusOptions}
                        onChange={onStatusChange}
                        value={eventStatusValue}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </span>
                    <Link to="/events/create">
                      <Button className="new-event-btn" type="primary">
                        Create New Event
                      </Button>
                    </Link>
                  </div>
                </Card>
                <div className="events-grid">
                  <Row className="event-card-row">{renderEventsGrid(eventsData)}</Row>
                </div>
              </>
            )}
          </div>
        )}

        {!isAdmin && (
          <div className="events">
            {loading && <div>Loading...</div>}
            {!loading && (
              <>
                <Title level={1} className="title">
                  Events
                </Title>
                <Card className="card">
                  <Input
                    prefix={<SearchOutlined style={{ color: '#BFBFBF' }} />}
                    className="search-bar"
                    size="large"
                    placeholder="Search events by name"
                    onPressEnter={onSearch}
                    onChange={onChange}
                    allowClear
                  />
                  <div className="filters">
                    <span>
                      Event Type:
                      <Radio.Group
                        className="event-type-radio"
                        defaultValue="all"
                        onChange={onTypeChange}
                        value={eventTypeValue}
                        optionType="button"
                        buttonStyle="solid"
                      >
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button className="distribution-radio-btn" value="distribution">
                          Distributions
                        </Radio.Button>
                        <Radio.Button className="food-radio-btn" value="food">
                          Food Running
                        </Radio.Button>
                        <Radio.Button value="other">Other</Radio.Button>
                      </Radio.Group>
                    </span>
                    <span>
                      Event Status:
                      <Radio.Group
                        className="status-type-radio"
                        options={eventStatusOptions}
                        onChange={onStatusChange}
                        value={eventStatusValue}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </span>
                  </div>
                </Card>
                <div className="events-grid">
                  <Row className="event-card-row">{renderEventsGrid(eventsData)}</Row>
                </div>
              </>
            )}
          </div>
        )}
      </ConfigProvider>
    </>
  );
};

EventDashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default EventDashboard;
