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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          margin: '30px 0',
        }}
      >
        {/* <Checkbox value={1} checked={checked === 1} onClick={() => setChecked(1)}>
          Repair SOS
        </Checkbox>
        <Checkbox
          value={2}
          checked={checked === 2}
          onClick={() => setChecked(2)}
          style={{ margin: 0 }}
        >
          Accident SOS
        </Checkbox> */}
        <Button
          type="primary"
          style={{ width: '100%', margin: '10px 0', backgroundColor: '#EB984E' }}
          onClick={() => setChecked(1)}
        >
          Repair SOS
        </Button>
        <Button type="primary" style={{ width: '100%' }} danger onClick={() => setChecked(2)}>
          Accident SOS
        </Button>
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
              <Form.Item name={['user', 'email']} label="Phone Number" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name={['user', 'introduction']} label="Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name={['user', 'introduction']}
                rules={[{ required: true }]}
                label="Share location"
              >
                <Button type="primary">Enable</Button>
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
      okText: 'Cancel',
      style: { width: 1000, maxWidth: '100%' },
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
