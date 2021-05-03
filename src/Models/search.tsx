import IUser from './user';
import IArticle from './article';
export default interface ISearch {
  requesting: boolean;
  success: boolean;
  usersRecomment: null;
  error: null | string;
  loadingPage: boolean;
  articles: Array<IArticle> | [];
  user: Array<IUser> | [];
  paging: {
    page: number;
    limit: number;
  };
}
