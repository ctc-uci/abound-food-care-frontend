import React from 'react';
import styled from 'styled-components';
import { Checkbox, Input, Radio, Typography, Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { PropTypes } from 'prop-types';

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
    label: 'French',
    value: 'french',
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
    label: 'Vietnamese',
    value: 'vietnamese',
  },
];

const { Text } = Typography;

const { Option } = Select;

const RolesAndSkills = ({
  roles,
  skills,
  languages,
  weightLiftingAbility,
  vehicleType,
  distance,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Container>
      <Controller
        control={control}
        name="roles"
        render={({ field: { onChange, ref } }) => (
          <Field>
            <p>Volunteering Roles Interested In</p>
            <Checkbox.Group options={allRoles} onChange={onChange} ref={ref} defaultValue={roles} />
            <Text type="danger">{errors.roles && <p>{errors.roles.message}</p>}</Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="skills"
        render={({ field: { onChange, ref } }) => (
          <Field>
            <p>Special Talents/Skills</p>
            <Checkbox.Group
              options={allSkills}
              onChange={onChange}
              ref={ref}
              defaultValue={skills}
            />
            <Text type="danger">{errors.skills && <p>{errors.skills.message}</p>}</Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="languages"
        render={({ field: { onChange, ref } }) => (
          <Field>
            <p>Languages Spoken</p>
            <Checkbox.Group
              options={allLanguages}
              onChange={onChange}
              ref={ref}
              defaultValue={languages}
            />
            <Text type="danger">{errors.languages && <p>{errors.languages.message}</p>}</Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="weightLiftingAbility"
        render={({ field: { onChange, ref } }) => (
          <Field>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ marginBottom: '.5vh' }}>Weight Lifting Ability</p>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  style={{ color: 'black', width: '5vw', marginRight: '1vw' }}
                  ref={ref}
                  onChange={onChange}
                  defaultValue={weightLiftingAbility}
                />
                <p style={{ padding: 0, margin: 0 }}>pounds</p>
              </Row>
            </div>
            <Text type="danger">
              {errors.weightLiftingAbility && <p>{errors.weightLiftingAbility.message}</p>}
            </Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="completedChowmatchTraining"
        render={({ field: { onChange, ref, value } }) => (
          <Field>
            <p style={{ marginBottom: '.5vh' }}>
              Have you completed the food match training on Chowmatch?
            </p>
            <Radio.Group onChange={onChange} ref={ref} value={`${value}`}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">
              {errors.completedChowmatchTraining && (
                <p>{errors.completedChowmatchTraining.message}</p>
              )}
            </Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="canDrive"
        render={({ field: { onChange, ref, value } }) => (
          <Field>
            <p style={{ marginBottom: '.5vh' }}>Are you willing to drive?</p>
            <Radio.Group onChange={onChange} ref={ref} value={`${value}`}>
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </Radio.Group>
            <Text type="danger">{errors.canDrive && <p>{errors.canDrive.message}</p>}</Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="vehicleType"
        render={({ field: { onChange, ref } }) => (
          <Field>
            <p style={{ marginBottom: '.5vh' }}>Are you willing to drive?</p>
            <Select
              placeholder="Please select"
              onChange={onChange}
              ref={ref}
              style={{ maxWidth: '20%' }}
              defaultValue={vehicleType}
            >
              <Option value="Large Vehicle (Van, Truck, SUV)">
                Large Vehicle (Van, Truck, SUV)
              </Option>
              <Option value="Mid-Size Vehicle">Mid-Size Vehicle</Option>
              <Option value="Small Vehicle (Compact, Sedan)">Small Vehicle (Compact, Sedan)</Option>
            </Select>
            <Text type="danger">{errors.vehicleType && <p>{errors.vehicleType.message}</p>}</Text>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="distance"
        render={({ field: { onChange, ref } }) => (
          <Field>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p style={{ marginBottom: '.5vh' }}>Distance Comfortable Driving</p>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  style={{ color: 'black', width: '5vw', marginRight: '1vw' }}
                  ref={ref}
                  onChange={onChange}
                  defaultValue={distance}
                />
                <p style={{ padding: 0, margin: 0 }}>miles</p>
              </Row>
            </div>
            <Text type="danger">{errors.distance && <p>{errors.distance.message}</p>}</Text>
          </Field>
        )}
      />
    </Container>
  );
};

RolesAndSkills.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  weightLiftingAbility: PropTypes.number.isRequired,
  vehicleType: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
};

export default RolesAndSkills;
