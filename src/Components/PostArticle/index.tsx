import React, { useRef, useState } from 'react';
import styles from './styles.module.css';
import { Image, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImages, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faGrin } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import * as profileActions from '../../Pages/Profile/actions';
const { TextArea } = Input;
export default function PostArticle() {
  const posterText = useRef(null);
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ images, text });
    const image = images[0];
    dispatch(profileActions.postArticle({ image, text }));
  };
  const urlImage = Array.from(images).map((image) => {
    return URL.createObjectURL(image);
  });
  return (
    <>
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
                {/* <i className={styles['fas fa-globe-asia']}></i>
                <span>Everyone can reply</span> */}
                <Image.PreviewGroup>
                  {urlImage &&
                    urlImage.map((urlImage) => {
                      return <Image src={urlImage} height={100} width={100}></Image>;
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
    </>
  );
}
