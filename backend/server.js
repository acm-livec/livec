require('module-alias/register');
const http = require('http');
const morgan = require('morgan');
const app = require('./src/app');
const { setupSocketIO } = require('./src/socket');
const logger = require('@logger').addSource({
    file: 'server.js',
    method: 'listen',
});

const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // <-- needed for socket.io

// Setup socket.io
setupSocketIO(server); // see below

// Start server
server.listen(PORT, () => {
    logger.info('app.started', { PORT });
});

// Logging
app.use(
    morgan('combined', {
        stream: {
            write: (msg) => logger.debug(msg.trim()),
        },
    })
);
