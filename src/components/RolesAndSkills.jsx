import React, { useState } from 'react';
import { Input, Radio, Form, Select, InputNumber, Button, Col, Checkbox, Row } from 'antd';

const { Option } = Select;

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: 'Answer to this question is required!',
};

const RolesAndSkills = () => {
  const [componentSize, setComponentSize] = useState('default');
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div>
      <h1>Interested Roles and Skills</h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        validateMessages={validateMessages}
        name="roles_n_skills"
        size={componentSize}
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={(onRequiredTypeChange, onFormLayoutChange)}
        requiredMark={requiredMark}
      >
        <Form.Item name="interestedRoles" label="Roles Interested In" rules={[{ required: true }]}>
          <Checkbox.Group>
            <Row>
              <Col span={6}>
                <Checkbox
                  value="item01"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item01
                </Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox
                  value="item02"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item02
                </Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox
                  value="item03"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item03
                </Checkbox>
              </Col>
              <Col span={6}>
                <Checkbox
                  value="item04"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item04
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item name="skills" label="Skills">
          <Input.TextArea placeholder="Please enter your work goals" />
        </Form.Item>

        <Form.Item name="languagesSpoken" label="Languages Spoken" rules={[{ required: true }]}>
          <Checkbox.Group>
            <Row>
              <Col span={3}>
                <Checkbox
                  value="item01"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item01
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="item02"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item02
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="item03"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item03
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="item04"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item04
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="item05"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item05
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="item06"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item06
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="item07"
                  style={{
                    lineHeight: '32px',
                  }}
                >
                  item07
                </Checkbox>
              </Col>
              <Col span={3}>
                <Checkbox
                  value="Other"
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
          label="Weightlifting Ability"
          rules={[
            {
              type: 'number',
              required: true,
            },
          ]}
        >
          <InputNumber placeholder="0 lbs" />
        </Form.Item>

        <Form.Item name="drive" label="Can you drive?" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="vehicleType" label="Vehicle Type:" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Select all that apply.">
            <Option value="opt1">opt1</Option>
            <Option value="opt2">opt2</Option>
            <Option value="opt3">opt3</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="drivingMiles"
          label="How far are you comfortable driving?"
          rules={[
            {
              required: true,
              type: 'number',
            },
          ]}
        >
          <InputNumber placeholder="0 miles" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 19 }}>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RolesAndSkills;
