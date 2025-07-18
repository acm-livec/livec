<<<<<<< HEAD
import dataModelRoutes from './routes/dataModel/model.js';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/datamodel', dataModelRoutes);

mongoose.connect('mongodb://localhost:27017/livec', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(5000, () => console.log('Server running on port 5000'));
=======
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




>>>>>>> d9e87d89328cfce6dc78c60f4a89365fb677ca03
