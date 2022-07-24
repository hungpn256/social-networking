import { Avatar, Comment, List } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { IComment } from '../../Models/article'
import { Editor } from '../Article';
import styles from './styles.module.css';
import { UserOutlined, LikeFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ILogin from '../../Models/login';
import { ip } from '../../configs/ip';
import axios from 'axios';

export default function CommentCustom({ comment }: { comment: IComment }) {
  const [value, setValue] = useState('');
  const [submiting, setSubmitting] = useState(false);
  const [data, setData] = useState(comment);
  const { user: userLogin } = useSelector((state: { login: ILogin }) => state.login);
  const [showEditor, setShowEditor] = useState(false);

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
      }
      const res = await axios.post(`${ip}/post/rep-comment/${data._id}`, { comment: newComment })
      console.log([
        ...data.reply,
        res.data.comment
      ]);

      setValue('');
      setData((oldData) => ({
        ...oldData,
        reply: [
          ...oldData.reply,
          res.data.comment
        ]
      }));
    } catch (e) {
      console.log("🚀 ~ file: index.tsx ~ line 47 ~ handleSubmit ~ e", e)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative">
        <Comment
          content={data.content}
          author={data.createdBy.fullName}
          avatar={data.createdBy.avatar}
          datetime={moment(data.createdAt).fromNow()}
          className={`${styles['comment']} comment`}
        />
        <div className={styles["wrap-icon-like"]}>
          <LikeFilled className={styles['icon-like']} />
        </div>
      </div>
      <div className="flex ml-[46px]">
        <div className="text-[#00000073] mr-[8px] cursor-pointer text-lg font-bold">like</div>
        <div className="text-[#00000073] mr-[8px] cursor-pointer text-lg font-bold" onClick={() => { setShowEditor(true) }}>reply</div>
      </div>
      {showEditor && <Comment
        avatar={<Avatar icon={<UserOutlined />} src={userLogin?.avatar} alt="Han Solo" />}
        className={styles['comment-form']}
        content={
          <Editor
            onChange={(e) => setValue(e.target.value)}
            onSubmit={handleSubmit}
            submitting={submiting}
            value={value}
          />
        }
      />}
      {comment.reply.length > 0 && <List
        dataSource={data.reply}
        itemLayout="horizontal"
        renderItem={(replyItem) => (
          <div style={{ marginLeft: 40 }}>
            <Comment
              content={replyItem.content}
              author={replyItem.createdBy.fullName}
              avatar={replyItem.createdBy.avatar}
              datetime={moment(replyItem.createdAt).fromNow()}
              className={`${styles['comment']} comment`}
            />
            <div className="flex ml-[46px]">
              <div className="text-[#00000073] mr-[8px] cursor-pointer text-lg font-bold">like</div>
            </div>
          </div>
        )}
      />}
    </>
  )
}
