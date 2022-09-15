import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { CSSProperties, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../index_Reducer';
import { IMessage } from '../../Models/chat';
import IUser from '../../Models/user';
import styles from './styles.module.css';

export default function MessageText({
  message,
  endBlock,
  startBlock,
}: {
  message: IMessage;
  endBlock: boolean;
  startBlock: boolean;
}) {
  const user = useSelector((state: RootState) => state.login.user) as IUser;
  const isMine = user._id === message.createdBy._id;

  const styleBorder = useMemo(() => {
    const res: CSSProperties = {};
    const borderTop = `borderTop${isMine ? 'Right' : 'Left'}Radius`;
    const borderBottom = `borderBottom${isMine ? 'Right' : 'Left'}Radius`;
    if (startBlock) {
      res[borderTop as 'borderRadius'] = 16;
      res.marginTop = 4;
    }

    if (endBlock) {
      res[borderBottom as 'borderRadius'] = 16;
    }
    return res;
  }, [startBlock, endBlock, isMine]);

  return (
    <div className={styles[isMine ? 'isMine' : 'isNotMine']}>
      {!isMine && (
        <div style={{ width: 35, height: 35 }}>
          {endBlock && <Avatar src={message.createdBy.avatar} icon={<UserOutlined />} />}
        </div>
      )}
      <div className={styles['content-message']}>
        {message.content && (
          <div
            style={styleBorder}
            className={!isMine ? styles['text-isNotMine'] : styles['text-isMine']}
          >
            {message.content}
          </div>
        )}
        <div className={styles['wrap-images']}>
          {message.files &&
            message.files.map((i) => {
              return (
                <div
                  style={{
                    minWidth: '50%',
                    width: `${100 / message.files.length}%`,
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
    </div>
  );
}
