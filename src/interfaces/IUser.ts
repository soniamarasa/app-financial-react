export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  gender?: string | any;
  birthdate?: Date | string;
  password?: string;
  passwordConfirm?: string;
  imgUrl?: string;
}
