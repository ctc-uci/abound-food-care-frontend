import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Radio, Form, Input, Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import { AFCBackend, userProfileTriggers } from '../../util/utils';

import styles from './ProfileComponents.module.css';

const { Text } = Typography;

const ProfileAdditionalInfo = ({ userId, volunteerData, setVolunteerData }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [isEditable, setIsEditable] = useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const schema = yup.object({
    criminalHistory: yup.bool().required('Criminal history is a required field'),
    criminalHistoryDetails: yup.string().nullable(true),
    completedChowmatchTraining: yup
      .bool()
      .required('You must indicate whether you have completed Chowmatch training'),
    duiHistory: yup.bool().required('DUI history is a required field'),
    duiHistoryDetails: yup.string().nullable(true),
    additionalInformation: yup.string().nullable(true),
  });

  const {
    clearErrors,
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange', delayError: 750 });

  const getVolunteerData = () => {
    clearErrors();
    [
      'duiHistory',
      'duiHistoryDetails',
      'criminalHistory',
      'criminalHistoryDetails',
      'completedChowmatchTraining',
      'additionalInformation',
    ].forEach(attr => setValue(attr, volunteerData[attr]));
  };

  const handleEdit = async values => {
    if (isEditable) {
      try {
        const result = await trigger(userProfileTriggers.additionalInfo);
        if (result) {
          const payload = { ...values };
          const updatedUser = await AFCBackend.put(`/users/additional-info/${userId}`, payload);
          setVolunteerData({ ...updatedUser.data });
          toast.success('Successfully saved user information!');
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

  useEffect(() => {
    getVolunteerData();
  }, []);

  return (
    <div className={styles.duiCrimHistoryContainer}>
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
        <Controller
          control={control}
          name="criminalHistory"
          render={({ field: { onChange, ref, value } }) => (
            <Form.Item label="Have you ever been convicted of violation of any law?" required>
              <Radio.Group disabled={!isEditable} {...{ onChange, value, ref }}>
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
              <Text type="danger">
                {errors.criminalHistory && <p>{errors.criminalHistory.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="criminalHistoryDetails"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="If you replied YES to the previous question, please specify your most recent violation.">
              <Input.TextArea
                disabled={!isEditable}
                className={styles.aiInput}
                {...{ onChange, value, ref }}
              />
              <Text type="danger">
                {errors.criminalHistoryDetails && <p>{errors.criminalHistoryDetails.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="duiHistory"
          render={({ field: { onChange, ref, value } }) => (
            <Form.Item label="Do you have a DUI (Driving Under Influence) history?" required>
              <Radio.Group disabled={!isEditable} {...{ onChange, value, ref }}>
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
              <Text type="danger">{errors.duiHistory && <p>{errors.duiHistory.message}</p>}</Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="duiHistoryDetails"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="If you replied YES to the previous question, please specify your most recent DUI violation.">
              <Input.TextArea
                disabled={!isEditable}
                className={styles.aiInput}
                {...{ onChange, value, ref }}
              />
              <Text type="danger">
                {errors.duiHistoryDetails && <p>{errors.duiHistoryDetails.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="completedChowmatchTraining"
          render={({ field: { onChange, ref, value } }) => (
            <Form.Item label="Have you completed Chowmatch training?" required>
              <Radio.Group disabled={!isEditable} {...{ onChange, value, ref }}>
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
              <Text type="danger">
                {errors.completedChowmatchTraining && (
                  <p>{errors.completedChowmatchTraining.message}</p>
                )}
              </Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="additionalInformation"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="Please write down any additional information you would like us to know.">
              <Input.TextArea
                disabled={!isEditable}
                className={styles.aiInput}
                {...{ onChange, value, ref }}
              />
              <Text type="danger">
                {errors.additionalInfo && <p>{errors.additionalInfo.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
      </Form>
    </div>
  );
};

ProfileAdditionalInfo.propTypes = {
  userId: PropTypes.string.isRequired,
  volunteerData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setVolunteerData: PropTypes.func.isRequired,
};

export default ProfileAdditionalInfo;
