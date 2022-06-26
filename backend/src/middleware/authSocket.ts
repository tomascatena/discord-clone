import { Socket } from 'socket.io';
import { env } from '@config/config';
import JWT from 'jsonwebtoken';
import User from '@user/user.model';
import validatorJS from 'validator';

export const verifyTokenSocket = async (socket: Socket, next: Function) => {
  const socketError = new Error('Socket authentication error');

  const token = socket.handshake.auth.token as string;

  if (!(token && validatorJS.isJWT(token))) {
    return next(socketError);
  }

  try {
    const decoded = JWT.verify(token, env.JWT_SECRET);

    const userId = decoded.sub as string;

    const user = await User.findById(userId);

    socket.data.user = user;
  } catch (error) {
    return next(socketError);
  }

  next();
};
