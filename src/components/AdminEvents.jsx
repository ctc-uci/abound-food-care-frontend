import { React, useState, useEffect } from 'react';
import { Input, Button, Radio, Row, Col, Card, Typography, Space } from 'antd';
import axios from 'axios';
import EventCard from './EventCard';

const { Search } = Input;
const { Title } = Typography;

const AdminEvents = () => {
  const onSearch = value => console.log(value);
  const [eventTypeValue, setEventTypeValue] = useState(1);
  const [eventStatusValue, setEventStatusValue] = useState(1);
  const [loading, setLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);

  const eventTypeOptions = [
    { label: 'All', value: 1 },
    { label: 'Distributions', value: 2 },
    { label: 'Food Running', value: 3 },
    { label: 'Other', value: 4 },
  ];

  const eventStatusOptions = [
    { label: 'All', value: 1 },
    { label: 'Upcoming', value: 2 },
    { label: 'Past', value: 3 },
  ];

  const onTypeChange = e => {
    setEventTypeValue(e.target.value);
  };

  const onStatusChange = e => {
    setEventStatusValue(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: eventResponse } = await axios.get('http://localhost:3001/events');
        setEventsData(eventResponse);
      } catch (err) {
        console.error(err.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
              placeholder="input search text"
              onSearch={onSearch}
              allowClear
              enterButton="Search"
              style={{ width: 500 }}
            />
          </Card>
          <Card>
            <Space>
              <Radio.Group
                options={eventTypeOptions}
                onChange={onTypeChange}
                value={eventTypeValue}
                optionType="button"
              />
            </Space>
            <Space>
              <Radio.Group
                options={eventStatusOptions}
                onChange={onStatusChange}
                value={eventStatusValue}
                optionType="button"
              />
            </Space>
            <Button type="primary">New Event</Button>
            <Button>New Event Type</Button>
          </Card>
          <Card>
            <Row>{renderEventsGrid(eventsData)}</Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminEvents;
