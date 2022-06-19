import { getMe, login } from './loginPath.swagger';

export default {
  ...login,
  ...getMe,
};
