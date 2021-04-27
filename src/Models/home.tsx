import IArticle from './article';

export default interface IHome {
  requesting: boolean;
  success: boolean;
  usersRecomment: null;
  error: null | string;
  loadingPage: boolean;
  articles: Array<IArticle> | [];
  record: {};
  paging: {
    page: number;
    limit: number;
  };
}
