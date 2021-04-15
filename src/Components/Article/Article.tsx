import { Typography, Switch, Image, Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faComment, faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LazyLoad from 'react-lazyload';
import styles from './styles.module.css';
import { Comment, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function Para({ article, user }) {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const [ellipsis, setEllipsis] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const { Paragraph } = Typography;
  return (
    <LazyLoad offset={100} height={100} style={{ background: '#f5f5f5' }}>
      <Card
        loading={loading}
        style={{
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex' }}>
          <div>
            <Avatar
              style={{ marginLeft: 15, marginTop: 10, height: 45, width: '45px' }}
              icon={<UserOutlined />}
              src={user?.avatar?.viewUrl ?? ''}
            />
          </div>

          <div style={{ marginTop: 9, marginLeft: 10 }}>
            <h3 style={{ fontWeight: 600, fontSize: 13, marginBottom: 0, color: 'black' }}>
              {user.name.firstName + ' ' + user.name.lastName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5 style={{ margin: 0, marginRight: 4, fontSize: 12 }}>36m</h5>
              <FontAwesomeIcon icon={faGlobeAmericas} />
            </div>
          </div>
        </div>
        <div>
          <Paragraph
            ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}
            style={{ fontSize: 14, margin: 16 }}
          >
            {article.text}
          </Paragraph>
          {article.imgs[0]?.viewUrl && (
            <Image.PreviewGroup>
              <Image
                width="100%"
                style={{ aspectRatio: 1 / 1, maxWidth: '100%' }}
                src={article.imgs[0]?.viewUrl.replace(/=s220*/, '')}
              ></Image>
            </Image.PreviewGroup>
          )}
        </div>
        <div className={styles['action-article']}>
          <FontAwesomeIcon className={styles['action-article-icon']} icon={faHeart} />
          <FontAwesomeIcon className={styles['action-article-icon']} icon={faComment} />
          <FontAwesomeIcon className={styles['action-article-icon']} icon={faShareSquare} />
        </div>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </Card>
      <Image
        style={{ display: 'none' }}
        src={
          'https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D'
        }
        onLoad={() => setLoading(false)}
      ></Image>
    </LazyLoad>
  );
}
