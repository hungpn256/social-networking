import { faGrin } from '@fortawesome/free-regular-svg-icons';
import {
  faCamera,
  faImages,
  faMapMarkedAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Input, Spin } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import * as profileActions from '../../Pages/Profile/actions';
import styles from './styles.module.css';
const { TextArea } = Input;
export default function PostArticle({ loading }) {
  const posterText = useRef(null);
  const profileState = useSelector((state) => state.profile);
  const { record } = profileState;
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(profileActions.postArticle(record));
  };
  const urlImage = Array.from(profileState.record.images).map((image) => {
    return URL.createObjectURL(image);
  });
  const handleDeleteImgPreview = (index: number) => {
    setImages([]);
  };
  return (
    <Spin delay={500} spinning={loading}>
      <div className={styles['body']}>
        <div className={styles['wrapper']}>
          <form onSubmit={onSubmit}>
            <div className={styles['input-box']}>
              <div className={styles['tweet-area']}>
                <TextArea
                  className={styles['tweet-area-text']}
                  placeholder={`What's happening?`}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  onChange={(e) =>
                    dispatch(
                      profileActions.changeState({ record: { ...record, text: e.target.value } })
                    )
                  }
                  value={profileState.record.text}
                ></TextArea>
              </div>
              <div className={styles['privacy']}>
                <Image.PreviewGroup>
                  {urlImage &&
                    urlImage.map((urlImage, index) => {
                      return (
                        <div key={uuidv1()} style={{ position: 'relative' }}>
                          <Image src={urlImage} height={100} width={100} key={index}></Image>
                          <FontAwesomeIcon
                            className={styles['icon-close']}
                            icon={faTimesCircle}
                            onClick={() => {
                              handleDeleteImgPreview(index);
                            }}
                          />
                        </div>
                      );
                    })}
                </Image.PreviewGroup>
              </div>
            </div>
            <div className={styles['bottom']}>
              <ul className={styles['icons']}>
                <li>
                  <FontAwesomeIcon icon={faCamera} />
                </li>
                <li
                  onClick={() => {
                    posterText && posterText?.current.click();
                  }}
                >
                  <FontAwesomeIcon icon={faImages} />
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={posterText}
                    onChange={(e) => {
                      dispatch(
                        profileActions.changeState({
                          record: { ...record, images: e.target.files },
                        })
                      );
                    }}
                  />
                </li>
                <li>
                  <FontAwesomeIcon icon={faMapMarkedAlt} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faGrin} />
                </li>
              </ul>
              <div className={styles['content']}>
                <button type="submit">Tweet</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Spin>
  );
}
