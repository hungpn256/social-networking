import IArticle from './article';
import IUser from './user';

export default interface IHome {
  requesting: boolean;
  success: boolean;
  friend: [] | IUser[];
  error: null | string;
  articles: Array<IArticle> | [];
}
