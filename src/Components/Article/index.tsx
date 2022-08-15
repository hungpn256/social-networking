import { UserOutlined } from '@ant-design/icons';
import { faComment, faHeart, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsisV,
  faGlobeAmericas,
  faHeart as faHeartSolid,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Card,
  Comment,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  Modal,
  Spin,
  Typography,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ip } from '../../configs/ip';
import IArticle, { IComment } from '../../Models/article';
import ILogin from '../../Models/login';
import * as profileActions from '../../Pages/Profile/actions';
import CommentCustom from '../Comment';
import styles from './styles.module.css';
const { TextArea } = Input;
const { Paragraph } = Typography;

const CommentList = ({
  comments,
  numOfCmt,
  numberOfLike,
  postId,
  setComments,
}: {
  comments: IComment[];
  numOfCmt: number;
  numberOfLike: number;
  postId: string;
  setComments: (comments: IComment[]) => void;
}) => {
  const loadMore = async () => {
    if (postId) {
      const res = await axios.get(`${ip}/post/comment/` + postId);
      console.log('🚀 ~ file: index.tsx ~ line 55 ~ loadMore ~ res', res);
      setComments(res.data.comment);
    }
  };
  return (
    <div>
      <div className={styles['header-comment']}>
        {numberOfLike > 0 ? `${numberOfLike} ${numberOfLike > 1 ? 'likes  ' : 'like  '}` : ''}
        {numOfCmt > 0 ? `${numOfCmt} ${numOfCmt > 1 ? 'replies' : 'reply'}` : ''}
      </div>
      {comments.map((item) => (
        <CommentCustom key={item._id} comment={item} />
      ))}
      {numOfCmt > comments.length && (
        <div className={styles['more']} onClick={loadMore}>
          More....
        </div>
      )}
    </div>
  );
};

export const Editor = forwardRef(
  (
    {
      onChange,
      onSubmit,
      submitting,
      value,
    }: {
      onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
      onSubmit: () => void;
      submitting: boolean;
      value: string;
    },
    ref
  ) => {
    const refInput = useRef<any>();
    useImperativeHandle(ref, () => ({
      focus: refInput.current?.focus,
    }));
    return (
      <div className={styles['editor']}>
        <TextArea
          placeholder={'Comment here...'}
          style={{ borderRadius: 20, background: '#f5f5f5', flex: 1 }}
          autoSize={{ minRows: 1, maxRows: 5 }}
          onChange={onChange}
          value={value}
          ref={refInput}
        />
        <div className={styles['spin-comment']}>
          <Spin spinning={submitting}>
            <Button className={styles['send-comment']} htmlType="submit" onClick={onSubmit}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </Spin>
        </div>
      </div>
    );
  }
);

export default function Para({ article }: { article: IArticle }) {
  const { createBy: user, comment, liked } = article;
  const { user: userLogin } = useSelector((state: { login: ILogin }) => state.login);
  const [isLiked, setLiked] = useState(article.liked.some((i) => i.likedBy === userLogin?._id));
  const [numOfComment, setNumOfComment] = useState(article.numOfCmt);
  const [comments, setComments] = useState<IComment[]>(comment);
  const [numberOfLike, setNumberOfLike] = useState(liked.length);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();
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
          Modal.confirm({
            onOk: () => {
              dispatch(profileActions.deleteArticle(article._id));
            },
            content: 'Bạn chắc chắn xóa bài viết này?',
          });
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

  const handleLike = (id: string) => {
    try {
      setNumberOfLike(isLiked ? numberOfLike - 1 : numberOfLike + 1);
      setLiked(!isLiked);
      axios.post(`${ip}/post/like/${id}`, {
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
      const comment = {
        content: value,
        file: [],
        liked: [],
        reply: [],
      };
      const res = await axios.post(`${ip}/post/comment/${article._id}`, { comment });
      setValue('');
      setComments([...comments, res.data.comment]);
      setNumOfComment(numOfComment + 1);
    } catch (e) {
    } finally {
      setSubmitting(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  return (
    <LazyLoad offset={100} height={100}>
      <Card
        loading={loading}
        style={{
          filter:
            'drop-shadow(0px 4px 6px rgba(38, 50, 56, 0.16)), drop-shadow(0px 4px 16px rgba(38, 50, 56, 0.08))',
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
                    {user.fullName}
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
                  {moment().from(article.createdAt)}
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
            style={{ fontSize: 14, margin: '5px 15px', whiteSpace: 'pre-line' }}
          >
            {article?.text}
          </Paragraph>
          <div className="flex flex-wrap">
            {article.images.length > 0 &&
              article.images.map((i) => {
                return (
                  <div
                    style={{
                      minWidth: '50%',
                      width: `${100 / article.images.length}%`,
                      maxWidth: '100%',
                      flex: 1,
                    }}
                  >
                    <Image.PreviewGroup>
                      <Image
                        width="100%"
                        style={{
                          aspectRatio: '4 / 3',

                          objectFit: 'cover',
                        }}
                        src={i.url}
                      ></Image>
                    </Image.PreviewGroup>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles['action-article']}>
          <FontAwesomeIcon
            className={`${styles['action-article-icon']} ${styles['action-like']}`}
            icon={isLiked ? faHeartSolid : faHeart}
            onClick={() => handleLike(article._id)}
          />
          <FontAwesomeIcon
            className={styles['action-article-icon']}
            icon={faComment}
            onClick={() => (inputRef.current as any)?.focus?.()}
          />
          <FontAwesomeIcon className={styles['action-article-icon']} icon={faShareSquare} />
        </div>
        <Divider style={{ margin: 0, borderTop: '1px solid rgba(0,0,0,0.2)' }} />
        {(comments.length > 0 || numberOfLike > 0) && (
          <CommentList
            comments={comments}
            numOfCmt={numOfComment}
            numberOfLike={numberOfLike}
            postId={article._id}
            setComments={setComments}
          />
        )}
        <Comment
          avatar={<Avatar icon={<UserOutlined />} src={userLogin?.avatar} alt="Han Solo" />}
          className={styles['comment-form']}
          content={
            <Editor
              ref={inputRef}
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
