export const API_ENDPOINTS = {
  LOGIN: '/api/v1/auth/login',
  LOGGED_IN_USER: '/api/v1/auth/me',
  REGISTER: '/api/v1/users/register',
  SEND_INVITATION: '/api/v1/friends/sendInvitation',
  ACCEPT_FRIEND_INVITATION: '/api/v1/friends/invitation/accept',
  REJECT_FRIEND_INVITATION: '/api/v1/friends/invitation/reject',
} as const;
