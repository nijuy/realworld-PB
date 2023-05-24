export interface IJoinUserData {
  username: string;
  email: string;
  password?: string;
}

export interface IEditUserData extends IJoinUserData {
  bio: string;
  image: string;
}

export interface IGlobalUserData extends IEditUserData {
  token: string;
}
