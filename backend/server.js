import http from 'http';
import morgan from 'morgan';
import { app, injectDB as injectAppDB } from './src/app.js';
import { createDatabases } from './src/database/database.js';
import Suggestions from './src/features/suggestion/models/suggestions.model.js';
import Curriculums from './src/features/curriculum/models/curriculums.model.js';
import Curriculum from './src/features/curriculum/models/curriculum.model.js';
import CurriculumVersions from './src/features/curriculum/models/versions.model.js';
import Users from './src/features/users/models/users/users.model.js';
import finalizeImplementationService from './src/features/suggestion/services/finalize-implementation.js';
import userInfoUtil from './src/shared/utils/getUserInfoById.js';
import userNameUtil from './src/shared/utils/getUserNameById.js';
import { setupSocketIO } from './src/socket.js';
import baseLogger from './logger/logger.js';

const logger = baseLogger.addSource({ file: 'server.js', method: 'listen' });

const PORT = process.env.PORT || 3000;

(async () => {
    const db = await createDatabases();
    injectAppDB(db);
    Suggestions.injectDB(db.suggestions);
    Curriculums.injectDB(db.curriculums);
    Curriculum.injectDB(db.curriculums);
    CurriculumVersions.injectDB(db.curriculums);
    Users.injectDB(db.users);
    finalizeImplementationService.injectDB(db);
    userInfoUtil.injectDB(db);
    userNameUtil.injectDB(db);

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
})();
