import { cleanEnv, num, port, str, url } from 'envalid';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'],
    desc: 'Node environment',
  }),
  PORT: port({ desc: 'API Port' }),
  MONGODB_URI: url({ desc: 'Mongo DB url' }),
  PASSWORD_MIN_LENGTH: num({ desc: 'Password minimum length' }),
  PASSWORD_MAX_LENGTH: num({ desc: 'Password maximum length' }),
});
