import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Radio, Form, Select, Checkbox, Row, Tag, Typography, Button } from 'antd';
import PropTypes from 'prop-types';
import { AFCBackend, languageOptions, buildLanguagesArray } from '../../util/utils';

import styles from './ProfileComponents.module.css';

const { Option } = Select;
const { Text } = Typography;
const { CheckableTag } = Tag;

const ProfileRolesAndSkills = ({ userId, volunteerData }) => {
  const [componentSize, setComponentSize] = useState('default');
  const [isEditable, setIsEditable] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [defaultLanguages, setDefaultLanguages] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '30%',
  };

  const setLanguages = languages => {
    languageOptions.forEach(lang => {
      setValue(lang, languages?.includes(lang));
    });
  };

  const getDriverData = () => {
    setDefaultValues({
      role: volunteerData.role,
      foodRunning: volunteerData.foodRunsInterest,
      distribution: volunteerData.distributionInterest,
      firstAidTraining: volunteerData.firstAidTraining,
      serveSafeKnowledge: volunteerData.serveSafeKnowledge,
      transportationExperience: volunteerData.transportationExperience,
      movingWarehouseExperience: volunteerData.movingWarehouseExperience,
      foodServiceIndustryKnowledge: volunteerData.foodServiceIndustryKnowledge,
      weightLiftingAbility: volunteerData.weightLiftingAbility,
      completedChowmatch: volunteerData.completedChowmatchTraining,
      canDrive: volunteerData.canDrive,
      willingToDrive: volunteerData.willingToDrive,
      vehicleType: volunteerData.vehicleType,
      distance: volunteerData.distance,
    });
    [
      'role',
      'foodRunning',
      'distribution',
      'firstAidTraining',
      'serveSafeKnowledge',
      'transportationExperience',
      'movingWarehouseExperience',
      'foodServiceIndustryKnowledge',
      'weightLiftingAbility',
      'completedChowmatch',
      'canDrive',
      'willingToDrive',
      'vehicleType',
      'distance',
    ].forEach(field => setValue(field, defaultValues[field]));
    setDefaultLanguages(volunteerData.languages);
    setLanguages(volunteerData.languages);
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setIsEditable(false);
    [
      'role',
      'foodRunning',
      'distribution',
      'firstAidTraining',
      'serveSafeKnowledge',
      'transportationExperience',
      'movingWarehouseExperience',
      'foodServiceIndustryKnowledge',
      'weightLiftingAbility',
      'completedChowmatch',
      'canDrive',
      'willingToDrive',
      'vehicleType',
      'distance',
    ].forEach(field => setValue(field, defaultValues[field]));
    setLanguages(defaultLanguages);
  };

  const saveVolunteerData = async values => {
    const languages = buildLanguagesArray(values);
    try {
      const payload = {
        role: values.role,
        foodRunsInterest: values.foodRunning,
        distributionInterest: values.distribution,
        firstAidTraining: values.firstAidTraining,
        serveSafeKnowledge: values.serveSafeKnowledge,
        transportationExperience: values.transportationExperience,
        movingWarehouseExperience: values.movingWarehouseExperience,
        foodServiceIndustryKnowledge: values.foodServiceIndustryKnowledge,
        languages,
        weightLiftingAbility: values.weightLiftingAbility,
        completedChowmatchTraining: values.completedChowmatch,
        canDrive: values.canDrive,
        willingToDrive: values.willingToDrive,
        vehicleType: values.vehicleType,
        distance: values.distance,
      };
      await AFCBackend.put(`/users/roles-skills/${userId}`, payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <div className={styles.rolesSkillsContainer}>
      <Form
        onFinish={handleSubmit(saveVolunteerData)}
        layout="vertical"
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <div className={styles.btnsContainer}>
          {isEditable && (
            <Button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button
            className={`${styles.editSaveBtn} ${!isEditable && styles.editBtnInactive}`}
            htmlType="submit"
            onClick={handleEdit}
          >
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </div>
        {/* TODO This field only shows based on cookies admin role */}
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="Account Type">
              <Select
                onChange={onChange}
                value={value}
                ref={ref}
                style={inputBoxStyle}
                placeholder="Please select an account type"
                disabled={!isEditable}
              >
                <Option value="volunteer">Volunteer</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
          )}
        />
        <section>
          <Form.Item label="Events Interested In" className={styles.rsEventTagsContainer}>
            <Controller
              control={control}
              name="foodRunning"
              render={({ field: { onChange, value } }) => (
                <Form.Item>
                  {isEditable && (
                    <CheckableTag onChange={onChange} checked={value}>
                      Food Running
                    </CheckableTag>
                  )}
                  {!isEditable && getValues('foodRunning') && (
                    <Tag
                      onChange={onChange}
                      checked={value}
                      color="#115740"
                      className={styles.rsEventTag}
                    >
                      Food Running
                    </Tag>
                  )}
                  <Text type="danger">
                    {isEditable && errors.foodRunning && <p>{errors.foodRunning.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
            <Controller
              control={control}
              name="distribution"
              render={({ field: { onChange, value } }) => (
                <Form.Item>
                  {isEditable && (
                    <CheckableTag onChange={onChange} checked={value}>
                      Distribution
                    </CheckableTag>
                  )}
                  {!isEditable && getValues('distribution') && (
                    <Tag
                      onChange={onChange}
                      checked={value}
                      color="#115740"
                      className={styles.rsEventTag}
                    >
                      Distribution
                    </Tag>
                  )}
                  <Text type="danger">
                    {isEditable && errors.distribution && <p>{errors.distribution.message}</p>}
                  </Text>
                </Form.Item>
              )}
            />
          </Form.Item>
        </section>
        <section>
          <Form.Item label="Special Talents/Skills">
            <section className={styles.rsTalentsContainer}>
              <Controller
                control={control}
                name="firstAidTraining"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      onChange={onChange}
                      ref={ref}
                      checked={value}
                      disabled={!isEditable}
                    >
                      First Aid Training
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.firstAidTraining && (
                        <p>{errors.firstAidTraining.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="serveSafeKnowledge"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      onChange={onChange}
                      ref={ref}
                      checked={value}
                      disabled={!isEditable}
                    >
                      Serve Safe Knowledge
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.serveSafeKnowledge && (
                        <p>{errors.serveSafeKnowledge.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="transportationExperience"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      onChange={onChange}
                      ref={ref}
                      checked={value}
                      disabled={!isEditable}
                    >
                      Transportation Experience
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.transportationExperience && (
                        <p>{errors.transportationExperience.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="movingWarehouseExperience"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      onChange={onChange}
                      ref={ref}
                      checked={value}
                      disabled={!isEditable}
                    >
                      Moving/Warehouse Experience
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.movingWarehouseExperience && (
                        <p>{errors.movingWarehouseExperience.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="foodServiceIndustryKnowledge"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      onChange={onChange}
                      ref={ref}
                      checked={value}
                      disabled={!isEditable}
                    >
                      Food Service Industry Knowledge
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.foodServiceIndustryKnowledge && (
                        <p>{errors.foodServiceIndustryKnowledge.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
            </section>
          </Form.Item>
        </section>
        <section>
          <Form.Item label="Languages Spoken">
            <Row>
              <div className={styles.rsLangOptionsContainer}>
                {languageOptions.map(lang => (
                  <Controller
                    control={control}
                    name={lang}
                    key={lang}
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Item className={styles.rsLangOption}>
                        <Checkbox
                          onChange={onChange}
                          ref={ref}
                          checked={value}
                          disabled={!isEditable}
                        >
                          {lang[0].toUpperCase() + lang.substring(1)}
                        </Checkbox>
                      </Form.Item>
                    )}
                  />
                ))}
              </div>
            </Row>
          </Form.Item>
        </section>
        <Row>
          <Controller
            control={control}
            name="weightLiftingAbility"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Weightlifting Ability">
                <Input
                  onChange={onChange}
                  className={styles.rsWlField}
                  value={value}
                  ref={ref}
                  style={inputBoxStyle}
                  disabled={!isEditable}
                />
                <span className="ant-form-text"> pounds</span>
                <Text type="danger">
                  {isEditable && errors.weightLiftingAbility && (
                    <p>{errors.weightLiftingAbility.message}</p>
                  )}
                </Text>
              </Form.Item>
            )}
          />
        </Row>
        <Row>
          <Controller
            control={control}
            name="completedChowmatch"
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Have you completed the food match training on Chowmatch?">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Text type="danger">
                  {isEditable && errors.completedChowmatch && (
                    <p>{errors.completedChowmatch.message}</p>
                  )}
                </Text>
              </Form.Item>
            )}
          />
        </Row>
        <Row>
          <Controller
            control={control}
            name="canDrive"
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Able to Drive">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Text type="danger">
                  {isEditable && errors.canDrive && <p>{errors.canDrive.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="willingToDrive"
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Prefers to Drive">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Text type="danger">
                  {isEditable && errors.willingToDrive && <p>{errors.willingToDrive.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
        </Row>
        <Row>
          <Controller
            control={control}
            name="vehicleType"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Type of Vehicle">
                <Select
                  placeholder="Please select a vehicle type..."
                  onChange={onChange}
                  value={value}
                  ref={ref}
                  disabled={!isEditable}
                >
                  <Option value="Large Vehicle (Van, Truck, SUV)">
                    Large Vehicle (Van, Truck, SUV)
                  </Option>
                  <Option value="Mid-Size Vehicle">Mid-Size Vehicle</Option>
                  <Option value="Small Vehicle (Compact, Sedan)">
                    Small Vehicle (Compact, Sedan)
                  </Option>
                </Select>
                <Text type="danger">
                  {isEditable && errors.vehicleType && <p>{errors.vehicleType.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
        </Row>
        <Row>
          <Controller
            control={control}
            name="distance"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Distance Comfortable Driving">
                <Input
                  className={styles.rsDistanceField}
                  placeholder="Ex. 0, 10, 15, 20"
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  disabled={!isEditable}
                />
                <span className="ant-form-text"> miles</span>
                <Text type="danger">
                  {isEditable && errors.distance && <p>{errors.distance.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
        </Row>
      </Form>
    </div>
  );
};

ProfileRolesAndSkills.propTypes = {
  userId: PropTypes.string.isRequired,
  volunteerData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProfileRolesAndSkills;
