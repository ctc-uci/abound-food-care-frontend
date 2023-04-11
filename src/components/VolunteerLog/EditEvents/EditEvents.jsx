import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Modal, Form, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

import { AFCBackend } from '../../../util/utils';

import styles from './EditEvents.module.css';

const EditEvents = ({ isOpen, setIsOpen, record, userId, refreshHours, setRefreshHours }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(weekday);
  dayjs.extend(localeData);

  const timeZone = dayjs.tz.guess();

  const handleOk = async values => {
    setConfirmLoading(true);
    if (userId !== '') {
      await AFCBackend.put(`/volunteers/${userId}/${record.eventId}`, {
        startDatetime: values.startDatetime,
        endDatetime: values.endDatetime,
      });
      setRefreshHours(!refreshHours);
    }
    toast.success(`Edited hours for ${record.name}!`);
    setConfirmLoading(false);
    setIsOpen(false);
  };

  const handleCancel = () => {
    // console.log('Clicked cancel button');
    setIsOpen(false);
  };

  return (
    <Modal
      title="Edit Hours"
      visible={isOpen}
      onOk={form.submit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      // destroyOnClose
    >
      <Form
        form={form}
        initialValues={{
          startDatetime: dayjs(record.startDatetime).tz(timeZone),
          endDatetime: dayjs(record.endDatetime).tz(timeZone),
        }}
        onFinish={handleOk}
      >
        <p className={styles.fieldHeading}>Time In</p>
        <Form.Item
          name="startDatetime"
          rules={[{ required: true, message: 'Please input a valid time!' }]}
        >
          <DatePicker showTime={{ format: 'hh:mm a' }} format="MM/DD/YYYY @ hh:mm a" />
        </Form.Item>
        <p className={styles.fieldHeading}>Time Out</p>
        <Form.Item
          name="endDatetime"
          rules={[{ required: true, message: 'Please input a valid time!' }]}
        >
          <DatePicker showTime={{ format: 'hh:mm a' }} format="MM/DD/YYYY @ hh:mm a" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditEvents.defaultProps = {
  userId: '',
};

EditEvents.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  userId: PropTypes.string,
  record: PropTypes.shape({
    date: PropTypes.string.isRequired,
    endDatetime: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    numHours: PropTypes.number.isRequired,
    startDatetime: PropTypes.string.isRequired,
  }).isRequired,
  refreshHours: PropTypes.bool.isRequired,
  setRefreshHours: PropTypes.func.isRequired,
};

export default EditEvents;
