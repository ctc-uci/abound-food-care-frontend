import { React } from 'react';
// import { React, useState } from 'react'; // cant commit without forcing past eslint or not importing usestate since its unfinished
import { Table } from 'antd';
// import { AFCBackend } from '../../util/utils';
// import EditEvents from './edit-events/EditEvents'; when figuring out how to use modal i made a component to store the code

const VolunteerLog = () => {
  // should pass props
  // const [userId, setUserId] = useState(2);
  // const [unsubmittedData, setUnsubmittedData] = useState([]);
  // const [editIndex, setEditIndex] = useState(0); based on eventpage

  // const submitEvent = async index => {
  //   //  setEditIndex(index);
  //   await AFCBackend.post(`/hours/${userId}/${unsubmittedData[index].eventId}/submit`);
  // };

  // const editEvent = async () => {
  //   //  create popup, then send that info to post request
  //   <EditEvents/>;
  // };

  // const getVolunteerLog = async () => {
  //   const { data: res } = await AFCBackend.get(`/volunteers/${userId}/${props.submitted}`);
  //   let submittedData = [...data];
  //   submittedData.push(<Button onclick={submitEvent}></Button>);
  //   submittedData.push(<Button onclick={editEvent}></Button>);
  //   setUnsubmittedData(res.data);
  // };

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'eventname',
      key: 'eventname',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time In',
      dataIndex: 'timein',
      key: 'timein',
    },
    {
      title: 'Time out',
      dataIndex: 'timeout',
      key: 'timeout',
    },
    // the below comments are the only ones commented before fixing for eslint - these im unsure how to add to the table directly though have an idea
    // {
    //   title: 'Submit?',
    //   dataIndex: 'submit',
    //   key:'submit',
    // },
    // {
    //   title: 'Edit Info',
    //   dataIndex: 'editinfo',
    //   key:'editinfo',
    // },
  ];
  // useEffect(() => {
  //   setUserId(2);
  //   getVolunteerLog();
  // },
  // );

  const unsubmittedData = [];
  return (
    <>
      <Table dataSource={unsubmittedData} columns={columns} />;
    </>
  );
};

export default VolunteerLog;
