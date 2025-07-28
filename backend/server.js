require('module-alias/register');
const http = require('http');
const morgan = require('morgan');
const { app, injectDB: injectAppDB } = require('./src/app');
const { createDatabases } = require('./src/database/database');
const Suggestions = require('./src/features/suggestion/models/suggestions.model.js');
const Curriculums = require('./src/features/curriculum/models/curriculums.model.js');
const Curriculum = require('./src/features/curriculum/models/curriculum.model.js');
const CurriculumVersions = require('./src/features/curriculum/models/versions.model.js');
const Users = require('./src/features/users/models/users/users.model.js');
const finalizeImplementationService = require('./src/features/suggestion/services/finalize-implementation.js');
const userInfoUtil = require('./src/shared/utils/getUserInfoById.js');
const userNameUtil = require('./src/shared/utils/getUserNameById.js');
const { setupSocketIO } = require('./src/socket');
const logger = require('./logger/logger.js').addSource({
    file: 'server.js',
    method: 'listen',
});

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
