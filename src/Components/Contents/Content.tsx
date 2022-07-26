import React from 'react';
import styles from './Content.module.css';
import PostArticle from '../PostArticle';
import Article from '../Article';
import { useSelector } from 'react-redux';
import { RootState } from '../../index_Reducer';
interface Props {
  articles: any[];
  hidePost?: boolean;
}
function Content({ articles, hidePost }: Props) {
  const profileState = useSelector((state: RootState) => state.profile);
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
