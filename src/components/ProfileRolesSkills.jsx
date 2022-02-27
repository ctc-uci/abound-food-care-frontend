import React, { useState } from 'react';
import { Input, Radio, Form, Select, InputNumber, Col, Checkbox, Row, Tag } from 'antd';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const ProfileRolesAndSkills = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const inputBoxStyle = {
    width: '50%',
  };

  return (
    <div>
      <h1>PROFILE Roles and Skills (title for now)</h1>
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        wrapperCol={{ span: 20 }}
        validateMessages={validateMessages}
        name="roles_n_skills"
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item name="accountType" label="Account Type">
          <Select style={inputBoxStyle} placeholder="Please select an account type" disabled>
            <Option value="volunteer">Volunteer</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item name="interestedRoles" label="Volunteering Roles Interested In">
          <Tag>Food Runner</Tag>
          <Tag>Distribution Work</Tag>
        </Form.Item>

        <Form.Item style={inputBoxStyle} name="skills" label="Special Talents/Skills">
          <Input.TextArea placeholder="Please enter your work goals" disabled />
        </Form.Item>

        <Form.Item name="languagesSpoken" label="Languages Spoken">
          <Checkbox.Group style={{ width: '70%' }} disabled>
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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <InputNumber placeholder="0" disabled />
            <p style={{ marginLeft: '1em' }}>pounds</p>
          </div>
        </Form.Item>

        <Form.Item
          name="foodMatchTraining"
          label="Have you completed the food match training on Chowmatch?"
        >
          <Radio.Group disabled>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
            <Radio value="inProgress">In progress</Radio>
            <Radio value="noAccount">I do not have an account</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="drive" label="Able to Drive">
          <Radio.Group disabled>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="vehicleType" label="Type of Vehicle">
          <Select style={inputBoxStyle} placeholder="Please select a vehicle type" disabled>
            <Option value="opt1">opt1</Option>
            <Option value="opt2">opt2</Option>
            <Option value="opt3">opt3</Option>
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
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <InputNumber placeholder="0" disabled />
            <p style={{ marginLeft: '1em' }}>miles</p>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileRolesAndSkills;
