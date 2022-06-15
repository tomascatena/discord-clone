import cors from 'cors';
import express from 'express';
import http from 'http';

const PORT = process.env.PORT || 5000;

const app = express();

// Parse json request body
app.use(express.json({ limit: '1kb' }));

// Enable cors
app.use(cors());
// Enable pre-flight
app.options('*', cors);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
