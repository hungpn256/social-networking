import IUser from './user';
export default interface IArticle {
  text: string;
  images: Array<{ url: string }>;
  _id: string;
  createAt: Date;
  createBy: IUser;
  like: number;
  action?: string;
}
