export type Nullable<T> = T | null;

export type InputsVariant = 'outlined' | 'standard' | 'filled' | undefined

export interface IUserRegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLoginForm {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  email?: string;
}

export type ValidationError = {
  message: string;
  path: string[];
  type:string;
  context: {
    invalids: string[];
    label: string;
    key: string;
  }
};

type Token = {
  token: string;
  expires: Date;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export interface AuthData {
  user: IUser;
  tokens?: Tokens;
  message: string
}

export interface IFriend {}

export interface IInvitationData {
  email: string;
}
