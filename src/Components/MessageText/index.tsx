import { Avatar, Image } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../index_Reducer'
import { IMessage } from '../../Models/chat'
import IUser from '../../Models/user'
import styles from './styles.module.css'

export default function MessageText({ message }: { message: IMessage }) {
  const user = useSelector((state: RootState) => state.login.user) as IUser
  const isMine = user._id === message.createdBy._id
  return (
    <div className={styles[isMine ? 'isMine' : 'isNotMine']}>
      {!isMine && <Avatar src={message.createdBy.avatar} />}
      {message.content && <div className={!isMine ? styles['text-isNotMine'] : styles['text-isMine']}>
        {message.content}
      </div>}
      <div className={styles['wrap-images']}>
        {message.files && message.files.map((i) => {
          return <div
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
        })}
      </div>
    </div>
  )
}
