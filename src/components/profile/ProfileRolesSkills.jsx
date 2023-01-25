import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputNumber, Radio, Form, Select, Checkbox, Row, Typography, Button } from 'antd';
import PropTypes, { instanceOf } from 'prop-types';
import {
  AFCBackend,
  languageOptions,
  buildLanguagesArray,
  userProfileTriggers,
} from '../../util/utils';
import { Cookies, withCookies, cookieKeys } from '../../util/cookie_utils';
import { AUTH_ROLES } from '../../util/auth_utils';

import styles from './ProfileComponents.module.css';

const { Option } = Select;
const { Text } = Typography;

const ProfileRolesAndSkills = ({ cookies, userId, volunteerData, setVolunteerData }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [componentSize, setComponentSize] = useState('default');

  const schema = yup.object({
    role: yup
      .string()
      .test(v => ['volunteer', 'admin'].includes(v))
      .required('Role is required'),
    foodRunsInterest: yup
      .bool()
      .required('Must indicate whether user is interested in food running events'),
    distributionInterest: yup
      .bool()
      .required('Must indicate whether user is interested in distribution events'),
    firstAidTraining: yup
      .bool()
      .required('Must indicate whether user has completed first aid training'),
    serveSafeKnowledge: yup
      .bool()
      .required('Must indicate whether user has completed ServeSafe training'),
    transportationExperience: yup
      .bool()
      .required('Must indicate whether user has transportation experience'),
    movingWarehouseExperience: yup
      .bool()
      .required('Must indicate whether user has moving or warehouse experience'),
    foodServiceIndustryKnowledge: yup
      .bool()
      .required('Must indicate whether user has food industry knowledge'),
    languages: yup.array().of(yup.string()),
    canDrive: yup.bool().required('Driving ability is a required field'),
    willingToDrive: yup.bool().required('Must indicate whether user is willing to drive'),
    vehicleType: yup.string(),
    distance: yup.number().integer().nullable(true),
  });

  const {
    clearErrors,
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange', delayError: 750 });

  const onFormLayoutChange = ({ size }) => setComponentSize(size);

  const setLanguages = languages =>
    languageOptions.forEach(lang => {
      setValue(lang, languages?.includes(lang));
    });

  const getVolunteerData = () => {
    clearErrors();
    [
      'role',
      'foodRunsInterest',
      'distributionInterest',
      'firstAidTraining',
      'serveSafeKnowledge',
      'transportationExperience',
      'movingWarehouseExperience',
      'foodServiceIndustryKnowledge',
      'weightLiftingAbility',
      'canDrive',
      'willingToDrive',
      'vehicleType',
      'distance',
    ].forEach(field => setValue(field, volunteerData[field]));
    setLanguages(volunteerData.languages);
  };

  const handleCancel = () => {
    getVolunteerData();
    setIsEditable(false);
  };

  const handleEdit = async values => {
    if (isEditable) {
      try {
        const result = await trigger([...userProfileTriggers.rolesAndSkills, 'role']);
        if (result) {
          const payload = { ...values, languages: buildLanguagesArray(values) };
          const updatedUser = await AFCBackend.put(`/users/roles-skills/${userId}`, payload);
          setVolunteerData({ ...updatedUser.data });
          toast.success('Successfully saved user information!');
          setIsEditable(!isEditable);
        }
      } catch (e) {
        toast.error(`Error saving form: ${e.response?.data ?? e.message}`);
        getVolunteerData();
      }
    } else {
      setIsEditable(!isEditable);
      getVolunteerData();
    }
  };

  useEffect(() => {
    if (!volunteerData) {
      return;
    }
    getVolunteerData();
  }, [volunteerData]);

  return (
    <div className={styles.rolesSkillsContainer}>
      <Form
        onFinish={handleSubmit(handleEdit)}
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
            onClick={() => handleEdit(getValues())}
          >
            {isEditable ? 'Save' : 'Edit'}
          </Button>
        </div>
        {cookies.get(cookieKeys.ROLE) === AUTH_ROLES.ADMIN_ROLE && (
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value, ref } }) => (
              <Form.Item label="Account Type" required>
                <Select
                  className={styles.rsSelect}
                  placeholder="Please select an account type"
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
                >
                  <Option value="volunteer">Volunteer</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </Form.Item>
            )}
          />
        )}
        <section>
          <Form.Item label="Events Interested In" required>
            <section className={styles.rsEventTagsContainer}>
              <Controller
                control={control}
                name="foodRunsInterest"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
                    >
                      Food Running
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.foodRunsInterest && (
                        <p>{errors.foodRunsInterest.message}</p>
                      )}
                    </Text>
                  </Form.Item>
                )}
              />
              <Controller
                control={control}
                name="distributionInterest"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
                    >
                      Distribution
                    </Checkbox>
                    <Text type="danger">
                      {isEditable && errors.distribution && <p>{errors.distribution.message}</p>}
                    </Text>
                  </Form.Item>
                )}
              />
            </section>
          </Form.Item>
        </section>
        <section>
          <Form.Item label="Skills & Experience">
            <section className={styles.rsTalentsContainer}>
              <Controller
                control={control}
                name="transportationExperience"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
                    >
                      Transportation
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
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
                    >
                      Moving/Warehouse
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
                name="serveSafeKnowledge"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
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
                name="foodServiceIndustryKnowledge"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
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
              <Controller
                control={control}
                name="firstAidTraining"
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Item>
                    <Checkbox
                      className={styles.rsTalentCB}
                      checked={value}
                      disabled={!isEditable}
                      {...{ onChange, ref }}
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
                        <Checkbox disabled={!isEditable} checked={value} {...{ onChange, ref }}>
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
              <Form.Item label="Weightlifting Ability" required>
                <InputNumber
                  min={0}
                  className={styles.rsWlField}
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
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
            name="canDrive"
            render={({ field: { onChange, ref, value } }) => (
              <Form.Item label="Able to Drive" required className={styles.rsDriveField}>
                <Radio.Group disabled={!isEditable} {...{ onChange, value, ref }}>
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
              <Form.Item label="Prefers to Drive" required>
                <Radio.Group disabled={!isEditable} {...{ onChange, value, ref }}>
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
                  placeholder="Please select"
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
                >
                  {[
                    'Large vehicle (Van, Truck, SUV)',
                    'Mid-Size Vehicle',
                    'Small Vehicle (Compact, Sedan)',
                  ].map(vType => (
                    <Select.Option key={vType} value={vType}>
                      {vType}
                    </Select.Option>
                  ))}
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
                <InputNumber
                  className={styles.rsDistanceField}
                  min={0}
                  disabled={!isEditable}
                  {...{ onChange, value, ref }}
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
  setVolunteerData: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(ProfileRolesAndSkills);
