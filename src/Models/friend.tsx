import IUser from './user';

export interface IFriend {
  requester: IUser;
  recipient: IUser;
  status: 'PENDING' | 'REJECTED' | 'REQUESTED';
}
