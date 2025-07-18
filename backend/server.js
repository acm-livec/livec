require('module-alias/register');
const morgan = require('morgan');
const app = require('./src/app');

const logger = require('@logger').addSource({
    file: "server.js",
    method: "listen",
});



app.listen(PORT = 3000, () => {
    logger.info(`app.started`, { PORT })
});


app.use(
    morgan('combined', {
        stream: {
            write: msg => logger.debug(msg.trim())
        }
    })
);




