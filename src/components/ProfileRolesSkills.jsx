import React, { useState } from 'react';
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
  const [isEditable] = React.useState(false);
  const [interestedRoles, setInterestedRoles] = React.useState([]);
  const [weightliftingAbility, setWeightliftingAbility] = React.useState(0);
  const [drivingDistance, setDrivingDistance] = React.useState(0);

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

  React.useEffect(() => {
    const getVolunteerData = async () => {
      let data = {};
      await axios.get(`http://localhost:3001/users/${userId}`).then(res => {
        data = res.data;
      });
      const [volunteerData] = data;

      let languageData = [];
      await axios.get(`http://localhost:3001/users/getLanguages/${userId}`).then(res => {
        // check if any languages returned
        if (res.data.length > 0) {
          languageData = res.data.map(item => item.language);
        }
      });

      form.setFieldsValue({
        accountType: volunteerData.u_type,
        interestedRoles: volunteerData.volunteering_roles_interest, // TODO: Backend currently only stores a single string
        skills: volunteerData.specializations,
        languagesSpoken: languageData,
        foodMatchTraining: volunteerData.completed_chowmatch_training.toString(),
        drive: volunteerData.can_drive.toString(),
      });
      setInterestedRoles([volunteerData.volunteering_roles_interest]);
      setWeightliftingAbility(volunteerData.weight_lifting_ability);

      // get driver data
      if (volunteerData.can_drive === true) {
        let driverData = {};
        await axios.get(`http://localhost:3001/drivers/${121}`).then(res => {
          driverData = res.data;
        });
        form.setFieldsValue({
          vehicleType: driverData.vehicle_type,
        });
        setDrivingDistance(driverData.distance);
      }
    };
    getVolunteerData();
  }, []);

  return (
    <div>
      <h1>PROFILE Roles and Skills</h1>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        validateMessages={validateMessages}
        name="roles_n_skills"
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

        <Form.Item name="interestedRoles" label="Volunteering Roles Interested In">
          {getVolunteerRoleTags(interestedRoles)}
        </Form.Item>

        <Form.Item style={inputBoxStyle} name="skills" label="Special Talents/Skills">
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
          name="weightliftingAbility"
          label="Weight Lifting Ability"
          rules={[
            {
              type: 'number',
            },
          ]}
        >
          <InputNumber
            defaultValue={weightliftingAbility}
            name="weightliftingAbility"
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

        <Form.Item name="drive" label="Able to Drive">
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
          name="drivingMiles"
          label="Distance Comfortable Driving"
          rules={[
            {
              type: 'number',
            },
          ]}
        >
          <InputNumber value={drivingDistance} name="drivingMiles" min={0} disabled={!isEditable} />
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
