import { Server } from 'socket.io';
import baseLogger from '../logger/logger.js';
import { updateVote } from "./features/suggestion/services/index.js";

const logger = baseLogger.addSource({
    file: 'socket.js',
    method: 'socket',
});
/**
 * Set up Socket.IO server on the existing HTTP server.
 */
function setupSocketIO(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        logger.info('socket.connected', { id: socket.id });

        socket.on('vote', async (data) => {
            logger.debug('socket.message', data);
            const s = await updateVote(data)
            io.emit('update', s); // Broadcast to all clients
        });

        socket.on('disconnect', () => {
            logger.info('socket.disconnected', { id: socket.id });
        });
    });
}

export { setupSocketIO };
