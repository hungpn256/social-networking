import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { updateConversation } from '../../service';

interface Props {
  conversationId: string;
}

export default function ChangeInforConversation({ conversationId }: Props) {
  const onFinish = async (data: { name: string }) => {
    const res = await updateConversation(conversationId, data);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center', margin: '20px' }}>
        Change Information Conversation
      </div>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
