import { getMe } from './getMePath.swagger';
import { login } from './loginPath.swagger';

export default {
  ...login,
  ...getMe,
};
