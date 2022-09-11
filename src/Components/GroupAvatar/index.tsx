import { Avatar } from 'antd'
import React from 'react'
import styles from './styles.module.css'

export default function GroupAvatar({ src }: { src: string[] }) {
  return (
    <div className={styles['group-avatar']}>
      {src.map((i) => {
        return <div className={src.length === 1 ? styles['avatar-item'] : styles['avatar-item-group']}>
          <Avatar style={{ width: 40, height: 40 }} />
        </div>
      })}
    </div >
  )
}
