import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../index_Reducer';
import { IConversation, TypeMessage } from '../../../../Models/chat';
import { SEND_MESSAGE, UPDATE_CONVERSATION } from '../../constants';
import { updateConversation } from '../../service';

interface Props {
  conversation: IConversation;
  setContentModal: (content: any) => void;
}

export default function ChangeInforConversation({ conversation, setContentModal }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.user);
  const onFinish = async (data: { name: string }) => {
    try {
      if (conversation.name !== data.name) {
        await updateConversation(conversation._id, data);
        conversation.name = data.name;
        dispatch({ type: UPDATE_CONVERSATION, payload: { conversation } });
        dispatch({
          type: SEND_MESSAGE,
          payload: {
            message: {
              content: 'the name of the group has been changed to ' + data.name,
              _id: Date.now().toString(),
              type: TypeMessage.NOTIFICATION,
              conversation: conversation._id,
              createdBy: {
                _id: user?._id,
                avatar: user?.avatar,
                fullName: user?.fullName,
              },
              status: 'LOADING',
            },
            conversationId: conversation._id,
          },
        });
      }
      setContentModal(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item required requiredMark label="Name" name="name" initialValue={conversation.name}>
        <Input />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="primary" htmlType="submit" style={{ margin: '0 auto' }}>
          Submit
        </Button>
      </div>
    </Form>
  );
}
