import { React, useState, useEffect } from 'react';
import { Input, Button, Radio, Row, Col, Card, Typography, ConfigProvider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import EventCard from './EventCard';
import './adminEvents.css';
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

  // const eventTypeOptions = [
  //   { label: 'All', value: 'all' },
  //   { label: 'Distributions', value: 'distribution' },
  //   { label: 'Food Running', value: 'food' },
  //   { label: 'Other', value: 'other' },
  // ];

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
          type={event.ntype}
          startDateTime={event.startDateTime}
          endDateTime={event.endDateTime}
          volunteerCapacity={event.volunteerCapacity}
        />
      </Col>
    ));
    return rows;
  };

  return (
    <>
      <ConfigProvider>
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
                  <Button className="new-event-btn" type="primary">
                    Create New Event
                  </Button>
                </div>
              </Card>
              <div className="events-grid">
                <Row className="event-card-row">{renderEventsGrid(eventsData)}</Row>
              </div>
            </>
          )}
        </div>
      </ConfigProvider>
    </>
  );
};

export default AdminEvents;
