const express = require('express');
const cors = require('cors')

const authRoutes = require('@routes/auth.routes.js');
const suggestionRoutes = require('@routes/suggestion.routes.js');
const userRoutes = require('@routes/users');
const curriculumRoutes = require('@routes/curriculum.routes.js');


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send('✅ Server is up and running!');
});


app.use('/auth', authRoutes);
app.use('/suggestion', suggestionRoutes);
app.use('/user', userRoutes);
app.use('/curriculums', curriculumRoutes);



// 404 handler (optional; for unmatched API routes only)
app.use((req, res) => {
	res.status(404).json({ message: 'Not Found' });
});


// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Server Error' });
});


module.exports = app;