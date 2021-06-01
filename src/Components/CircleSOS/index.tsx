import { Dropdown, Menu, Modal, Row, Form, Input, InputNumber, Button, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { useState } from 'react';
import styles from './styles.module.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ModalSOS = () => {
  const [checked, setChecked] = useState(0);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Checkbox value={1} checked={checked === 1} onClick={() => setChecked(1)}>
          Repair SOS
        </Checkbox>
        <Checkbox
          value={2}
          checked={checked === 2}
          onClick={() => setChecked(2)}
          style={{ margin: 0 }}
        >
          Accident SOS
        </Checkbox>
      </div>
      <div>
        {checked === 1 && (
          <Row>
            <Form
              style={{ marginTop: 40, marginLeft: -10 }}
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'email']}
                label="Phone Number"
                rules={[{ type: 'email' }]}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'age']}
                label="Age"
                rules={[{ type: 'number', min: 0, max: 99 }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item name={['user', 'introduction']} label="Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Row>
        )}
      </div>
    </div>
  );
};

export default function CircleSOS() {
  const onClick = () => {
    return Modal.info({
      title: <div style={{ fontWeight: 'bold' }}>SOS</div>,
      content: <ModalSOS />,
      okText: 'cancel',
    });
  };
  return (
    <div className={styles['container']}>
      <div className={styles['circle']} onClick={onClick}>
        SOS
      </div>
    </div>
  );
}
