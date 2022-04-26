import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Radio, Form, Select, Checkbox, Row, Tag, Typography, Space, Button } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const { Option } = Select;
const { Text } = Typography;
const { CheckableTag } = Tag;

const ProfileRolesAndSkills = ({ userId }) => {
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
    for (let i = 0; i < languages.length; i += 1) {
      if (languages.includes('english')) {
        setValue('english', true);
      } else {
        setValue('english', false);
      }
      if (languages.includes('spanish')) {
        setValue('spanish', true);
      } else {
        setValue('spanish', false);
      }
      if (languages.includes('french')) {
        setValue('french', true);
      } else {
        setValue('french', false);
      }
      if (languages.includes('chinese')) {
        setValue('chinese', true);
      } else {
        setValue('chinese', false);
      }
      if (languages.includes('tagalog')) {
        setValue('tagalog', true);
      } else {
        setValue('tagalog', false);
      }
      if (languages.includes('korean')) {
        setValue('korean', true);
      } else {
        setValue('korean', false);
      }
      if (languages.includes('arabic')) {
        setValue('arabic', true);
      } else {
        setValue('arabic', false);
      }
      if (languages.includes('german')) {
        setValue('german', true);
      } else {
        setValue('german', false);
      }
      if (languages.includes('vietnamese')) {
        setValue('vietnamese', true);
      } else {
        setValue('vietnamese', false);
      }
    }
  };

  const getDriverData = async () => {
    try {
      const { data: volunteerData } = await axios.get(`http://localhost:3001/users/${userId}`);
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
      setValue('role', volunteerData.role);
      setValue('foodRunning', volunteerData.foodRunsInterest);
      setValue('distribution', volunteerData.distributionInterest);
      setValue('firstAidTraining', volunteerData.firstAidTraining);
      setValue('serveSafeKnowledge', volunteerData.serveSafeKnowledge);
      setValue('transportationExperience', volunteerData.transportationExperience);
      setValue('movingWarehouseExperience', volunteerData.movingWarehouseExperience);
      setValue('foodServiceIndustryKnowledge', volunteerData.foodServiceIndustryKnowledge);
      setLanguages(volunteerData.languages);
      setDefaultLanguages(volunteerData.languages);
      setValue('weightLiftingAbility', volunteerData.weightLiftingAbility);
      setValue('completedChowmatch', volunteerData.completedChowmatchTraining);
      setValue('canDrive', volunteerData.canDrive);
      setValue('willingToDrive', volunteerData.willingToDrive);
      setValue('vehicleType', volunteerData.vehicleType);
      setValue('distance', volunteerData.distance);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setValue('role', defaultValues.role);
    setValue('foodRunning', defaultValues.foodRunsInterest);
    setValue('distribution', defaultValues.distributionInterest);
    setValue('firstAidTraining', defaultValues.firstAidTraining);
    setValue('serveSafeKnowledge', defaultValues.serveSafeKnowledge);
    setValue('transportationExperience', defaultValues.transportationExperience);
    setValue('movingWarehouseExperience', defaultValues.movingWarehouseExperience);
    setValue('foodServiceIndustryKnowledge', defaultValues.foodServiceIndustryKnowledge);
    setLanguages(defaultLanguages);
    setValue('weightLiftingAbility', defaultValues.weightLiftingAbility);
    setValue('completedChowmatch', defaultValues.completedChowmatch);
    setValue('canDrive', defaultValues.canDrive);
    setValue('willingToDrive', defaultValues.willingToDrive);
    setValue('vehicleType', defaultValues.vehicleType);
    setValue('distance', defaultValues.distance);
  };

  const buildLanguagesArray = values => {
    const languages = [];
    if (values.english) {
      languages.push('english');
    }
    if (values.spanish) {
      languages.push('spanish');
    }
    if (values.french) {
      languages.push('french');
    }
    if (values.chinese) {
      languages.push('chinese');
    }
    if (values.tagalog) {
      languages.push('tagalog');
    }
    if (values.korean) {
      languages.push('korean');
    }
    if (values.arabic) {
      languages.push('arabic');
    }
    if (values.german) {
      languages.push('german');
    }
    if (values.vietnamese) {
      languages.push('vietnamese');
    }

    return languages;
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
      await axios.put(`http://localhost:3001/users/roles-skills/${userId}`, payload);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <div>
      <Form
        onFinish={handleSubmit(saveVolunteerData)}
        layout="vertical"
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <div style={{ float: 'right' }}>
          {isEditable && (
            <Button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button className="edit-save-btn" htmlType="submit" onClick={handleEdit}>
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </div>
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
          <Form.Item label="Events Interested In">
            <Space>
              <Controller
                control={control}
                name="foodRunning"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    {isEditable && (
                      <CheckableTag onChange={onChange} checked={value}>
                        Food Running
                      </CheckableTag>
                    )}
                    {!isEditable && getValues('foodRunning') && (
                      <Tag onChange={onChange} checked={value}>
                        Food Running
                      </Tag>
                    )}
                    <Text type="danger">
                      {errors.foodRunning && <p>{errors.foodRunning.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="distribution"
                // eslint-disable-next-line no-unused-vars
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    {isEditable && (
                      <CheckableTag onChange={onChange} checked={value}>
                        Distribution
                      </CheckableTag>
                    )}
                    {!isEditable && getValues('distribution') && (
                      <Tag onChange={onChange} checked={value}>
                        Distribution
                      </Tag>
                    )}
                    <Text type="danger">
                      {errors.distribution && <p>{errors.distribution.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Space>
          </Form.Item>
        </section>
        <section>
          <Form.Item label="Special Talents/Skills">
            <Row>
              <Controller
                control={control}
                name="firstAidTraining"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      First Aid Training
                    </Checkbox>
                    <Text type="danger">
                      {errors.firstAidTraining && <p>{errors.firstAidTraining.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="serveSafeKnowledge"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Serve Safe Knowledge
                    </Checkbox>
                    <Text type="danger">
                      {errors.serveSafeKnowledge && <p>{errors.serveSafeKnowledge.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="transportationExperience"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Transportation Experience
                    </Checkbox>
                    <Text type="danger">
                      {errors.transportationExperience && (
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
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Moving/Warehouse Experience
                    </Checkbox>
                    <Text type="danger">
                      {errors.movingWarehouseExperience && (
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
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Food Service Industry Knowledge
                    </Checkbox>
                    <Text type="danger">
                      {errors.foodServiceIndustryKnowledge && (
                        <p>{errors.foodServiceIndustryKnowledge.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
            </Row>
          </Form.Item>
        </section>
        <section>
          <Form.Item label="Languages Spoken">
            <Row>
              <Controller
                control={control}
                name="english"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      English
                    </Checkbox>
                    <Text type="danger">{errors.english && <p>{errors.english.message}</p>}</Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="spanish"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Spanish
                    </Checkbox>
                    <Text type="danger">{errors.spanish && <p>{errors.spanish.message}</p>}</Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="french"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      French
                    </Checkbox>
                    {errors.french && <p>{errors.french.message}</p>}
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="chinese"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Chinese
                    </Checkbox>
                    <Text type="danger">{errors.chinese && <p>{errors.chinese.message}</p>}</Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="tagalog"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Tagalog
                    </Checkbox>
                    <Text type="danger" />
                    {errors.tagalog && <p>{errors.tagalog.message}</p>}
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="korean"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Korean
                    </Checkbox>
                    <Text type="danger">{errors.korean && <p>{errors.korean.message}</p>}</Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="arabic"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Arabic
                    </Checkbox>
                    <Text type="danger">{errors.arabic && <p>{errors.arabic.message}</p>}</Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="german"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      German
                    </Checkbox>
                    <Text type="danger">{errors.german && <p>{errors.german.message}</p>}</Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="vietnamese"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox onChange={onChange} ref={ref} checked={value} disabled={!isEditable}>
                      Vietnamese
                    </Checkbox>
                    <Text type="danger">
                      {errors.vietnamese && <p>{errors.vietnamese.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </Row>
          </Form.Item>
        </section>
        <Controller
          control={control}
          name="weightLiftingAbility"
          render={({ field: { onChange, value, ref } }) => (
            <Form.Item label="Weightlifting Ability">
              <Input
                onChange={onChange}
                value={value}
                ref={ref}
                style={inputBoxStyle}
                disabled={!isEditable}
              />{' '}
              <span className="ant-form-text"> pounds</span>
              <Text type="danger">
                {errors.weightLiftingAbility && <p>{errors.weightLiftingAbility.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
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
                {errors.completedChowmatch && <p>{errors.completedChowmatch.message}</p>}
              </Text>
            </Form.Item>
          )}
        />
        <Space>
          <Controller
            control={control}
            name="canDrive"
            style={{ margin: '10%' }}
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Able to Drive">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Text type="danger">{errors.canDrive && <p>{errors.canDrive.message}</p>}</Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="willingToDrive"
            style={{ margin: '10%' }}
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Prefers to Drvie">
                <Radio.Group onChange={onChange} ref={ref} value={value} disabled={!isEditable}>
                  <Radio value>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
                <Text type="danger">
                  {errors.willingToDrive && <p>{errors.willingToDrive.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
        </Space>
        <br />
        <Space>
          <Controller
            control={control}
            name="vehicleType"
            style={{ margin: '10%' }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Type of Vehicle">
                <Select
                  placeholder="Please select"
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
                  {errors.vehicleType && <p>{errors.vehicleType.message}</p>}
                </Text>
              </Form.Item>
            )}
          />
          <Controller
            control={control}
            name="distance"
            style={{ margin: '10%' }}
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Distance Comfortable Driving">
                <Input
                  placeholder="Ex. 0, 10, 15, 20"
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  style={inputBoxStyle}
                  disabled={!isEditable}
                />
                <span className="ant-form-text"> miles</span>
                <Text type="danger">{errors.distance && <p>{errors.distance.message}</p>}</Text>
              </Form.Item>
            )}
          />
        </Space>
      </Form>
    </div>
  );
};

ProfileRolesAndSkills.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileRolesAndSkills;
