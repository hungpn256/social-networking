import { Avatar } from 'antd'
import React from 'react'
import styles from './styles.module.css'
import { UserOutlined } from '@ant-design/icons';

export default function GroupAvatar({ src, style, size }: { src: (string | undefined)[], style?: React.CSSProperties, size?: number }) {
  return (
    <div style={style} className={styles['group-avatar']}>
      {src.map((i) => {
        return <div className={src.length === 1 ? styles['avatar-wrapper'] : styles['avatar-wrapper-group']}>
          <Avatar style={{ width: size || 50, height: size || 50 }} icon={<UserOutlined />} src={i} className={src.length === 1 ? styles['avatar-item'] : styles['avatar-item-group']} />
        </div>
      })}
    </div >
  )
}
