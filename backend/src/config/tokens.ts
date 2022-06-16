export const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
} as const;

type TokenKeys = keyof typeof tokenTypes;

export type TokenTypes = typeof tokenTypes[TokenKeys];

export type PersistedTokenTypes = typeof tokenTypes[Exclude<
  TokenKeys,
  'ACCESS'
>];
