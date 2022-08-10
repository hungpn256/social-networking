import { faEdit, faMars, faPhone, faVenus, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Affix, Image } from 'antd';
import { useEffect, useState } from 'react';
import Article from '../../../../Components/Article';
import PostArticle from '../../../../Components/PostArticle';
import IArticle from '../../../../Models/article';
import Iprofile from '../../../../Models/profile';
import IUser from '../../../../Models/user';
import styles from '../../page/styles.module.css';

interface Props {
  friendStatus?: string;
  userProfile: IUser | null;
  articles: IArticle[];
  profileState: Iprofile;
}

export default function Detail({ friendStatus, userProfile, articles, profileState }: Props) {
  const [offsetTop, setOffset] = useState<undefined | number>(60);
  const listImg =
    articles && articles.filter((article: IArticle) => article.images[0]).splice(0, 9);

  useEffect(() => {
    const setOffsetTop = () => {
      window.innerWidth > 768 ? setOffset(60) : setOffset(undefined);
    };
    setOffsetTop();
    window.addEventListener('resize', setOffsetTop);
    return () => {
      window.removeEventListener('resize', setOffsetTop);
    };
  }, []);

  return (
    <div className={styles['detail']}>
      <div className={`${styles['detail-grid']}`}>
        <Affix offsetTop={offsetTop} className={styles['detail-resume']}>
          <ul className={styles['detail-resume-list']}>
            <h3 id="">
              About <FontAwesomeIcon icon={faEdit} className={styles['edit-info-about']} />{' '}
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
    </div>
  );
}
