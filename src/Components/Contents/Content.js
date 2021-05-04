import React from 'react';
import styles from './Content.module.css';
import PostArticle from '../PostArticle';
import Article from '../Article';
import { useSelector } from 'react-redux';
function Content({ articles, hidePost }) {
  const profileState = useSelector((state) => state.profile);
  return (
    <div className={styles['content-menu']}>
      {hidePost !== true && <PostArticle loading={profileState?.postArticleRequesting ?? false} />}
      {articles &&
        articles.map((article, index) => {
          return <Article article={article} key={article._id} />;
        })}
    </div>
  );
}

export default Content;
