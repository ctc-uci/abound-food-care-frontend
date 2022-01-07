import React from 'react';
import { Input, Radio, Form, Select, InputNumber, Button, Col, Checkbox, Row } from 'antd';

/* eslint-disable no-template-curly-in-string */

const { Option } = Select;

const validateMessages = {
  required: '${label} is required!',
};

/* eslint-disable no-template-curly-in-string */

const RolesAndSkills = () => {
  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);

    // const [form] = Form.useForm();
    // const [requiredMark, setRequiredMarkType] = useState('optional');

    // const onRequiredTypeChange = ({ requiredMarkValue }) => {
    //  setRequiredMarkType(requiredMarkValue);
    // };
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      name="roles_n_skills"
      validateMessages={validateMessages}
      size={componentSize}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item
        name="roles-interested-in"
        label="Roles Interested In"
        rules={[
          {
            required: true,
            message: validateMessages,
          },
        ]}
      >
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
        <Radio.Group>
          <Radio.Button value="optional">Optional</Radio.Button>
        </Radio.Group>
        <Input.TextArea placeholder="Please enter your work goals" />
      </Form.Item>

      <Form.Item
        name="languages-spoken"
        label="Languages Spoken"
        rules={[
          {
            required: true,
            message: validateMessages,
          },
        ]}
      >
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
        name="weightlifting"
        label="Weightlifting Ability"
        rules={[
          {
            type: 'number',
            required: true,
            message: validateMessages,
          },
        ]}
      >
        <Input placeholder="0 lbs" />
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Can you drive?"
        rules={[
          {
            required: true,
            message: validateMessages,
          },
        ]}
      >
        <Radio.Group>
          <Radio value>Yes</Radio>
          <Radio value>No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="vehicle_types"
        label="Vehicle Type:"
        rules={[
          {
            required: true,
            message: validateMessages,
          },
        ]}
      >
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
            message: validateMessages,
            type: 'number',
          },
        ]}
      >
        <Input placeholder="0 miles" />
        <InputNumber />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 19 }}>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RolesAndSkills;
