export default interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  avatar?: string;
  cover?: string;
  _id: string;
  fullName: string;
  online?: boolean;
  status: 'ONLINE' | 'OFFLINE';
}
