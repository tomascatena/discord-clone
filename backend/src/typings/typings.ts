import { IUser } from '@/features/user/user.model';
import { Request } from 'express';

export type Nullable<T> = T | null;

export interface RequestWithBody extends Request {
  body: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  userId: string;
  user?: Partial<IUser>;
}
