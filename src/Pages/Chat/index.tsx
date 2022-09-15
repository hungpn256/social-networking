import { Avatar, Input, Modal, Tooltip } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatActiveItem from '../../Components/ChatActiveItem';
import { RootState } from '../../index_Reducer';
import { IConversation } from '../../Models/chat';
import { CONVERSATION_CHANGE_STATE, GET_OR_CREATE_CONVERSATION } from './constants';
import styles from './styles.module.css';
import services from '../Home/service';
import IUser from '../../Models/user';
import Person from '../../Components/Person/Person';
import { UserOutlined } from '@ant-design/icons';

export default function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.user);
  const conversation = useSelector((state: RootState) => state.conversation);
  const {
    temporaryConversation,
    activeConversationsIds: active,
    conversations,
    isOpenCreateConversationModal,
  } = conversation;
  const conversationActive = active.map((item) => {
    let tmp = conversations.find((i) => i._id === item._id);
    if (tmp) {
      return tmp;
    } else {
      return temporaryConversation;
    }
  }) as IConversation[];
  const [text, setText] = useState('');
  const [friends, setFriends] = useState<IUser[]>([]);
  const [selected, setSelected] = useState<IUser[]>([]);

  useEffect(() => {
    return () => {
      if (isOpenCreateConversationModal) {
        setSelected([]);
        setFriends([]);
        setText('');
      }
    };
  }, [isOpenCreateConversationModal]);

  const getFriend = useCallback(async () => {
    const res = await services.getFriend({ _id: user._id, searchText: text });
    setFriends(res.data.friends);
  }, [text, user._id]);

  useEffect(() => {
    if (isOpenCreateConversationModal) {
      getFriend();
    }
  }, [getFriend, isOpenCreateConversationModal]);

  const onClickPerson = (user: IUser) => {
    const userExist = selected.find((item) => item._id === user._id);
    if (userExist) {
      setSelected(selected.filter((item) => item._id !== user._id));
    } else {
      setSelected(selected.concat(user));
    }
  };

  const onSubmit = async () => {
    dispatch({ type: GET_OR_CREATE_CONVERSATION, payload: selected.map((i) => i._id) });
    dispatch({
      type: CONVERSATION_CHANGE_STATE,
      payload: { isOpenCreateConversationModal: false },
    });
  };

  return (
    <div className={styles['container']}>
      {conversationActive.map((conversationActiveItem) => (
        <ChatActiveItem key={conversationActiveItem._id} conversation={conversationActiveItem} />
      ))}
      <Modal
        visible={isOpenCreateConversationModal}
        onCancel={() => {
          dispatch({
            type: CONVERSATION_CHANGE_STATE,
            payload: { isOpenCreateConversationModal: false },
          });
        }}
        onOk={onSubmit}
      >
        <Input
          placeholder="search..."
          style={{ marginTop: 16 }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="my-[20px]">
          <Avatar.Group>
            {selected.map((i) => {
              return (
                <Tooltip title={i.fullName} placement="top">
                  <Avatar src={i.avatar} icon={<UserOutlined />} />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </div>
        <div className={styles['friend-wrapper']}>
          {friends.map((i) => {
            return (
              <div>
                <Person
                  className={
                    selected.find((item) => item._id === i._id) ? styles['person-active'] : ''
                  }
                  person={i}
                  key={i._id}
                  onClick={() => onClickPerson(i)}
                />
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
