import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Radio, Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const { Text } = Typography;

const ProfileDUIAndCrimHistory = ({ userId }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [isEditable, setIsEditable] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '75%',
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getVolunteerData = async () => {
    try {
      const { data: volunteerData } = await axios.get(`http://localhost:3001/users/${userId}`);
      setDefaultValues({
        duiHistory: volunteerData.duiHistory,
        duiHistoryDetails: volunteerData.duiHistoryDetails,
        criminalHistory: volunteerData.criminalHistory,
        criminalHistoryDetails: volunteerData.criminalHistoryDetails,
        additionalInformation: volunteerData.additionalInformation,
      });
      setValue('duiHistory', volunteerData.duiHistory);
      setValue('duiHistoryDetails', volunteerData.duiHistoryDetails);
      setValue('criminalHistory', volunteerData.criminalHistory);
      setValue('criminalHistoryDetails', volunteerData.criminalHistoryDetails);
      setValue('additionalInfo', volunteerData.additionalInformation);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setValue('duiHistory', defaultValues.duiHistory);
    setValue('duiHistoryDetails', defaultValues.duiHistoryDetails);
    setValue('criminalHistory', defaultValues.criminalHistory);
    setValue('criminalHistoryDetails', defaultValues.criminalHistoryDetails);
    setValue('additionalInfo', defaultValues.additionalInformation);
  };

  const saveVolunteerData = values => {
    try {
      const payload = {
        duiHistory: values.duiHistory,
        duiHistoryDetails: values.duiHistoryDetails,
        criminalHistory: values.criminalHistory,
        criminalHistoryDetails: values.criminalHistoryDetails,
        additionalInformation: values.additionalInfo,
      };
      console.log(payload);
      // await axios.put(`http://localhost:3001/users/${userId}`, payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  return (
    <div>
      <Form
        onFinish={handleSubmit(saveVolunteerData)}
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <div style={{ float: 'right' }}>
          {isEditable && (
            <Button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button className="edit-save-btn" htmlType="submit" onClick={handleEdit}>
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </div>
        <Controller
          control={control}
          name="criminalHistory"
          render={({ field: { onChange, ref, value } }) => (
            <Form.Item label="Have you ever been convicted of violation of any law?">
              <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
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
                onChange={onChange}
                value={value}
                ref={ref}
                disabled={!isEditable}
                style={inputBoxStyle}
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
            <Form.Item label="Do you have any DUI (Driving Under Influence) history?">
              <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
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
                onChange={onChange}
                value={value}
                ref={ref}
                disabled={!isEditable}
                style={inputBoxStyle}
              />
              <Text type="danger">
                {errors.duiHistoryDetails && <p>{errors.duiHistoryDetails.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
        <Controller
          control={control}
          name="additionalInfo"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="Please write down any additional information you would like us to know.">
              <Input.TextArea
                onChange={onChange}
                value={value}
                ref={ref}
                disabled={!isEditable}
                style={inputBoxStyle}
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

ProfileDUIAndCrimHistory.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileDUIAndCrimHistory;
