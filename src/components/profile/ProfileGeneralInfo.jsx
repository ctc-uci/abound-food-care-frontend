import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Form, Input, Radio, Row, Col, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';

const { Text } = Typography;

const ProfileGeneralInfo = ({ userId }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const zipRegExp = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  const schema = yup.object({
    organization: yup.string().required(),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is a required field'),
    preferredContactMethod: yup.string().required(),
    addressStreet: yup.string().required('Street address is a required field'),
    addressZip: yup
      .string()
      .matches(zipRegExp, 'Zipcode is not valid')
      .required('Zipcode is required')
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5),
    addressCity: yup.string().required('City is a required field'),
    addressState: yup
      .string()
      .test('len', 'Must be a 2-letter state code', val => val.length === 2)
      .required('State is a required field'),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange', delayError: 750 });

  const getVolunteerData = async () => {
    try {
      const { data: volunteerData } = await axios.get(`http://localhost:3001/users/${userId}`);
      setDefaultValues({
        organization: volunteerData.organization,
        phone: volunteerData.phone,
        preferredContactMethod: volunteerData.preferredContactMethod,
        addressStreet: volunteerData.addressStreet,
        addressCity: volunteerData.addressCity,
        addressState: volunteerData.addressState,
        addressZip: volunteerData.addressZip,
      });
      setValue('firstName', volunteerData.firstName);
      setValue('lastName', volunteerData.lastName);
      setValue('organization', volunteerData.organization);
      setValue(
        'birthdate',
        moment(new Date(volunteerData.birthdate).toISOString().split('T')[0], 'YYYY-MM-DD'),
      );
      setValue('email', volunteerData.email);
      setValue('phone', volunteerData.phone);
      setValue('preferredContactMethod', volunteerData.preferredContactMethod);
      setValue('addressStreet', volunteerData.addressStreet);
      setValue('addressCity', volunteerData.addressCity);
      setValue('addressState', volunteerData.addressState);
      setValue('addressZip', volunteerData.addressZip);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setValue('organization', defaultValues.organization);
    setValue('phone', defaultValues.phone);
    setValue('preferredContactMethod', defaultValues.preferredContactMethod);
    setValue('addressStreet', defaultValues.addressStreet);
    setValue('addressCity', defaultValues.addressCity);
    setValue('addressState', defaultValues.addressState);
    setValue('addressZip', defaultValues.addressZip);
  };

  const saveVolunteerData = async values => {
    try {
      const payload = {
        organization: values.organization,
        phone: values.phone,
        preferredContactMethod: values.preferredContactMethod,
        addressStreet: values.addressStreet,
        addressCity: values.addressCity,
        addressState: values.addressState,
        addressZip: values.addressZip,
      };
      await axios.put(`http://localhost:3001/users/general-info/${userId}`, payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getVolunteerData();
  }, []);

  return (
    <>
      <div>
        <Form
          onFinish={handleSubmit(saveVolunteerData)}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          layout="vertical"
          labelCol={{ span: 20 }}
          name="nest-messages"
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
          <Row>
            <Col span={6}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="First Name">
                    <Input onChange={onChange} value={value} ref={ref} disabled />
                    <Text type="danger">
                      {errors.firstName && <p>{errors.firstName.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={6}>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="Last Name">
                    <Input onChange={onChange} value={value} ref={ref} disabled />
                    <Text type="danger">{errors.lastName && <p>{errors.lastName.message}</p>}</Text>
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          <Controller
            control={control}
            name="organization"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Organization">
                <Input
                  style={inputBoxStyle}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                />
                <Text type="danger">
                  {errors.organization && <p>{errors.organization.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="birthdate"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Birthday">
                <DatePicker
                  placeholder="Select date"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled
                />
                <Text type="danger">{errors.birthdate && <p>{errors.birthdate.message}</p>}</Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Email">
                <Input style={inputBoxStyle} onChange={onChange} value={value} ref={ref} disabled />
                <Text type="danger">{errors.email && <p>{errors.email.message}</p>}</Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Phone Number">
                <Input
                  style={inputBoxStyle}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                />
                <Text type="danger">{errors.phone && <p>{errors.phone.message}</p>}</Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="preferredContactMethod"
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Preferred Contact Method">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value="email">Email</Radio>
                  <Radio value="phone">Phone</Radio>
                </Radio.Group>
                <Text type="danger">
                  {errors.preferredContactMethod && <p>{errors.preferredContactMethod.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="addressStreet"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Street Address">
                <Input
                  style={inputBoxStyle}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                />
                <Text type="danger">
                  {errors.addressStreet && <p>{errors.addressStreet.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Row>
            <Col span={6}>
              <Controller
                control={control}
                name="addressCity"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="City">
                    <Input
                      style={inputBoxStyle}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      disabled={!isEditable}
                    />
                    <Text type="danger">
                      {errors.addressCity && <p>{errors.addressCity.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={3}>
              <Controller
                control={control}
                name="addressState"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="State">
                    <Input
                      style={inputBoxStyle}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      disabled={!isEditable}
                    />
                    <Text type="danger">
                      {errors.addressState && <p>{errors.addressState.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={3}>
              <Controller
                control={control}
                name="addressZip"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="Zipcode">
                    <Input onChange={onChange} value={value} ref={ref} disabled={!isEditable} />
                    <Text type="danger">
                      {errors.addressZip && <p>{errors.addressZip.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

ProfileGeneralInfo.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileGeneralInfo;
