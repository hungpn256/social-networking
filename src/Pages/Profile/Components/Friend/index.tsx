import { faCheck, faCommentDots, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Card, List, Tabs } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import imgUser from '../../../../Assets/user.png';
import { ip } from '../../../../configs/ip';
import { IFriend } from '../../../../Models/friend';
import ILogin from '../../../../Models/login';
import IUser from '../../../../Models/user';
import { GET_OR_CREATE_CONVERSATION } from '../../../Chat/constants';
import { createConversation } from '../../../Chat/service';
import styles from './styles.module.css';

const { TabPane } = Tabs;
const { Meta } = Card;

interface Params {
  id: string;
}

export default function Friend() {
  const [loading, setLoading] = useState(false);
  const [friend, setFriend] = useState<IUser[]>([]);
  const [friendPending, setFriendPending] = useState<IFriend[]>([]);
  const { login } = useSelector((state: { login: ILogin }) => state);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params as Params;
  const { user } = login;
  const getFriend = async (status: 'PENDING' | 'FRIEND' | 'REQUESTED', callBack: any) => {
    if (status === 'FRIEND') {
      const res = await axios.get(`${ip}/friend/${id}`);
      callBack(res.data.friends);
    } else {
      const res = await axios.get(`${ip}/friend/byStatus`, { params: { status } });
      callBack(res.data.friends);
    }
  };

  const getOrCreateConversationById = async (targetIds: string[]) => {
    dispatch({ type: GET_OR_CREATE_CONVERSATION, payload: targetIds });
  }

  const changeStatusFriend = async (userId: string, status: 'ACCEPTED' | 'REJECTED') => {
    setLoading(true);
    try {
      await axios.put(`${ip}/friend/${userId}`, { status });
      await getFriend('FRIEND', setFriend);
      user?._id === id && (await getFriend('PENDING', setFriendPending));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getFriend('FRIEND', setFriend);
    user?._id === id && getFriend('PENDING', setFriendPending);
  }, [id]);
  return (
    <div className={styles['grid']}>
      <Tabs type="card" centered animated>
        <TabPane tab="Bạn bè" key="1">
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={friend}
            loading={loading}
            renderItem={(item) => (
              <List.Item>
                <Card
                  cover={
                    <img className={styles['avatar']} alt="avatar" src={item.cover || imgUser} />
                  }
                  actions={[
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={`${styles['action-icon']} ${styles['action-icon-trash']}`}
                      onClick={() => changeStatusFriend(item._id, 'REJECTED')}
                    />,
                    <FontAwesomeIcon
                      onClick={() => getOrCreateConversationById([item._id])}
                      icon={faCommentDots}
                      className={`${styles['action-icon']} ${styles['action-icon-message']}`}
                    />,
                  ]}
                >
                  <Meta
                    avatar={
                      <Link to={`/profile/${item._id}`}>
                        <Avatar src={item.avatar || imgUser} />
                      </Link>
                    }
                    title={item.fullName}
                    description={item.phoneNumber}
                  />
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        {user?._id === id && (
          <TabPane tab="Yêu cầu kết bạn" key="2">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={friendPending}
              loading={loading}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    cover={
                      <img
                        className={styles['avatar']}
                        alt="avatar"
                        src={item.requester.cover || imgUser}
                      />
                    }
                    actions={[
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={`${styles['action-icon']} ${styles['action-icon-comfirm']}`}
                        onClick={() => changeStatusFriend(item.requester._id, 'ACCEPTED')}
                      />,
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={`${styles['action-icon']} ${styles['action-icon-trash']}`}
                        onClick={() => changeStatusFriend(item.requester._id, 'REJECTED')}
                      />,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Link to={`/profile/${item.requester._id}`}>
                          <Avatar src={item.requester.avatar || imgUser} />
                        </Link>
                      }
                      title={item.requester.fullName}
                      description={item.requester.phoneNumber}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}
