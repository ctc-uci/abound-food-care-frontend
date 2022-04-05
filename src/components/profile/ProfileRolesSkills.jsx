import React, { useState, useEffect } from 'react';
import { Input, Radio, Form, Select, InputNumber, Col, Checkbox, Row, Tag } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const ProfileRolesAndSkills = ({ userId }) => {
  const [form] = Form.useForm();

  const [componentSize, setComponentSize] = useState('default');
  const [isEditable] = useState(false);
  const [interestedRoles, setInterestedRoles] = useState([]);
  const [weightliftingAbility, setWeightliftingAbility] = useState(0);
  const [drivingDistance, setDrivingDistance] = useState(0);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  // Pass in array of roles
  const getVolunteerRoleTags = roles => {
    return roles.map(role => {
      return <Tag key={role}>{role}</Tag>;
    });
  };

  const getDriverData = async () => {
    try {
      const { data: volunteerData } = await axios.get(`http://localhost:3001/users/${userId}`);

      const volunteerSkills = [];
      if (volunteerData.firstAidTraining) {
        volunteerSkills.push('First Aid Training');
      }
      if (volunteerData.serveSafeKnowledge) {
        volunteerSkills.push('ServeSafe Knowledge');
      }
      if (volunteerData.transportationExperience) {
        volunteerSkills.push('Transportation Experience');
      }
      if (volunteerData.movingWarehouseExperience) {
        volunteerSkills.push('Moving / Warehouse Experience');
      }
      if (volunteerData.foodServiceIndustryKnowledge) {
        volunteerSkills.push('Food Service Industry Knowledge');
      }

      form.setFieldsValue({
        accountType: volunteerData.role,
        skills: volunteerSkills.join(', '),
        foodMatchTraining: volunteerData.completedChowmatchTraining.toString(),
        canDrive: volunteerData.canDrive.toString(),
      });

      if (volunteerData.languages.length > 0) {
        form.setFieldsValue({
          languagesSpoken: volunteerData.languages,
        });
      }

      const volunteerRoles = [];
      if (volunteerData.foodRunsInterest) {
        volunteerRoles.push('Food Runner');
      }
      if (volunteerData.distributionInterest) {
        volunteerRoles.push('Distribution Worker');
      }
      setInterestedRoles(volunteerRoles);

      setWeightliftingAbility(volunteerData.weightLiftingAbility);

      if (volunteerData.canDrive === true && volunteerData.willingToDrive === true) {
        form.setFieldsValue({
          vehicleType: volunteerData.vehicleType,
        });
        setDrivingDistance(volunteerData.distance);
      }
    } catch (e) {
      console.log('Error while getting volunteer data!');
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <div>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
        form={form}
      >
        <Form.Item name="accountType" label="Account Type">
          <Select
            style={inputBoxStyle}
            placeholder="Please select an account type"
            disabled={!isEditable}
          >
            <Option value="volunteer">Volunteer</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Volunteering Roles Interested In">
          {getVolunteerRoleTags(interestedRoles)}
        </Form.Item>

        <Form.Item name="skills" style={inputBoxStyle} label="Special Talents/Skills">
          <Input.TextArea placeholder="Please enter your work goals" disabled={!isEditable} />
        </Form.Item>

        <Form.Item name="languagesSpoken" label="Languages Spoken">
          <Checkbox.Group style={{ width: '70%' }} disabled={!isEditable}>
            <Row>
              <Col span={4}>
                <Checkbox
                  value="english"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  English
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="spanish"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Spanish
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="chinese"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Chinese
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="tagalog"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Tagalog
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="vietnamese"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Vietnamese
                </Checkbox>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <Checkbox
                  value="french"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  French
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="korean"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Korean
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="arabic"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Arabic
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="german"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  German
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="other"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  Other
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          label="Weight Lifting Ability"
          rules={[
            {
              type: 'number',
            },
          ]}
        >
          <InputNumber
            defaultValue={weightliftingAbility}
            disabled={!isEditable}
            value={weightliftingAbility}
          />
          <span className="ant-form-text"> pounds</span>
        </Form.Item>

        <Form.Item
          name="foodMatchTraining"
          label="Have you completed the food match training on Chowmatch?"
        >
          <Radio.Group disabled={!isEditable}>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
            <Radio value="in progress">In progress</Radio>
            <Radio value="no account">I do not have an account</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="canDrive" label="Able to Drive">
          <Radio.Group disabled={!isEditable}>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="vehicleType" label="Type of Vehicle">
          <Select
            style={inputBoxStyle}
            placeholder="Please select a vehicle type"
            disabled={!isEditable}
          >
            <Option value="van">Van</Option>
            <Option value="truck">Truck</Option>
            <Option value="suv">SUV</Option>
            <Option value="mid-size">Mid-Size</Option>
            <Option value="compact">Compact</Option>
            <Option value="sedan">Sedan</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Distance Comfortable Driving"
          rules={[
            {
              type: 'number',
            },
          ]}
        >
          <InputNumber value={drivingDistance} min={0} disabled={!isEditable} />
          <span className="ant-form-text"> miles</span>
        </Form.Item>
      </Form>
    </div>
  );
};

ProfileRolesAndSkills.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ProfileRolesAndSkills;
