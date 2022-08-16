export default interface IUser {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  avatar?: string;
  cover?: string;
  _id: string;
  fullName?: string;
  online?: boolean;
}
