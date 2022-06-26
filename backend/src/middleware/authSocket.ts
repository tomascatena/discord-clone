import { ApiError } from '@utils/ApiError';
import { Socket } from 'socket.io';
import { env } from '@config/config';
import JWT from 'jsonwebtoken';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import validatorJS from 'validator';

export const verifyTokenSocket = (socket: Socket, next: Function) => {
  console.log('Verify token socket middleware');
  const token = socket.handshake.auth.token as string;

  if (!(token && validatorJS.isJWT(token))) {
    return next(
      new ApiError({
        statusCode: httpStatus.UNAUTHORIZED,
        message: ReasonPhrases.UNAUTHORIZED,
        isOperational: false,
      })
    );
  }

  try {
    const decoded = JWT.verify(token, env.JWT_SECRET);

    console.log('decoded', decoded);

    socket.data.user = decoded.sub as string;
    console.log('decoded', decoded);
  } catch (error) {
    console.log('error', error);
    return next(error);
  }

  next();
};
