import http from 'http';
import morgan from 'morgan';
import { app } from './src/app.js';
import setupSocketIO from './src/socket.js';
import baseLogger from './logger/logger.js';

const logger = baseLogger.addSource({ file: 'server.js', method: 'listen' });

const PORT = process.env.PORT || 3000;

const server = http.createServer(app); // <-- needed for socket.io
setupSocketIO(server); // see below

server.listen(PORT, () => {
    logger.info('app.started', { PORT });
});

app.use(
    morgan('combined', {
        stream: {
            write: (msg) => logger.debug(msg.trim()),
        },
    })
);
