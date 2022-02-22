import { React, useState, useEffect } from 'react';
import { Input, Button, Radio, Row, Col, Card, Typography, Space } from 'antd';
import axios from 'axios';
import EventCard from './EventCard';
import './eventCard.css';
import 'antd/dist/antd.variable.min.css';

const { Search } = Input;
const { Title } = Typography;

const AdminEvents = () => {
  const [eventTypeValue, setEventTypeValue] = useState('all');
  const [eventStatusValue, setEventStatusValue] = useState('all');
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const eventTypeOptions = [
    { label: 'All', value: 'all' },
    { label: 'Distributions', value: 'distribution' },
    { label: 'Food Running', value: 'food' },
    { label: 'Other', value: 'other' },
  ];

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

  const onSearch = searchTerm => {
    if (searchTerm === '') {
      setEventsData(allEvents);
    } else {
      const searchSpecificEventData = eventsData.filter(event => event.name === searchTerm);
      setEventsData(searchSpecificEventData);
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
          event.ntype === fieldToFilterBy ||
          determineStatus(event.startDateTime) === fieldToFilterBy,
      );
    } else if (
      (type === 'distribution' || type === 'food') &&
      (status === 'upcoming' || status === 'past')
    ) {
      filteredEvents = filteredEvents.filter(
        event => event.ntype === type && determineStatus(event.startDateTime) === status,
      );
    } else {
      filteredEvents = filteredEvents.filter(
        event =>
          (event.ntype === type || event.ntype === 'null') &&
          determineStatus(event.startDateTime) === status,
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
      <Col key={event.id} span={8}>
        <EventCard
          id={event.id}
          name={event.name}
          startDateTime={event.startDateTime}
          endDateTime={event.endDateTime}
          volunteerCapacity={event.volunteerCapacity}
        />
      </Col>
    ));
    return rows;
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <Card>
            <Title level={3}>Events</Title>
            <Search
              placeholder="Search for event"
              onSearch={onSearch}
              allowClear
              enterButton="Search"
              style={{ width: 500 }}
            />
          </Card>
          <Card>
            <Space>
              <Radio.Group
                className="event-type-radio"
                options={eventTypeOptions}
                onChange={onTypeChange}
                value={eventTypeValue}
                optionType="button"
              />
            </Space>
            <Space>
              <Radio.Group
                className="status-type-radio"
                options={eventStatusOptions}
                onChange={onStatusChange}
                value={eventStatusValue}
                optionType="button"
              />
            </Space>
            <Button className="new-event-btn" type="primary">
              New Event
            </Button>
          </Card>
          <Card>
            <Row className="event-card-row">{renderEventsGrid(eventsData)}</Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminEvents;
