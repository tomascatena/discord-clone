import { TokenTypes, tokenTypes } from '@/config/tokens';
import { env } from '@/config/config';
import Token from './token.model';
import addDays from 'date-fns/addDays';
import addMinutes from 'date-fns/addMinutes';
import getUnixTime from 'date-fns/getUnixTime';
import jwt from 'jsonwebtoken';

const generateToken = (
  userId: string,
  expires: Date,
  type: TokenTypes,
  secret = env.JWT_SECRET
) => {
  const payload = {
    sub: userId,
    iat: getUnixTime(new Date()),
    exp: getUnixTime(expires),
    type,
  };

  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: string,
  expires: Date,
  type: TokenTypes,
  blacklisted = false
) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires,
    type,
    blacklisted,
  });

  return tokenDoc;
};

const verifyToken = async (token: string, type: TokenTypes) => {
  const payload = jwt.verify(token, env.JWT_SECRET);

  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });

  if (!tokenDoc) {
    throw new Error('Token not found');
  }

  return tokenDoc;
};

const generateAuthTokens = async (userId: string) => {
  const today = new Date();

  const accessTokenExpires = addMinutes(
    today,
    env.JWT_ACCESS_EXPIRATION_MINUTES
  );
  const refreshTokenExpires = addDays(today, env.JWT_REFRESH_EXPIRATION_DAYS);

  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  await saveToken(
    refreshToken,
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

export default {
  generateAuthTokens,
  verifyToken,
};
