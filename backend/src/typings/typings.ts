import { Request } from 'express';

export type Nullable<T> = T | null;

export interface RequestWithBody extends Request {
  body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  };
}
