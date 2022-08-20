import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Radio, Typography } from 'antd';
import TitledInput from './TitledInput';

const { Text } = Typography;

const Container = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  width: 50%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const VolunteerGeneralInfo = ({
  firstName,
  lastName,
  organization,
  birthdate,
  email,
  phone,
  addressStreet,
  addressCity,
  addressState,
  addressZip,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Container>
      <Row>
        <Controller
          control={control}
          name="firstName"
          render={() => <TitledInput disabled title="First Name" defaultValue={firstName} />}
        />
        <div style={{ width: '5vw' }} />
        <Controller
          control={control}
          name="lastName"
          render={() => <TitledInput disabled title="Last Name" defaultValue={lastName} />}
        />
      </Row>
      <Controller
        control={control}
        name="organization"
        render={({ field: { onChange } }) => (
          <>
            <TitledInput title="Organization" onChange={onChange} defaultValue={organization} />
            <Text type="danger">{errors.organization && <p>{errors.organization.message}</p>}</Text>
          </>
        )}
      />
      <Controller
        control={control}
        name="birthdate"
        render={() => <TitledInput disabled title="Birthdate" defaultValue={birthdate} />}
      />
      <Controller
        control={control}
        name="email"
        render={() => <TitledInput disabled title="Email" defaultValue={email} />}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange } }) => (
          <>
            <TitledInput title="Phone" onChange={onChange} defaultValue={phone} />
            <Text type="danger">{errors.phone && <p>{errors.phone.message}</p>}</Text>
          </>
        )}
      />
      <Controller
        control={control}
        name="preferredContactMethod"
        render={({ field: { onChange, value } }) => (
          // TODO: change this to radio options
          <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <p style={{ marginBottom: '.5vh' }}>Preferred Contact Method</p>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value="email">Email</Radio>
                <Radio value="phone">Phone</Radio>
              </Radio.Group>
            </div>
            <Text type="danger">
              {errors.preferredContactMethod && <p>{errors.preferredContactMethod.message}</p>}
            </Text>
          </>
        )}
      />
      <Controller
        control={control}
        name="addressStreet"
        render={({ field: { onChange } }) => (
          <>
            <TitledInput title="Street Address" onChange={onChange} defaultValue={addressStreet} />
            <Text type="danger">
              {errors.addressStreet && <p>{errors.addressStreet.message}</p>}
            </Text>
          </>
        )}
      />
      <Row>
        <Controller
          control={control}
          name="addressCity"
          render={({ field: { onChange } }) => (
            <>
              <TitledInput title="City" onChange={onChange} defaultValue={addressCity} />
              <Text type="danger">{errors.addressCity && <p>{errors.addressCity.message}</p>}</Text>
            </>
          )}
        />
        <div style={{ width: '3vw' }} />
        <Row>
          <Controller
            control={control}
            name="addressState"
            render={({ field: { onChange } }) => (
              <>
                <TitledInput title="State" onChange={onChange} defaultValue={addressState} />
                <Text type="danger">
                  {errors.addressState && <p>{errors.addressState.message}</p>}
                </Text>
              </>
            )}
          />
          <div style={{ width: '3vw' }} />
          <Controller
            control={control}
            name="addressZip"
            render={({ field: { onChange } }) => (
              <>
                <TitledInput title="Zip Code" onChange={onChange} defaultValue={addressZip} />
                <Text type="danger">{errors.addressZip && <p>{errors.addressZip.message}</p>}</Text>
              </>
            )}
          />
        </Row>
      </Row>
    </Container>
  );
};

VolunteerGeneralInfo.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  addressStreet: PropTypes.string.isRequired,
  addressCity: PropTypes.string.isRequired,
  addressState: PropTypes.string.isRequired,
  addressZip: PropTypes.string.isRequired,
};

export default VolunteerGeneralInfo;
