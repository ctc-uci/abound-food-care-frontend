import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Checkbox, Input, Radio } from 'antd';
import FixedTitledInput from './FixedTitledInput';

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

const RolesAndSkills = ({ userData }) => {
  const DoubleTitleField = (title1, val, title2) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ marginBottom: '.5vh' }}>{title1}</p>
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            disabled
            style={{ color: 'black', width: '5vw', marginRight: '1vw' }}
            defaultValue={val}
          />
          <p style={{ padding: 0, margin: 0 }}>{title2}</p>
        </Row>
      </div>
    );
  };

  const YesNoField = (title, val) => {
    return (
      <div>
        <p style={{ marginBottom: '.5vh' }}>{title}</p>
        <Radio disabled defaultChecked={val}>
          Yes
        </Radio>
        <Radio disabled defaultChecked={!val}>
          No
        </Radio>
      </div>
    );
  };

  const checkBoxValues = [];
  Object.keys(userData).forEach(key => {
    if (key === 'languages') {
      userData[key].forEach(language => checkBoxValues.push(language));
    } else if (userData[key]) {
      checkBoxValues.push(key);
    }
  });

  return (
    <Container>
      <Field>
        <p>Volunteering Roles Interested In</p>
        <Checkbox.Group disabled options={allRoles} defaultValue={checkBoxValues} />
      </Field>
      <Field>
        <p>Special Talents/ Skills</p>
        <Checkbox.Group disabled options={allSkills} defaultValue={checkBoxValues} />
      </Field>
      <Field>
        <p>Languages Spoken</p>
        <Checkbox.Group disabled options={allLanguages} defaultValue={checkBoxValues} />
      </Field>
      {DoubleTitleField('Weight Lifting Ability', userData.weightLift, 'pounds')}
      {YesNoField(
        'Have you completed the food match training on Chowmatch?',
        userData.completedChowmatchTraining,
      )}
      {YesNoField('Able to Drive', userData.canDrive)}
      <div style={{ width: '10%' }}>
        <FixedTitledInput title="Type of Vehicle" val={userData.vehicleType} />
      </div>
      {DoubleTitleField('Distance Comfortable Driving', userData.distance, 'miles')}
    </Container>
  );
};

RolesAndSkills.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
};

export default RolesAndSkills;
