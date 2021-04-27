import { UserOutlined } from '@ant-design/icons';
import { faComment, faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisV,
  faGlobeAmericas,
  faPaperPlane,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Card,
  Comment,
  Divider,
  Dropdown,
  Form,
  Image,
  Input,
  List,
  Menu,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { ChangeEvent, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import * as profileActions from '../../Pages/Profile/actions';
import { useDispatch, useSelector } from 'react-redux';
import IArticle from '../../Models/article';
import ILogin from '../../Models/login';
const { TextArea } = Input;

const CommentList = ({
  comments,
}: {
  comments: Array<{
    author: string;
    avatar: string | undefined;
    content: JSX.Element;
    datetime: string;
  }>;
}) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}) => (
  <>
    <Form.Item>
      <TextArea
        placeholder={'Comment here...'}
        style={{ borderRadius: 20, background: '#f5f5f5' }}
        autoSize={{ minRows: 1, maxRows: 5 }}
        onChange={onChange}
        value={value}
      />
      <Button
        className={styles['send-comment']}
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Form.Item>
  </>
);
const { Paragraph } = Typography;
export default function Para({ article }: { article: IArticle }) {
  const { createBy: user } = article;
  const { user: userLogin } = useSelector((state: { login: ILogin }) => state.login);
  const [comments, setComments] = useState<
    Array<{
      author: string;
      avatar: string | undefined;
      content: JSX.Element;
      datetime: string;
    }>
  >([]);
  const [actionLike, setActionLike] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const menu = (
    <Menu
      style={{
        borderRadius: 10,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      }}
    >
      <Menu.Item
        key="1"
        onClick={() => {
          dispatch(profileActions.deleteArticle(article._id));
        }}
      >
        Delete post
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    article?.images[0]?.url && setLoading(true);
  }, [article._id, article?.images]);
  useEffect(() => {
    const setvisiableTrue = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(setvisiableTrue);
    };
  }, []);
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
          author: userLogin?.name.firstName + ' ' + userLogin?.name.lastName,
          avatar: userLogin?.avatar,
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <LazyLoad offset={100} height={100} style={{ background: '#f5f5f5' }}>
      <Card
        loading={loading}
        style={{
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <Link to={'/profile/' + user._id}>
              <Avatar
                style={{ marginLeft: 15, marginTop: 10, height: 45, width: '45px' }}
                icon={<UserOutlined />}
                src={user?.avatar ?? ''}
              />
            </Link>

            <div style={{ marginTop: 9, marginLeft: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Link className={styles['link-avatar']} to={'/profile/' + user._id}>
                  <h3 style={{ fontWeight: 600, fontSize: 13, marginBottom: 0, color: 'black' }}>
                    {user.name.firstName + ' ' + user.name.lastName}
                  </h3>
                </Link>
                {article?.action && (
                  <div style={{ fontSize: 11, fontWeight: 300, marginLeft: 4, color: '#666' }}>
                    {article?.action}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h5 style={{ margin: 0, marginRight: 4, fontSize: 12 }}>
                  {moment().from(article.createAt)}
                </h5>
                <FontAwesomeIcon icon={faGlobeAmericas} />
              </div>
            </div>
          </div>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className={styles['wrap-icon']}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </Dropdown>
        </div>
        <div>
          <Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
            style={{ fontSize: 14, margin: '5px 15px' }}
          >
            {article?.text?.split(/\n/).map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </Paragraph>
          {article.images[0]?.url && (
            <Image.PreviewGroup>
              <Image
                width="100%"
                style={{ aspectRatio: '4 / 3', maxWidth: '100%', objectFit: 'cover' }}
                src={article.images[0].url}
              ></Image>
            </Image.PreviewGroup>
          )}
        </div>
        <Divider style={{ margin: 0, borderTop: '1px solid rgba(0,0,0,0.2)' }} />
        <div className={styles['action-article']}>
          <FontAwesomeIcon
            className={`${styles['action-article-icon']} ${styles['action-like']}`}
            icon={actionLike === 0 ? faHeart : faHeartSolid}
            onMouseEnter={(e) => {
              setActionLike(1);
            }}
            onMouseLeave={(e) => {
              setActionLike(0);
            }}
          />
          <FontAwesomeIcon className={styles['action-article-icon']} icon={faComment} />
          <FontAwesomeIcon className={styles['action-article-icon']} icon={faShareSquare} />
        </div>
        <Divider style={{ margin: 0, borderTop: '1px solid rgba(0,0,0,0.2)' }} />
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar icon={<UserOutlined />} src={user?.avatar} alt="Han Solo" />}
          className={styles['comment-form']}
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
        src={article?.images[0]?.url}
        onLoad={() => setLoading(false)}
      ></Image>
    </LazyLoad>
  );
}
