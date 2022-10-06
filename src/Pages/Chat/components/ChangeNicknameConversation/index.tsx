import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ip } from '../../../../configs/ip';
import { RootState } from '../../../../index_Reducer';
import { IConversation, TypeMessage } from '../../../../Models/chat';
import { SEND_MESSAGE } from '../../constants';
const { Search } = Input;

interface Props {
  conversation: IConversation;
  setContentModal: (content: any) => void;
}

export default function ChangeNicknameConversation({ conversation, setContentModal }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.user);
  const [requesting, setRequesting] = useState(false);
  console.log(
    '🚀 ~ file: index.tsx ~ line 23 ~ ChangeNicknameConversation ~ requesting',
    requesting
  );

  return (
    <Form name="basic" labelCol={{ span: 4 }} initialValues={{ remember: true }} autoComplete="off">
      {conversation.participants.map((i) => (
        <Search
          placeholder={i.user.fullName}
          enterButton={
            <Button>
              <EditOutlined />
            </Button>
          }
          defaultValue={i.nickName}
          allowClear
          onSearch={async (value) => {
            if (requesting) return;
            try {
              setRequesting(true);
              await axios.post(`${ip}/conversation/change-nickname`, {
                userId: i.user._id,
                nickName: value,
                conversationId: conversation._id,
              });
              dispatch({
                type: SEND_MESSAGE,
                payload: {
                  message: {
                    content: `${i.user.fullName}'s name has been changed to ${value}`,
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
              setContentModal(null);
            } catch (e) {
              toast.error('change nickname fail');
            } finally {
              setRequesting(false);
            }
          }}
          style={{ marginTop: 8 }}
        />
      ))}
    </Form>
  );
}
