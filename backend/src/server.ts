import { ExpressJoiError } from 'express-joi-validation';
import { connectDB } from '@config/connectDB';
import { env } from '@config/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import routes from '@routes/v1';

const app = express();

// Parse json request body
app.use(express.json({ limit: '1kb' }));

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

// Enable cors
app.use(cors());
// Enable pre-flight
app.options('*', cors);

// v1 api routes
app.use('/api/v1', routes);

app.use(
  (
    err: ExpressJoiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    if (err) {
      return res.status(httpStatus.BAD_REQUEST).json(err);
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
);

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);

  connectDB();
});
