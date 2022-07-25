import IUser from './user';
export default interface IArticle {
  text: string;
  images: IFile[];
  _id: string;
  createAt: Date;
  createBy: IUser;
  liked: ILike[];
  action?: string;
  comment: IComment[];
  numOfCmt: number;
}

export interface IComment {
  _id: string;
  content: string;
  file: IFile[];
  liked: ILike[];
  createdBy: IUser;
  createdAt: string;
  reply: IComment[];
}

export interface ILike {
  type: string;
  _id: string;
  likedBy: string | IUser;
}
export interface IFile {
  url: string;
}
