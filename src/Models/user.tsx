export default interface IUser {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  gender: number;
  avatar?: string;
  cover?: string;
  role: string;
  _id: string;
  place?: string;
  school?: string;
}
