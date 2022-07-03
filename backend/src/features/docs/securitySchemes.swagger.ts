export const bearerAuth = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  in: 'header',
  description:
    'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
};
