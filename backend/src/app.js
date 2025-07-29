import express from 'express';
import cors from 'cors';
let db;

function injectDB(instance) {
    db = instance;
}
import authRoutes from './features/auth/routes.js';
import suggestionRoutes from './features/suggestion/routes.js';
import userRoutes from './features/users/routes.js';
import curriculumRoutes from './features/curriculum/routes.js';

const app = express();
app.use(express.json());
app.use(cors());


/**
 * POST /admin/reset
 * Reset all databases to their default state.
 */
app.post('/admin/reset', async (req, res, next) => {
    try {
        await db.resetAll();
        res.json({ message: 'Database reset successfully' });
    } catch (err) {
        next(err);
    }
});


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



export default {
    app,
    injectDB
};
