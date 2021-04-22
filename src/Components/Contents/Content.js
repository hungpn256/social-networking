import React from 'react';
import styles from './Content.module.css';
import PostArticle from '../PostArticle';
function Content() {
  return (
    <div className={styles['content-menu']}>
      <PostArticle loading={false} />
    </div>
  );
}

export default Content;
