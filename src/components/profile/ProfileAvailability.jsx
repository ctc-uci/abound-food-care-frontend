import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ScheduleSelector from 'react-schedule-selector';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form, Button, Typography } from 'antd';
import { startOfWeek } from 'date-fns';
import { AFCBackend, convertSlotsToDates, convertDatesToSlots } from '../../util/utils';

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

  const getVolunteerData = async () => {
    try {
      clearErrors();
      const { data: res } = await AFCBackend.get(`/availability/${userId}`);
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
          const payload = { availabilities: convertDatesToSlots(values.availabilities) };
          await AFCBackend.put(`/availability/${userId}`, payload);
          toast.success('Successfully saved user availability!');
          setIsEditable(!isEditable);
          getVolunteerData();
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

  const editWithoutEditable = () => toast('To edit availability, click the Edit button.');

  const handleCancel = () => {
    getVolunteerData();
    setIsEditable(false);
  };

  useEffect(async () => {
    getVolunteerData();
  }, [userId]);

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
        <div className={styles.avChartContainer}>
          <p className={styles.avDescriptor}>
            <span className={styles.avGreen}>* Dark green cell</span> indicates availability on
            chart.
          </p>
          {availabilityData && (
            <ScheduleSelector
              selection={availabilityData}
              selectionScheme="square"
              // {...(isEditable && { onChange: newDates => setAvailabilityData(newDates) })}
              onChange={
                isEditable ? newDates => setAvailabilityData(newDates) : editWithoutEditable
              }
              startDate={startOfWeek(new Date())}
              numDays={7}
              minTime={0}
              maxTime={24}
              hourlyChunks={2}
              timeFormat="h:mm A"
              dateFormat="ddd"
              columnGap="4px"
              rowGap="2px"
              renderDateCell={(time, selected, refSetter) => (
                <div
                  className={styles.avGridCell}
                  style={{ backgroundColor: `${selected ? '#115740' : '#F6FCFC'}` }}
                  ref={refSetter}
                  role="button"
                  tabIndex="0"
                >
                  {' '}
                </div>
              )}
            />
          )}
          <Text type="danger">
            {isEditable && errors.availabilities && <p>{errors.availabilities.message}</p>}
          </Text>
        </div>
      </Form>
    </div>
  );
};

ProfileAvailability.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default ProfileAvailability;
