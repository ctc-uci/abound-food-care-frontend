import React, { useState } from 'react';
import { DatePicker, Form, Input, Button, TimePicker, InputNumber, Dropdown, Menu } from 'antd';
import { DownOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';

const GeneralInfo = () => {
  // const onFinish = values => {
  //   console.log(values);
  // };

  const [componentSize, setComponentSize] = React.useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const volunteerTypeMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  const tagList = [
    { name: 'First Aid Training' },
    { name: 'Can Drive' },
    { name: 'Age 18 or Older' },
  ];

  const [list, updateList] = useState(tagList);

  const handleRemoveItem = e => {
    const name = e.target.getAttribute('name');
    updateList(list.filter(item => item.name !== name));
  };

  const [state, setState] = useState('start');

  const addItem = item => {
    tagList.name = item.target.value;
  };

  return (
    <div>
      <h1> General Information </h1>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        size={componentSize}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Event Name">
          <Input placeholder="Ex. Food Running Event" />
        </Form.Item>

        <Form.Item label="Date / Time">
          <DatePicker placeholder="Select date" />
          <TimePicker placeholder="Select time" />
        </Form.Item>

        <Form.Item label="Event Type">
          {/* TODO: Open popup */}
          <Button>Type</Button>
          <a href="http://">New Event Type</a>
        </Form.Item>

        <Form.Item label="Num Volunteers">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Volunteer Type">
          <Dropdown overlay={volunteerTypeMenu} placement="bottomCenter">
            <Button>
              Type <DownOutlined />
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item label="Requirements (optional)">
          {/* TODO: Make the deleting smoother */}
          {list.map(item => {
            return (
              <>
                <Button name={item.name} onClick={handleRemoveItem}>
                  {item.name} <CloseOutlined />
                </Button>
              </>
            );
          })}

          {state === 'start' && (
            <>
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => setState('add-item')}>
                New Tag
              </Button>
            </>
          )}

          {/* TODO: Fix the enter */}
          {state === 'add-item' && (
            <>
              <Input onKeyDown={e => e.key === 'Enter' && addItem} />
            </>
          )}
        </Form.Item>

        <Form.Item label="Location">
          <Input placeholder="Ex. Irvine, CA" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInfo;
