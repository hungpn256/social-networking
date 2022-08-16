import IArticle from './article';
import IUser from './user';

export default interface Iprofile {
  requesting: boolean;
  success: boolean;
  user: null | IUser;
  error: null;
  editting: boolean;
  loadingPage: boolean;
  articles: [] | Array<IArticle>;
  record: {
    text: string;
    images: [] | Array<{ url: string }>;
  };
  paging: {
    page: number;
    limit: number;
  };
  friendStatus?: 'FRIEND' | 'PENDING' | 'REQUESTED' | 'MINE';
  changeCoverRequesting?: boolean;
  postArticleRequesting?: boolean;
}
