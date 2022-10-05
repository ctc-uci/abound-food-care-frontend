import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Form, Input, Radio, Row, Col, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AFCBackend, phoneRegExp, zipRegExp, stateAbbrs } from '../../util/utils';

import styles from './ProfileComponents.module.css';

const { Text } = Typography;

const ProfileGeneralInfo = ({ userId, volunteerData, setVolunteerData }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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
      .test('validState', 'Must be a valid state abbreviation', val => stateAbbrs.includes(val))
      .required('State is a required field'),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange', delayError: 750 });

  const getVolunteerData = () => {
    [
      'firstName',
      'lastName',
      'organization',
      'email',
      'phone',
      'preferredContactMethod',
      'addressStreet',
      'addressCity',
      'addressState',
      'addressZip',
    ].forEach(attr => setValue(attr, volunteerData[attr]));
    if (volunteerData.birthdate) {
      setValue(
        'birthdate',
        moment(new Date(volunteerData.birthdate).toISOString().split('T')[0], 'YYYY-MM-DD'),
      );
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setIsEditable(false);
    [
      'organization',
      'phone',
      'preferredContactMethod',
      'addressStreet',
      'addressCity',
      'addressState',
      'addressZip',
    ].forEach(attr => setValue(attr, volunteerData[attr]));
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
      const updatedUser = await AFCBackend.put(`/users/general-info/${userId}`, payload);
      setVolunteerData(updatedUser.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (!volunteerData) {
      return;
    }
    getVolunteerData();
  }, [volunteerData]);

  return (
    <>
      <div className={styles.generalInfoContainer}>
        <Form
          onFinish={handleSubmit(saveVolunteerData)}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          layout="vertical"
          labelCol={{ span: 20 }}
          name="nest-messages"
        >
          <div className={styles.btnsContainer}>
            {isEditable && (
              <Button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button
              className={`${styles.editSaveBtn} ${!isEditable && styles.editBtnInactive}`}
              htmlType="submit"
              onClick={handleEdit}
            >
              {isEditable ? 'Save' : 'Edit'}
            </Button>
          </div>
          <Row>
            <Col span={6} className={styles.firstNameCol}>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="First Name">
                    <Input onChange={onChange} value={value} ref={ref} disabled />
                    <Text type="danger">
                      {isEditable && errors.firstName && <p>{errors.firstName.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={6} className={styles.lastNameCol}>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="Last Name">
                    <Input onChange={onChange} value={value} ref={ref} disabled />
                    <Text type="danger">
                      {isEditable && errors.lastName && <p>{errors.lastName.message}</p>}
                    </Text>
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
                  className={styles.halfWidth}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                />
                <Text type="danger">
                  {isEditable && errors.organization && <p>{errors.organization.message}</p>}
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
                  className={styles.halfWidth}
                  placeholder="Select date"
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled
                />
                <Text type="danger">
                  {isEditable && errors.birthdate && <p>{errors.birthdate.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Email">
                <Input
                  className={styles.halfWidth}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled
                />
                <Text type="danger">
                  {isEditable && errors.email && <p>{errors.email.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Phone Number">
                <Input
                  className={styles.halfWidth}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                />
                <Text type="danger">
                  {isEditable && errors.phone && <p>{errors.phone.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Controller
            control={control}
            name="preferredContactMethod"
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Preferred Contact Method">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value="email" className={styles.giRadioOpt}>
                    Email
                  </Radio>
                  <Radio value="phone" className={styles.giRadioOpt}>
                    Phone
                  </Radio>
                </Radio.Group>
                <Text type="danger">
                  {isEditable && errors.preferredContactMethod && (
                    <p>{errors.preferredContactMethod.message}</p>
                  )}
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
                  className={styles.halfWidth}
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                />
                <Text type="danger">
                  {isEditable && errors.addressStreet && <p>{errors.addressStreet.message}</p>}
                </Text>
              </Form.Item>
            )}
          />

          <Row>
            <Col span={7}>
              <Controller
                control={control}
                name="addressCity"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="City">
                    <Input
                      className={styles.giCityField}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      disabled={!isEditable}
                    />
                    <Text type="danger">
                      {isEditable && errors.addressCity && <p>{errors.addressCity.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={2}>
              <Controller
                control={control}
                name="addressState"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item label="State">
                    <Input
                      className={styles.giStateField}
                      onChange={onChange}
                      value={value}
                      ref={ref}
                      disabled={!isEditable}
                    />
                    <Text type="danger">
                      {isEditable && errors.addressState && <p>{errors.addressState.message}</p>}
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
                      {isEditable && errors.addressZip && <p>{errors.addressZip.message}</p>}
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
  userId: PropTypes.string.isRequired,
  volunteerData: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setVolunteerData: PropTypes.func.isRequired,
};

export default ProfileGeneralInfo;
