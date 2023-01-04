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
import { toast } from 'react-toastify';
import { ip } from '../../configs/ip';
import IArticle, { IComment, ILike } from '../../Models/article';
import ILogin from '../../Models/login';
import * as profileActions from '../../Pages/Profile/actions';
import CommentCustom from '../Comment';
import styles from './styles.module.css';
import haha from '../../Assets/haha.svg';
import wow from '../../Assets/wow.svg';
import sad from '../../Assets/sad.svg';

const { TextArea } = Input;
const { Paragraph } = Typography;

const CommentList = ({
  comments,
  numOfCmt,
  numberOfLike,
  postId,
  setComments,
  inputRef,
}: {
  comments: IComment[];
  numOfCmt: number;
  numberOfLike: number;
  postId: string;
  setComments: (comments: IComment[]) => void;
  inputRef: any;
}) => {
  useEffect(() => {
    setNumCmt(numOfCmt);
  }, [numOfCmt]);
  const [numCmt, setNumCmt] = useState(numOfCmt);
  const loadMore = async () => {
    if (postId) {
      const res = await axios.get(`${ip}/post/comment/` + postId);
      setComments(res.data.comment);
    }
  };

  const onDeleteComment = async (id: string) => {
    try {
      await axios.delete(`${ip}/post/comment/${id}`);
      setComments(
        comments.filter((i) => {
          return i._id !== id;
        })
      );
      setNumCmt(numCmt - 1);
    } catch (err) {
      toast.error('delete comment failed');
    }
  };

  const onEditComment = async (id: string, content: string, callback: () => void) => {
    try {
      await axios.put(`${ip}/post/comment/${id}`, { content });
      callback();
    } catch (err) {
      toast.error('edit comment failed');
    }
  };

  return (
    <div>
      <div className={styles['header-comment']}>
        {numberOfLike > 0 ? `${numberOfLike} ${numberOfLike > 1 ? 'likes  ' : 'like  '}` : ''}
        {numCmt > 0 ? `${numCmt} ${numCmt > 1 ? 'replies' : 'reply'}` : ''}
      </div>
      {comments.map((item) => (
        <CommentCustom
          key={item._id}
          comment={item}
          onDeleteComment={onDeleteComment}
          onEditComment={onEditComment}
        />
      ))}
      {numCmt > comments.length && (
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

export default function Article({ article }: { article: IArticle }) {
  const { createdBy: user, comment, liked } = article;
  const { user: userLogin } = useSelector((state: { login: ILogin }) => state.login);
  const [isLiked, setLiked] = useState<ILike | undefined>(
    article.liked.find((i) => i.likedBy._id === userLogin?._id)
  );
  const [numOfComment, setNumOfComment] = useState(article.numOfCmt);
  const [comments, setComments] = useState<IComment[]>(comment);
  const [numberOfLike, setNumberOfLike] = useState(liked.length);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [editable, setEditable] = useState(false);
  const [valueEdit, setValueEdit] = useState(article.text);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [text, setText] = useState(article.text);
  const isMe = article.createdBy._id === userLogin?._id;

  const onEdit = () => {
    setEditable(true);
  };

  const onEditSubmit = async () => {
    try {
      setLoadingEdit(true);
      await axios.put(`${ip}/post/${article._id}/text`, { text: valueEdit });
      setText(valueEdit);
      setEditable(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingEdit(false);
    }
  };

  const onNotifcation = () => {
    try {
      axios.post(`${ip}/post/on-notification`, { postId: article._id });
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const offNotifcation = () => {
    try {
      axios.post(`${ip}/post/off-notification`, { postId: article._id });
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const menu = (
    <Menu
      style={{
        borderRadius: 10,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      }}
    >
      {isMe && (
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
      )}
      {isMe && (
        <Menu.Item key="1" onClick={onEdit}>
          Edit post
        </Menu.Item>
      )}
      <Menu.Item key="1" onClick={onNotifcation}>
        Turn on notifications
      </Menu.Item>
      <Menu.Item key="1" onClick={offNotifcation}>
        Turn off notifications
      </Menu.Item>
    </Menu>
  );

  const handleLike = (id: string, type: string = 'LIKE') => {
    try {
      let typeAction = 'DISLIKE';
      if (!isLiked) {
        typeAction = 'NEW_LIKE';
      } else if (type === isLiked?.type) {
        typeAction = 'DISLIKE';
      } else {
        typeAction = 'CHANGE_TYPE';
      }
      setNumberOfLike(
        typeAction === 'DISLIKE'
          ? numberOfLike - 1
          : typeAction === 'CHANGE_TYPE'
          ? numberOfLike
          : numberOfLike + 1
      );
      setLiked(
        typeAction === 'DISLIKE'
          ? undefined
          : { type, likedBy: userLogin!, _id: isLiked?._id ?? '' }
      );
      axios.post(`${ip}/post/like/${id}`, {
        like: {
          type,
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

  const renderLike = () => {
    if (!isLiked)
      return (
        <FontAwesomeIcon
          className={`${styles['action-article-icon']} ${styles['action-like']}`}
          icon={faHeart}
          onClick={() => handleLike(article._id)}
        />
      );
    switch (isLiked.type) {
      case 'LIKE':
        return (
          <FontAwesomeIcon
            className={`${styles['action-article-icon']} ${styles['action-like']}`}
            icon={faHeartSolid}
            onClick={() => handleLike(article._id)}
          />
        );
      case 'HAHA':
        return (
          <img
            onClick={() => handleLike(article._id, 'HAHA')}
            className={styles['icon-item-like']}
            src={haha}
            alt="haha"
          />
        );
      case 'WOW':
        return (
          <img
            onClick={() => handleLike(article._id, 'WOW')}
            className={styles['icon-item-like']}
            src={wow}
            alt="wow"
          />
        );
      case 'SAD':
        return (
          <img
            onClick={() => handleLike(article._id, 'SAD')}
            className={styles['icon-item-like']}
            src={sad}
            alt="sad"
          />
        );
    }
  };
  return (
    <LazyLoad offset={100} height={100}>
      <Card
        style={{
          filter:
            'drop-shadow(0px 4px 6px rgba(38, 50, 56, 0.16)), drop-shadow(0px 4px 16px rgba(38, 50, 56, 0.08))',
          borderRadius: 10,
          margin: '8px 0',
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
          {editable ? (
            <Spin spinning={loadingEdit}>
              <TextArea
                value={valueEdit}
                onChange={(e) => setValueEdit(e.target.value)}
                style={{ fontSize: 14, margin: '5px 0', whiteSpace: 'pre-line' }}
              />
              <div className={styles['wrap-btn']}>
                <Button onClick={() => setEditable(false)}>Cancle</Button>
                <Button onClick={onEditSubmit} type="primary">
                  Submit
                </Button>
              </div>
            </Spin>
          ) : (
            <Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
              style={{ fontSize: 14, margin: '5px 15px', whiteSpace: 'pre-line' }}
            >
              {text}
            </Paragraph>
          )}
          <div className="flex flex-wrap">
            {article.files.length > 0 &&
              article.files.map((i) => {
                return (
                  <div
                    style={{
                      minWidth: '50%',
                      width: `${100 / article.files.length}%`,
                      maxWidth: '100%',
                      flex: 1,
                    }}
                  >
                    {i.typeMedia === 'VIDEO' ? (
                      <video controls style={{ width: '100%' }}>
                        <source src={i.url} />
                      </video>
                    ) : (
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
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles['action-article']}>
          <span className={styles['wraper-icon']}>
            {renderLike()}
            <div className={styles['icons-like']}>
              <img
                onClick={() => handleLike(article._id, 'HAHA')}
                className={styles['icon-item']}
                src={haha}
                alt="haha"
              />
              <img
                onClick={() => handleLike(article._id, 'WOW')}
                className={styles['icon-item']}
                src={wow}
                alt="wow"
              />
              <img
                onClick={() => handleLike(article._id, 'SAD')}
                className={styles['icon-item']}
                src={sad}
                alt="sad"
              />
            </div>
          </span>
          <FontAwesomeIcon
            className={styles['action-article-icon']}
            icon={faComment}
            onClick={() => (inputRef.current as any)?.focus?.()}
          />
          {/* <FontAwesomeIcon className={styles['action-article-icon']} icon={faShareSquare} /> */}
        </div>
        <Divider style={{ margin: 0, borderTop: '1px solid rgba(0,0,0,0.2)' }} />
        {(comments.length > 0 || numberOfLike > 0) && (
          <CommentList
            comments={comments}
            numOfCmt={numOfComment}
            numberOfLike={numberOfLike}
            postId={article._id}
            setComments={setComments}
            inputRef={inputRef}
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
    </LazyLoad>
  );
}
