import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Form, Input, Select, Radio, Row, Col, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  AFCBackend,
  phoneRegExp,
  zipRegExp,
  stateAbbrs,
  userProfileTriggers,
} from '../../util/utils';

import styles from './ProfileComponents.module.css';

const { Text } = Typography;

const ProfileGeneralInfo = ({ userId, volunteerData, setVolunteerData }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [componentSize, setComponentSize] = useState('default');

  const schema = yup.object({
    firstName: yup.string().required('First name is a required field'),
    lastName: yup.string().required('Last name is a required field'),
    organization: yup.string().required('Organization is a required field'),
    birthdate: yup
      .date()
      .required()
      .nullable()
      .typeError('Birthdate is a required field')
      .max(new Date(), `Birthdate must be before today`),
    phone: yup
      .string()
      .required('Phone number is a required field')
      .matches(phoneRegExp, 'Phone number is not valid'),
    preferredContactMethod: yup.string().required('Preferred contact method is a required field'),
    addressStreet: yup.string().required('Street address is a required field'),
    addressZip: yup
      .string()
      .required('Zipcode is required')
      .matches(zipRegExp, 'Zipcode is not valid')
      .test('len', 'Zipcode must contain only 5 digits', val => val.length === 5),
    addressCity: yup.string().required('City is a required field'),
    addressState: yup
      .string()
      .required('State is a required field')
      .test('len', 'State must be a valid 2-letter state code', val =>
        stateAbbrs.includes(val.toUpperCase()),
      ),
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

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  const getVolunteerData = () => {
    clearErrors();
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

  const handleCancel = () => {
    getVolunteerData();
    setIsEditable(false);
  };

  const handleEdit = async values => {
    if (isEditable) {
      try {
        const result = await trigger(userProfileTriggers.general);
        if (result) {
          const payload = { ...values };
          const updatedUser = await AFCBackend.put(`/users/general-info/${userId}`, payload);
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
          onFinish={handleSubmit(handleEdit)}
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
              onClick={() => handleEdit(getValues())}
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
                  <Form.Item label="First Name" required>
                    <Input disabled={!isEditable} {...{ onChange, value, ref }} />
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
                    <Input disabled={!isEditable} {...{ onChange, value, ref }} />
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
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
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
                  format="MM/DD/YYYY"
                  placeholder="Select date"
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
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
                <Input className={styles.halfWidth} disabled {...{ onChange, value, ref }} />
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
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
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
                <Radio.Group disabled={!isEditable} {...{ onChange, value, ref }}>
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
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
                />
                <Text type="danger">
                  {isEditable && errors.addressStreet && <p>{errors.addressStreet.message}</p>}
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
                      className={styles.giCityField}
                      disabled={!isEditable}
                      {...{ onChange, value, ref }}
                    />
                    <Text type="danger">
                      {isEditable && errors.addressCity && <p>{errors.addressCity.message}</p>}
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
                    <Select
                      className={styles.giStateField}
                      disabled={!isEditable}
                      {...{ onChange, value, ref }}
                    >
                      {stateAbbrs.map(abbr => (
                        <Select.Option key={abbr}>{abbr}</Select.Option>
                      ))}
                    </Select>
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
                    <Input disabled={!isEditable} {...{ onChange, value, ref }} />
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
