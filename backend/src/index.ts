import express from 'express';
import authRouter from './routes/auth.routes.js';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
const app = express();
app.use(express.json());
app.use(express.urlencoded());
//routes
// signin routes
app.use('/api/auth', authRouter);

const server = createServer(app);
const wss = new WebSocketServer({ server });
wss.on('connection', (connection, req) => {});

