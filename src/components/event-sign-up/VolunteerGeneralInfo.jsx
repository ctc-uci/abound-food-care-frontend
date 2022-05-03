import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FixedTitledInput from './FixedTitledInput';

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

const VolunteerGeneralInfo = ({ userData }) => {
  return (
    <Container>
      <Row>
        <FixedTitledInput title="First Name" val={userData.firstName} />
        <div style={{ width: '5vw' }} />
        <FixedTitledInput title="Last Name" val={userData.lastName} />
      </Row>
      <FixedTitledInput title="Organization(s)" val={userData.organization} />
      <FixedTitledInput title="Date of Birth" val={userData.birthdate.toLocaleDateString()} />
      <FixedTitledInput title="Email" val={userData.email} />
      <FixedTitledInput title="Phone" val={userData.phone} />
      <FixedTitledInput title="Preferred Contact Method" val={userData.preferredContactMethod} />
      <FixedTitledInput title="Street Address" val={userData.addressStreet} />
      <Row>
        <FixedTitledInput title="City" val={userData.addressCity} />
        <div style={{ width: '3vw' }} />
        <Row>
          <FixedTitledInput title="State" val={userData.addressState} />
          <div style={{ width: '3vw' }} />
          <FixedTitledInput title="Zip Code" val={userData.addressZip} />
        </Row>
      </Row>
    </Container>
  );
};

VolunteerGeneralInfo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
};

export default VolunteerGeneralInfo;
