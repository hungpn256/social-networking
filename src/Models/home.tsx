import IArticle from './article';
import IUser from './user';

export default interface IHome {
  requesting: boolean;
  success: boolean;
  friend: [] | IUser[];
  error: null | string;
  loadingPage: boolean;
  articles: Array<IArticle> | [];
  record: {};
  paging: {
    page: number;
    limit: number;
  };
}
