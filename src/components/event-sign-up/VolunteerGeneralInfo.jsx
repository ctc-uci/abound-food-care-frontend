import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { AFCBackend } from '../../util/utils';
import TitledInput from './TitledInput';

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

const VolunteerGeneralInfo = ({ userId }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [org, setOrg] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(async () => {
    const { data: res } = await AFCBackend.get(`/users/${userId}`);

    setFirstName(res.firstName);
    setLastName(res.lastName);
    setOrg(res.organization);

    const date = res.birthdate;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    setDob(`${month}/${day}/${year}`);

    setEmail(res.email);
    setPhone(res.phone);

    const method = res.preferredContactMethod;
    const m0 = method[0].toUpperCase();
    setContactMethod(m0 + method.substring(1));

    setAddress(res.addressStreet);
    setCity(res.addressCity);
    setState(res.addressState);
    setZip(res.addressZip);
  }, []);

  return (
    <Container>
      <Row>
        <TitledInput disabled title="First Name" val={firstName} />
        <div style={{ width: '5vw' }} />
        <TitledInput disabled title="Last Name" val={lastName} />
      </Row>
      <TitledInput title="Organization" val={org} onChange={setOrg} />
      <TitledInput disabled title="Date of Birth" val={dob} />
      <TitledInput disabled title="Email" val={email} />
      <TitledInput title="Phone" val={phone} onChange={setPhone} />
      <TitledInput
        title="Preferred Contact Method"
        val={contactMethod}
        onChange={setContactMethod}
      />
      <TitledInput title="Street Address" val={address} onChange={setAddress} />
      <Row>
        <TitledInput title="City" val={city} onChange={setCity} />
        <div style={{ width: '3vw' }} />
        <Row>
          <TitledInput title="State" val={state} onChange={setState} />
          <div style={{ width: '3vw' }} />
          <TitledInput title="Zip Code" val={zip} onChange={setZip} />
        </Row>
      </Row>
    </Container>
  );
};

VolunteerGeneralInfo.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VolunteerGeneralInfo;
