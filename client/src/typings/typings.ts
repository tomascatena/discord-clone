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

export interface IFriend {
  _id: string;
  username: string;
  isOnline: boolean;
  email: string;
}

export interface IOnlineUser {
  userId: string;
  socketId: string;
}

export interface IPendingInvitation {
  _id: string;
  senderId: {
    _id: string;
    username: string;
    email: string;
  };
  receiverId: string
}

export interface IInvitationData {
  email: string;
}

export interface InvitationResponseData {
  invitationId: string;
}

export interface IChatDetails {}

export type ChatTypes = 'direct' | 'group';
