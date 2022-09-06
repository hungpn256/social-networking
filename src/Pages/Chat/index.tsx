import React from 'react'
import ChatActiveItem from '../../Components/ChatActiveItem'
import styles from './styles.module.css'

export default function Chat() {
  return (
    <div className={styles['container']}>
      <ChatActiveItem />
      <ChatActiveItem />
      <ChatActiveItem />
    </div>
  )
}
