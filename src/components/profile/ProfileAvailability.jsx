import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ScheduleSelector from 'react-schedule-selector';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form, Button, Typography } from 'antd';
import { startOfWeek } from 'date-fns';
import { AFCBackend, dayOfWeek } from '../../util/utils';
// import AvailabilityChart from '../AvailabilityChart/AvailabilityChart';

import styles from './ProfileComponents.module.css';

const { Text } = Typography;

const ProfileAvailability = ({ userId }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [availabilityData, setAvailabilityData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  const schema = yup.object({
    availabilities: yup.array().test(a => a.length >= 0),
  });

  const {
    clearErrors,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange', delayError: 750 });

  const convertSlotsToDates = slots =>
    slots.map(s => {
      const [hours, mins] = s.startTime.split('+')[0].split(':').slice(0, 2);
      const date = new Date();
      return new Date(
        new Date(
          date.setDate(date.getDate() - date.getDay() + dayOfWeek.indexOf(s.dayOfWeek)),
        ).setHours(hours, mins - date.getTimezoneOffset(), 0),
      );
    });

  const convertDatesToSlots = dates =>
    dates.map(d => ({
      endTime: `${d.getMinutes() === 30 ? (d.getHours() + 1) % 24 : d.getHours()}:${
        d.getMinutes() === 30 ? '00' : '30'
      }:00${d.getTimezoneOffset() < 0 ? '+' : '-'}${Math.abs(
        Math.floor(d.getTimezoneOffset() / 60),
      )}`,
      startTime: `${d.getHours()}:${d.getMinutes() === 0 ? '00' : d.getMinutes()}:00`,
      dayOfWeek: dayOfWeek[d.getDay()],
    }));

  const getVolunteerData = async () => {
    try {
      clearErrors();
      const { data: res } = await AFCBackend.get(`/availability/${userId}`);
      console.log(res.availabilities);
      console.log(convertDatesToSlots(convertSlotsToDates(res.availabilities)));
      setAvailabilityData(convertSlotsToDates(res.availabilities));
    } catch (e) {
      toast.error(`Error getting volunteer data: ${e.message}`);
    }
  };

  const handleEdit = async values => {
    if (isEditable) {
      try {
        const result = await trigger(['availabilities']);
        if (result) {
          console.log(values);
          // const payload = { ...values };
          // const updatedUser = await AFCBackend.put(`/users/additional-info/${userId}`, payload);
          // setVolunteerData({ ...updatedUser.data });
          toast.success('Successfully saved user availability!');
          setIsEditable(!isEditable);
        }
      } catch (e) {
        toast.error(`Error saving form: ${e.response?.data ?? e.message}`);
        getVolunteerData();
      }
    } else {
      setIsEditable(!isEditable);
      getVolunteerData();
    }
  };

  const handleCancel = () => {
    getVolunteerData();
    setIsEditable(false);
  };

  useEffect(async () => {
    getVolunteerData();
  }, []);

  useEffect(() => setValue('availabilities', availabilityData), [availabilityData]);

  return (
    <div className={styles.availContainer}>
      <Form
        onFinish={handleSubmit(handleEdit)}
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <div className={styles.btnsContainer}>
          {isEditable && (
            <Button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button
            className={`${styles.editSaveBtn} ${!isEditable && styles.editBtnInactive}`}
            onClick={() => handleEdit(getValues())}
          >
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </div>
        {availabilityData && (
          <ScheduleSelector
            selection={availabilityData}
            selectionScheme="square"
            startDate={startOfWeek(new Date())}
            numDays={7}
            minTime={0}
            maxTime={24}
            hourlyChunks={2}
            timeFormat="h:mm A"
            dateFormat="ddd"
            columnGap="4px"
            rowGap="2px"
            // renderDateCell={(time, selected, refSetter) => (
            //   <div
            //     className="grid-cell"
            //     style={{ backgroundColor: `${selected ? '#799CA8' : '#F2FBFC'}` }}
            //     ref={refSetter}
            //     role="button"
            //     tabIndex="0"
            //   >
            //     {' '}
            //   </div>
            // )}
          />
        )}
        <Text type="danger">
          {isEditable && errors.availabilities && <p>{errors.availabilities.message}</p>}
        </Text>
      </Form>
    </div>
  );
};

ProfileAvailability.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileAvailability;
