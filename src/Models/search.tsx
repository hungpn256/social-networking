import IUser from './user';
import IArticle from './article';
export default interface ISearch {
  requesting: boolean;
  success: boolean;
  error: null | string;
  articles: Array<IArticle> | [];
  users: Array<IUser> | [];
}
