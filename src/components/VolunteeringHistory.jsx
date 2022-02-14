import React, { useState, useEffect } from 'react';
import { FieldTimeOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import './VolunteeringHistory.css';

function VolunteeringHistory() {
  const [totalHours, setTotalHours] = useState(0);
  useEffect(() => {
    setTotalHours(230);
  }, []);

  return (
    <div className="historyTab">
      <div className="container">
        <p className="header">My Volunteering History</p>

        <div className="overviewDiv">
          <FieldTimeOutlined className="clockIcon" />
          <p className="hrs">{totalHours} Hrs</p>
        </div>

        <p className="tableHeader">Unsubmitted Hours</p>
        <Table className="table" />

        <p className="tableHeader">Submitted Hours</p>
        <Table className="table" />
        <div className="spacer" />
      </div>
    </div>
  );
}

export default VolunteeringHistory;
