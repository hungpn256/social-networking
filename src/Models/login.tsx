import IUser from './user';

export default interface ILogin {
  requesting: boolean;
  success: boolean;
  user: IUser | null;
  token: string;
  error: string | null;
}
