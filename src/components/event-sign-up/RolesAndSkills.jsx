import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox, Input, Radio } from 'antd';
import { PropTypes } from 'prop-types';
import TitledInput from './TitledInput';
import { AFCBackend } from '../../util/utils';

const Container = styled.div`
  padding: 2%;
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const allRoles = [
  {
    label: 'Food Runner',
    value: 'foodRunsInterest',
  },
  {
    label: 'Distribution Worker',
    value: 'distributionInterest',
  },
];

const allSkills = [
  {
    label: 'First Aid Training',
    value: 'firstAidTraining',
  },
  {
    label: 'Serve Safe Knowledge',
    value: 'serveSafeKnowledge',
  },
  {
    label: 'Transportation Experience',
    value: 'transportationExperience',
  },
  {
    label: 'Moving / Warehouse Experience',
    value: 'movingWarehouseExperience',
  },
  {
    label: 'Food Service Industry Knowledge',
    value: 'foodServiceIndustryKnowledge',
  },
];

const allLanguages = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Spanish',
    value: 'spanish',
  },
  {
    label: 'Chinese',
    value: 'chinese',
  },
  {
    label: 'Tagalog',
    value: 'tagalog',
  },
  {
    label: 'Vietnamese',
    value: 'vietnamese',
  },
  {
    label: 'French',
    value: 'french',
  },
  {
    label: 'Korean',
    value: 'korean',
  },
  {
    label: 'Arabic',
    value: 'arabic',
  },
  {
    label: 'German',
    value: 'german',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const RolesAndSkills = ({ userId }) => {
  const [loaded, setLoaded] = useState(false);
  const [roles, setRoles] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');
  const [weightLift, setWeightLift] = useState('');
  const [training, setTraining] = useState(false);
  const [driving, setDriving] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(async () => {
    const { data: res } = await AFCBackend.get(`/users/${userId}`);
    const newVals = [];

    Object.keys(res).forEach(key => {
      if (res[key]) newVals.push(key);
    });
    res.languages.forEach(lang => {
      newVals.push(lang);
    });
    setRoles(newVals);
    setSkills(newVals);
    setLanguages(newVals);
    setWeightLift(res.weightLiftingAbility);
    setTraining(res.completedChowmatchTraining);
    setDriving(res.canDrive);
    setVehicle(res.vehicleType);
    setDistance(res.distance);
    setLoaded(true);
  }, []);

  const DoubleTitleField = (title1, val, title2) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ marginBottom: '.5vh' }}>{title1}</p>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Input style={{ color: 'black', width: '5vw', marginRight: '1vw' }} defaultValue={val} />
          <p style={{ padding: 0, margin: 0 }}>{title2}</p>
        </Row>
      </div>
    );
  };

  const YesNoField = (title, val) => {
    return (
      <div>
        <p style={{ marginBottom: '.5vh' }}>{title}</p>
        <Radio defaultChecked={val}>Yes</Radio>
        <Radio defaultChecked={!val}>No</Radio>
      </div>
    );
  };

  return (
    loaded && (
      <Container>
        <Field>
          <p>Volunteering Roles Interested In</p>
          <Checkbox.Group options={allRoles} defaultValue={roles} />
        </Field>
        <Field>
          <p>Special Talents/Skills</p>
          <Checkbox.Group options={allSkills} defaultValue={skills} />
        </Field>
        <Field>
          <p>Languages Spoken</p>
          <Checkbox.Group options={allLanguages} defaultValue={languages} />
        </Field>
        {DoubleTitleField('Weight Lifting Ability', weightLift, 'pounds')}
        {YesNoField('Have you completed the food match training on Chowmatch?', training)}
        {YesNoField('Able to Drive', driving)}
        <div style={{ width: '10%' }}>
          <TitledInput title="Type of Vehicle" val={vehicle} />
        </div>
        {DoubleTitleField('Distance Comfortable Driving', distance, 'miles')}
      </Container>
    )
  );
};

RolesAndSkills.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default RolesAndSkills;
