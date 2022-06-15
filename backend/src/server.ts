import { connectDB } from '@config/connectDB';
import { env } from '@config/config';
import cors from 'cors';
import express from 'express';
import http from 'http';
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

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);

  connectDB();
});
