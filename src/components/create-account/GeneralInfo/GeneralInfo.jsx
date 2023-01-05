import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, Input, Radio, Select, Row, Col } from 'antd';

import styles from './GeneralInfo.module.css';
import { stateAbbrs } from '../../../util/utils';

const RequiredStar = () => <span className={styles.required}>*</span>;

const GeneralInfo = ({ firstName, lastName, email, password }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <h1 className={styles.heading}> General Information</h1>
      <p className={styles.instructions}>
        Please enter the following information below to complete your profile.
      </p>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            First Name:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input
                  defaultValue={firstName}
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>{errors.firstName && errors.firstName.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Last Name:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input
                  defaultValue={lastName}
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>{errors.lastName && errors.lastName.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Password:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input.Password
                  className={styles.fieldInput}
                  defaultValue={password}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>{errors.password && errors.password.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Organization:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="organization"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input className={styles.fieldInput} {...{ ref, value, onChange }} />
              </>
            )}
          />
          <p className={styles.errText}>{errors.organization && errors.organization.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Date of Birth:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="birthdate"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <DatePicker
                  placeholder="Select date"
                  format="MM/DD/YYYY"
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>{errors.birthdate && errors.birthdate.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Email:
          </div>
        </Col>
        <Col span={5}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input
                  defaultValue={email}
                  disabled
                  className={styles.fieldInput}
                  {...{ ref, value, onChange }}
                />
              </>
            )}
          />
          <p className={styles.errText}>{errors.email && errors.email.message}</p>
        </Col>
        <Col span={3}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Phone Number:
          </div>
        </Col>
        <Col span={4}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input className={styles.fieldInput} {...{ ref, value, onChange }} />
              </>
            )}
          />
          <p className={styles.errText}>{errors.phone && errors.phone.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Preferred Contact Method:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="preferredContactMethod"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Radio.Group className={styles.radioInput} {...{ ref, value, onChange }}>
                  <Radio value="email">Email</Radio>
                  <Radio value="phone">Phone</Radio>
                </Radio.Group>
              </>
            )}
          />
          <p className={styles.errText}>
            {errors.preferredContactMethod && errors.preferredContactMethod.message}
          </p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Street Address:
          </div>
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="addressStreet"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input className={styles.fieldInput} {...{ ref, value, onChange }} />
              </>
            )}
          />
          <p className={styles.errText}>{errors.addressStreet && errors.addressStreet.message}</p>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.fieldRow}>
        <Col span={6}>
          <div className={styles.fieldName}>
            <RequiredStar />
            City:
          </div>
        </Col>
        <Col span={3}>
          <Controller
            control={control}
            name="addressCity"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input className={styles.fieldInput} {...{ ref, value, onChange }} />
              </>
            )}
          />
          <p className={styles.errText}>{errors.addressCity && errors.addressCity.message}</p>
        </Col>
        <Col span={2}>
          <div className={styles.fieldName}>
            <RequiredStar />
            State:
          </div>
        </Col>
        <Col span={2}>
          <Controller
            control={control}
            name="addressState"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Select className={styles.select} {...{ onChange, value, ref }}>
                  {stateAbbrs.map(abbr => (
                    <Select.Option key={abbr}>{abbr}</Select.Option>
                  ))}
                </Select>
              </>
            )}
          />
          <p className={styles.errText}>{errors.addressState && errors.addressState.message}</p>
        </Col>
        <Col span={3}>
          <div className={styles.fieldName}>
            <RequiredStar />
            Zip Code:
          </div>
        </Col>
        <Col span={2}>
          <Controller
            control={control}
            name="addressZip"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <Input className={styles.fieldInput} {...{ ref, value, onChange }} />
              </>
            )}
          />
          <p className={styles.errText}>{errors.addressZip && errors.addressZip.message}</p>
        </Col>
      </Row>
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
