import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import { Image, Input, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faImages,
  faMapMarkedAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import * as profileActions from '../../Pages/Profile/actions';
const { TextArea } = Input;
export default function PostArticle({ loading }) {
  const posterText = useRef(null);
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(profileActions.postArticle({ images, text }));
  };
  const urlImage = Array.from(images).map((image) => {
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
                  onChange={(e) => setText(e.target.value)}
                ></TextArea>
              </div>
              <div className={styles['privacy']}>
                <Image.PreviewGroup>
                  {urlImage &&
                    urlImage.map((urlImage, index) => {
                      return (
                        <div style={{ position: 'relative' }}>
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
                      setImages(e.target.files);
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
