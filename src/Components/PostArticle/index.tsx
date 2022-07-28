import { faGrin } from '@fortawesome/free-regular-svg-icons';
import {
  faCamera,
  faImages,
  faMapMarkedAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Input, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import { RootState } from '../../index_Reducer';
import * as profileActions from '../../Pages/Profile/actions';
import styles from './styles.module.css';
const { TextArea } = Input;

interface Props {
  loading: boolean;
}

export default function PostArticle({ loading }: Props) {
  const posterText = useRef(null);
  const profileState = useSelector((state: RootState) => state.profile);
  const { record } = profileState;
  const dispatch = useDispatch();
  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(profileActions.postArticle(record));
  };
  const [urlImage, setUrlImage] = useState<string[]>([]);
  useEffect(() => {
    setUrlImage(
      Array.from(profileState.record.images).map((image) => {
        return URL.createObjectURL(image as MediaSource);
      })
    );
  }, [profileState.record.images]);

  const handleDeleteImgPreview = (index: number) => {
    dispatch(
      profileActions.changeState({
        record: {
          ...record,
          images: record.images.filter((i: MediaSource, idx: number) => {
            return idx !== index;
          }),
        },
      })
    );
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
                        <div key={uuidv1()} style={{ position: 'relative' }} className="mr-[16px]">
                          <Image
                            src={urlImage}
                            height={100}
                            width={100}
                            key={index}
                            className="rounded-xl"
                          ></Image>
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
                    multiple
                    accept="video/*,image/*"
                    type="file"
                    style={{ display: 'none' }}
                    ref={posterText}
                    onChange={(e) => {
                      if (e.target.files) {
                        dispatch(
                          profileActions.changeState({
                            record: { ...record, images: Array.from(e.target.files) },
                          })
                        );
                      }
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
