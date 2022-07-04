import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AFCBackend } from '../../util/utils';
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

const VolunteerGeneralInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [org, setOrg] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cm, setCm] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(async () => {
    const userId = 6;
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
    setCm(m0 + method.substring(1));
    setAddress(res.addressStreet);
    setCity(res.addressCity);
    setState(res.addressState);
    setZip(res.addressZip);
  }, []);

  return (
    <Container>
      <Row>
        <FixedTitledInput title="First Name" val={firstName} />
        <div style={{ width: '5vw' }} />
        <FixedTitledInput title="Last Name" val={lastName} />
      </Row>
      <FixedTitledInput title="Organization(s)" val={org} />
      <FixedTitledInput title="Date of Birth" val={dob} />
      <FixedTitledInput title="Email" val={email} />
      <FixedTitledInput title="Phone" val={phone} />
      <FixedTitledInput title="Preferred Contact Method" val={cm} />
      <FixedTitledInput title="Street Address" val={address} />
      <Row>
        <FixedTitledInput title="City" val={city} />
        <div style={{ width: '3vw' }} />
        <Row>
          <FixedTitledInput title="State" val={state} />
          <div style={{ width: '3vw' }} />
          <FixedTitledInput title="Zip Code" val={zip} />
        </Row>
      </Row>
    </Container>
  );
};

export default VolunteerGeneralInfo;
