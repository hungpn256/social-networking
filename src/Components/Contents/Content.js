import React from 'react';
import styles from './Content.module.css';
import PostArticle from '../PostArticle';
import Article from '../Article';
import { useSelector } from 'react-redux';
function Content({ articles }) {
  const profileState = useSelector((state) => state.profile);
  return (
    <div className={styles['content-menu']}>
      <PostArticle loading={profileState?.postArticleRequesting ?? false} />
      {articles &&
        articles.map((article) => {
          return <Article article={article} />;
        })}
    </div>
  );
}

export default Content;
