import React from 'react';
import styles from './Content.module.css';
import PostArticle from '../PostArticle';
import Article from '../Article';
import { useSelector } from 'react-redux';
interface Props {
  articles: any[];
  hidePost?: boolean;
}
function Content({ articles, hidePost }: Props) {
  const profileState = useSelector((state) => state.profile);
  return (
    <div className={styles['content-menu']}>
      {hidePost !== true && <PostArticle loading={profileState?.postArticleRequesting ?? false} />}
      {articles &&
        articles.map((article) => {
          return <Article article={article} key={article._id} />;
        })}
    </div>
  );
}

export default Content;
