import { faEdit, faMars, faPhone, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Affix, Button, Form, Image, Input, Radio, Spin } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Article from '../../../../Components/Article';
import PostArticle from '../../../../Components/PostArticle';
import { RootState } from '../../../../index_Reducer';
import IArticle from '../../../../Models/article';
import Iprofile from '../../../../Models/profile';
import IUser from '../../../../Models/user';
import { GET_USER } from '../../../Login/constants';
import { GET_PROFILE_USER_SUCCESS } from '../../constants';
import styles from '../../page/styles.module.css';
import services from '../../service';

interface Props {
  friendStatus?: string;
  userProfile: IUser | null;
  articles: IArticle[];
  profileState: Iprofile;
}

type LayoutType = Parameters<typeof Form>[0]['layout'];

export default function Detail({ friendStatus, userProfile, articles, profileState }: Props) {
  const [offsetTop, setOffset] = useState<undefined | number>(60);
  const listImg =
    articles && articles.filter((article: IArticle) => article.images[0]).splice(0, 9);

  useEffect(() => {
    const setOffsetTop = () => {
      window.innerWidth > 768 ? setOffset(60) : setOffset(-8000);
    };
    setOffsetTop();
    window.addEventListener('resize', setOffsetTop);
    return () => {
      window.removeEventListener('resize', setOffsetTop);
    };
  }, []);

  const user = useSelector((state: RootState) => state.login.user);
  const [editData, setDataEdit] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phoneNumber,
    gender: user?.gender,
  });
  const dispatch = useDispatch();
  const [isEditProfile, setEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 20, offset: 4 },
        }
      : null;

  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await services.updateProfile({ ...editData });
      dispatch({ type: GET_PROFILE_USER_SUCCESS, payload: { user: res.data.user } });
      dispatch({ type: GET_USER, payload: { user: res.data.user } });
      setEditProfile(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['detail']}>
      <div className={`${styles['detail-grid']}`}>
        <Affix offsetTop={offsetTop} className={styles['detail-resume']}>
          <ul className={styles['detail-resume-list']}>
            <h3 id="">
              About{' '}
              <FontAwesomeIcon
                onClick={() => {
                  setEditProfile(true);
                }}
                icon={faEdit}
                className={styles['edit-info-about']}
              />{' '}
            </h3>
            {userProfile?.phoneNumber && (
              <li className={styles['detail-resume-item']}>
                <FontAwesomeIcon icon={faPhone} className={styles['mr-10']} />
                Phone: {userProfile.phoneNumber}
              </li>
            )}

            {(userProfile?.gender || userProfile?.gender === 'MALE') && (
              <li className={styles['detail-resume-item']}>
                <FontAwesomeIcon
                  icon={
                    userProfile.gender === 'MALE'
                      ? faMars
                      : userProfile.gender === 'FEMALE'
                      ? faVenus
                      : faVenusMars
                  }
                  className={styles['mr-10']}
                />
                Gender:{' '}
                {userProfile.gender === 'MALE'
                  ? 'Male'
                  : userProfile.gender === 'FEMALE'
                  ? 'Female'
                  : 'Other'}
              </li>
            )}
          </ul>
          <div className={styles['photo']}>
            <h3>Photos</h3>
            <div className={styles['photo-list']}>
              <Image.PreviewGroup>
                {listImg?.map((article: IArticle, index: number) => {
                  return (
                    <Image
                      key={article._id + 'image'}
                      width={'98%'}
                      height={120}
                      src={article.images[0].url}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                  );
                })}
              </Image.PreviewGroup>
            </div>
          </div>
        </Affix>
        <div className={styles['detail-video']}>
          {friendStatus === 'MINE' && (
            <PostArticle loading={profileState?.postArticleRequesting ?? false} />
          )}
          {articles &&
            articles.map((article: IArticle, index: number) => {
              return <Article key={article._id} article={article} />;
            })}
        </div>
      </div>
      <Modal
        visible={isEditProfile}
        onCancel={() => {
          setEditProfile(false);
        }}
        footer={[]}
        confirmLoading={loading}
      >
        <div className="text-[25px] font-bold my-[15px]">Edit profile</div>
        <Spin spinning={loading}>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
            onFinish={onSubmit}
          >
            <Form.Item label="Firstname">
              <Input
                value={editData.firstName}
                onChange={(e) => {
                  setDataEdit((i) => ({
                    ...i,
                    firstName: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Lastname">
              <Input
                value={editData.lastName}
                onChange={(e) => {
                  setDataEdit((i) => ({
                    ...i,
                    lastName: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Phone">
              <Input
                value={editData.phoneNumber}
                onChange={(e) => {
                  setDataEdit((i) => ({
                    ...i,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item label="Gender">
              <Radio.Group
                value={editData.gender}
                onChange={(e) => {
                  setDataEdit((i) => ({
                    ...i,
                    gender: e.target.value,
                  }));
                }}
              >
                <Radio value="MALE"> Male </Radio>
                <Radio value="FEMALE"> Female </Radio>
                <Radio value="OTHER"> Other </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
