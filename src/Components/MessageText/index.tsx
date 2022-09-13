import { Avatar } from 'antd'
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
    <>
      <div className={styles[isMine ? 'isMine' : 'isNotMine']}>
        {!isMine && <Avatar src={message.createdBy.avatar} />}
        <div className={!isMine ? styles['text-isNotMine'] : styles['text-isMine']}>
          {message.content}
        </div>
      </div>
    </>
  )
}
