import { LikeFilled, UserOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Comment, List } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ip } from '../../configs/ip';
import { IComment } from '../../Models/article';
import ILogin from '../../Models/login';
import { Editor } from '../Article';
import styles from './styles.module.css';

export default function CommentCustom({
  comment,
  noReply,
  onDeleteComment,
}: {
  comment: IComment;
  noReply?: boolean;
  onDeleteComment: (id: string) => void;
}) {
  const [value, setValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [submiting, setSubmitting] = useState(false);
  const [data, setData] = useState(comment);
  const { user: userLogin } = useSelector((state: { login: ILogin }) => state.login);
  const [isLiked, setLiked] = useState(comment.liked.some((i) => i.likedBy === userLogin?._id));
  const [showEditor, setShowEditor] = useState(false);

  const handleLike = (id: string) => {
    try {
      setLiked(!isLiked);
      axios.post(`${ip}/post/like-comment/${id}`, {
        like: {
          type: 'LIKE',
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!value) {
      return;
    }
    try {
      setSubmitting(true);
      const newComment = {
        content: value,
        file: [],
        liked: [],
        reply: [],
      };
      const res = await axios.post(`${ip}/post/rep-comment/${data._id}`, { comment: newComment });
      console.log([...data.reply, res.data.comment]);

      setValue('');
      setData((oldData) => ({
        ...oldData,
        reply: [...oldData.reply, res.data.comment],
      }));
    } catch (e) {
      console.log('🚀 ~ file: index.tsx ~ line 47 ~ handleSubmit ~ e', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex">
          <Avatar icon={<UserOutlined />} src={comment?.createdBy.avatar} alt="" />
          <div className={`${styles['comment']} relative`}>
            <div className="font-bold" style={{ fontSize: 12 }}>
              {data.createdBy.fullName}{' '}
              <span className="text-gray" style={{ fontSize: 11, marginLeft: 8 }}>
                {moment(data.createdAt).fromNow()}
              </span>
            </div>
            <div style={{ whiteSpace: 'pre-line' }}>{data.content}</div>
            {(data.liked.length > 0 || isLiked) && (
              <div className={styles['wrap-icon-like']}>
                <LikeFilled className={styles['icon-like']} />
              </div>
            )}
            <div className={styles['options']}>
              <Button type="primary" shape="circle" size="small">
                <EditFilled />
              </Button>
              <Button
                shape="circle"
                size="small"
                danger
                type="primary"
                onClick={() => onDeleteComment(data._id)}
              >
                <DeleteFilled />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex" style={{ marginLeft: 46 }}>
        <div
          className={`${isLiked ? 'text-blue' : 'text-gray'}  cursor-pointer font-bold `}
          style={{ marginRight: 8, fontSize: 13 }}
          onClick={() => handleLike(data._id)}
        >
          like
        </div>
        {!noReply && (
          <div
            className="text-gray cursor-pointer font-bold"
            onClick={() => {
              setShowEditor(true);
            }}
            style={{ marginRight: 8, fontSize: 13 }}
          >
            reply
          </div>
        )}
      </div>
      {showEditor && (
        <Comment
          avatar={<Avatar icon={<UserOutlined />} src={userLogin?.avatar} alt="" />}
          className={styles['comment-form']}
          content={
            <Editor
              onChange={(e) => setValue(e.target.value)}
              onSubmit={handleSubmit}
              submitting={submiting}
              value={value}
            />
          }
        />
      )}
      {data.reply.length > 0 &&
        (showEditor ? (
          <List
            dataSource={data.reply}
            itemLayout="horizontal"
            renderItem={(replyItem) => {
              return (
                <div style={{ marginLeft: 44 }}>
                  <CommentCustom comment={replyItem} noReply={true} />
                </div>
              );
            }}
          />
        ) : (
          <div>
            <div
              className={`${isLiked ? 'text-blue' : 'text-gray'}  cursor-pointer font-bold ${
                styles['show-reply-comment']
              }`}
              style={{ marginRight: 8, fontSize: 13, marginLeft: 44 }}
              onClick={() => setShowEditor(true)}
            >
              <FontAwesomeIcon
                icon={faReply}
                style={{ transform: 'rotateY(180deg) rotateX(180deg)' }}
              />{' '}
              show reply...
            </div>
          </div>
        ))}
    </>
  );
}
