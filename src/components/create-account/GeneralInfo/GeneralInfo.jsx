import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, Form, Input, Radio, Typography } from 'antd';

import styles from './GeneralInfo.module.css';

const { Text } = Typography;

const GeneralInfo = ({ firstName, lastName, email, password }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <center>
        <h1 className={styles.header}> General Information</h1>
        <p className={styles.instructions}>
          Please enter the following information below to complete your profile.
        </p>
      </center>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="First Name" required>
            <Input onChange={onChange} ref={ref} defaultValue={firstName} />
            <Text type="danger">{errors.firstName && <p>{errors.firstName.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Last Name" required>
            <Input onChange={onChange} ref={ref} defaultValue={lastName} />
            <Text type="danger">{errors.lastName && <p>{errors.lastName.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Password" required>
            <Input.Password onChange={onChange} ref={ref} defaultValue={password} />
            <Text type="danger">{errors.password && <p>{errors.password.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="organization"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Organization" required>
            <Input onChange={onChange} ref={ref} />
            <Text type="danger">{errors.organization && <p>{errors.organization.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="birthdate"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Birthday" required>
            <DatePicker placeholder="Select date" onChange={onChange} ref={ref} />
            <Text type="danger">{errors.birthdate && <p>{errors.birthdate.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Email" required>
            <Input onChange={onChange} ref={ref} defaultValue={email} />
            <Text type="danger">{errors.email && <p>{errors.email.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Phone Number" required>
            <Input onChange={onChange} ref={ref} />
            <Text type="danger">{errors.phone && <p>{errors.phone.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="preferredContactMethod"
        render={({ field: { onChange, ref, value } }) => (
          <Form.Item label="Preferred Contact Method" required>
            <Radio.Group onChange={onChange} ref={ref} value={value}>
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
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Street Address" required>
            <Input placeholder="200 N Tustin Ave" onChange={onChange} ref={ref} />
            <Text type="danger">
              {errors.addressStreet && <p>{errors.addressStreet.message}</p>}
            </Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressCity"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="City" required>
            <Input placeholder="Ex. Santa Ana" onChange={onChange} ref={ref} />
            <Text type="danger">{errors.addressCity && <p>{errors.addressCity.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressState"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="State" required>
            <Input placeholder="Ex. CA" onChange={onChange} ref={ref} />
            <Text type="danger">{errors.addressState && <p>{errors.addressState.message}</p>}</Text>
          </Form.Item>
        )}
      />
      <Controller
        control={control}
        name="addressZip"
        render={({ field: { onChange, ref } }) => (
          <Form.Item label="Zipcode" required>
            <Input placeholder="Ex. 92705" onChange={onChange} ref={ref} />
            <Text type="danger">{errors.addressZip && <p>{errors.addressZip.message}</p>}</Text>
          </Form.Item>
        )}
      />
    </div>
  );
};

GeneralInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default GeneralInfo;
