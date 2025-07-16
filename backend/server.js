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
